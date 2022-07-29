import EventService from "../services/event.service";
import { Request, Response } from "express";

class EventController {
  createEvent = async (req: Request, res: Response) => {
    const event = await EventService.createEvent(req);
    return res.status(201).json(event);
  };

  getEvents = async (req: Request, res: Response) => {
    const events = await EventService.getEvents(req);
    return res.status(200).json(events);
  };

  getOneEvent = async (req: Request, res: Response) => {
    const event = await EventService.getOneEvent(req);
    return res.status(200).json(event);
  };

  updateEvent = async (req: Request, res: Response) => {
    const event = await EventService.updateEvent(req);
    return res.status(200).json(event);
  };
}

export default new EventController();
