import { Request, Response } from "express";
import CommentService from "../services/comment.service";

class EventController {
  createComment = async (req: Request, res: Response) => {
    const event = await CommentService.createComment(req);
    return res.status(201).json(event);
  };

  updateComment = async (req: Request, res: Response) => {
    const updatedComent = await CommentService.updateComment(req);
    return res.status(200).json(updatedComent);
  };

  deleteComment = async (req: Request, res: Response) => {
    await CommentService.deleteComment(req);
    return res.status(204).json("");
  };
}

export default new EventController();
