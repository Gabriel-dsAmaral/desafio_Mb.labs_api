import { Request } from "express";
import { Event } from "../entities/event.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { EventRepo, addressRepo, ticketsRepo } from "../repositories";
import {
  serializedCreateEventSchema,
  serializedArrEventsSchema,
} from "../schemas/event";

class EventService {
  createEvent = async ({ validated }: Request) => {
    const { address, tickets } = validated;

    const addressAlreadyExists = await addressRepo.findOne({
      number: address.number,
    });

    if (addressAlreadyExists) {
      throw new ErrorHTTP(
        409,
        `Address number ${address.number} already registered`
      );
    }

    const eventAddress = await addressRepo.save(address);

    const eventTickets = await ticketsRepo.save(tickets);

    validated.address = eventAddress;
    validated.tickets = eventTickets;

    const newEvent = await EventRepo.save(validated as Event);

    return await serializedCreateEventSchema.validate(newEvent, {
      stripUnknown: true,
    });
  };

  getEvents = async ({ decoded }: Request) => {
    const allEvents = await EventRepo.getAll();

    return await serializedArrEventsSchema.validate(allEvents, {
      stripUnknown: true,
    });
  };

  getOneEvent = async ({ event }) => {
    return await serializedCreateEventSchema.validate(event, {
      stripUnknown: true,
    });
  };

  updateEvent = async ({ validated, event }: Request) => {
    if (validated.address) {
      const { address } = validated;

      if (address.number) {
        const addressAlreadyExists = await addressRepo.findOne({
          number: address.number,
        });

        if (addressAlreadyExists) {
          throw new ErrorHTTP(
            409,
            `Address number ${address.number} already registered`
          );
        }
      }

      await addressRepo.update(event.address.id, {
        ...address,
      });

      validated.address = Object.assign(event.address, validated.address);
    }

    if (validated.tickets) {
      const { tickets } = validated;

      await ticketsRepo.update(event.tickets.id, {
        ...tickets,
      });
      validated.tickets = Object.assign(event.tickets, validated.tickets);
    }

    await EventRepo.update(event.id, { ...validated });

    const updatedEvent = await EventRepo.findOne({
      id: event.id,
    });

    return await serializedCreateEventSchema.validate(updatedEvent, {
      stripUnknown: true,
    });
  };

  isActiveEvent = async ({ event }: Request) => {
    await EventRepo.update(event.id, { is_active: !event.is_active });
    return { message: `is-active is now ${!event.is_active}` };
  };
}

export default new EventService();
