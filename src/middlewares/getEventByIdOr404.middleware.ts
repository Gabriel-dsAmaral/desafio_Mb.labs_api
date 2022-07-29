import { privateEncrypt } from "crypto";
import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { EventRepo } from "../repositories";

const getEventByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    let { id } = req.params;

    const foundEvent = await EventRepo.findOne({ id: id });

    if (!foundEvent) {
      throw new ErrorHTTP(404, `Event with id ${req.params.id} not found.`);
    }

    req.event = foundEvent;

    next();
  } catch (err: any) {
    if (err instanceof ErrorHTTP) {
      throw new ErrorHTTP(404, `Event with id ${req.params.id} not found.`);
    }
    throw new ErrorHTTP(404, `The id ${req.params.id} is not valid`);
  }
};

export default getEventByIdOr404;
