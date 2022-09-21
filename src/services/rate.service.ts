import { Request } from "express";
import { rateCalculator } from "../utils/rateCalculator";
import { decode } from "jsonwebtoken";
import { EventRepo, ratesRepo } from "../repositories";
import { commentSerializer } from "../schemas/comment/return.schema";
import { RateEvents } from "../entities/rateEvent.entity";
import ErrorHTTP from "../errors/ErrorHTTP";

class RateService {
  createRate = async ({ validated, event, headers }: Request) => {
    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (validated.rate < 1 || validated.rate > 5) {
      throw new ErrorHTTP(406, "The rate must be between 1 and 5");
    }

    const rate = await ratesRepo.findOne({ userId: decoded.id });

    if (rate) {
      throw new ErrorHTTP(
        400,
        "You can only rate an event once, patch your rating instead!"
      );
    }

    await ratesRepo.save({
      userId: decoded.id,
      eventId: event.id,
      rate: validated.rate,
    } as RateEvents);

    const allRates = await ratesRepo.find({ eventId: event.id });

    await EventRepo.update(event.id, {
      average_rate: rateCalculator(allRates),
    });

    return { message: `Added rate, new average: ${rateCalculator(allRates)}` };
  };

  updateRate = async ({ headers, validated }: Request) => {
    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (validated.rate < 1 || validated.rate > 5) {
      throw new ErrorHTTP(406, "The rate must be between 1 and 5");
    }

    const rate = await ratesRepo.findOne({ userId: decoded.id });

    await ratesRepo.update(rate.id, {
      ...validated,
    });

    const allRates = await ratesRepo.find({ eventId: rate.eventId });

    await EventRepo.update(rate.eventId, {
      average_rate: rateCalculator(allRates),
    });

    return {
      message: `Updated rate, new average: ${rateCalculator(allRates)}`,
    };
  };
}

export default new RateService();
