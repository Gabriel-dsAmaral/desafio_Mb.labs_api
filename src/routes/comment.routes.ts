import { Router } from "express";
import commentController from "../controllers/comment.controller";
import {
  validateToken,
  validadeSchema,
  getEventByIdOr404,
  getCommentByIdOr404,
} from "../middlewares";
import { createCommentSchema } from "../schemas/comment/create.schema";

const commentRouter = Router();

commentRouter.post(
  "/comment/event/:id",
  validateToken,
  getEventByIdOr404,
  validadeSchema(createCommentSchema),
  commentController.createComment
);

commentRouter.patch(
  "/comment/:id",
  validateToken,
  getCommentByIdOr404,
  validadeSchema(createCommentSchema),
  commentController.updateComment
);

commentRouter.delete(
  "/comment/:id",
  validateToken,
  getCommentByIdOr404,
  commentController.deleteComment
);

export default commentRouter;
