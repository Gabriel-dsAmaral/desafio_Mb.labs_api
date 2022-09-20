import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { commentsRepo } from "../repositories";

const getCommentByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    let { id } = req.params;

    const foundComment = await commentsRepo.findOne({ id: id });

    if (!foundComment) {
      throw new ErrorHTTP(404, `Comment with id ${req.params.id} not found.`);
    }

    req.comment = foundComment;

    next();
  } catch (err: any) {
    if (err instanceof ErrorHTTP) {
      throw new ErrorHTTP(404, `Comment with id ${req.params.id} not found.`);
    }
    throw new ErrorHTTP(404, `The id ${req.params.id} is not valid`);
  }
};

export default getCommentByIdOr404;
