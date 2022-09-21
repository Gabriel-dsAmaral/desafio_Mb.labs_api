import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { ratesRepo } from "../repositories";

const getRateByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    let { id } = req.params;

    const foundRate = await ratesRepo.findOne({ id: id });

    if (!foundRate) {
      throw new ErrorHTTP(404, `Rate with id ${req.params.id} not found.`);
    }

    req.rate = foundRate;

    next();
  } catch (err: any) {
    if (err instanceof ErrorHTTP) {
      throw new ErrorHTTP(404, `Rate with id ${req.params.id} not found.`);
    }
    throw new ErrorHTTP(404, `The id ${req.params.id} is not valid`);
  }
};

export default getRateByIdOr404;
