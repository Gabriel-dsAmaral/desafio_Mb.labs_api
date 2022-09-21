import { Request } from "express";
import { decode } from "jsonwebtoken";
import { commentsRepo } from "../repositories";
import { commentSerializer } from "../schemas/comment/return.schema";
import { CommentEvents } from "../entities/commentEvent.entity";
import ErrorHTTP from "../errors/ErrorHTTP";

class CommentService {
  createComment = async ({ validated, event, headers }: Request) => {
    const { comment } = validated;

    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    const newComment = await commentsRepo.save({
      userId: decoded.id,
      eventId: event.id,
      comment: comment,
    } as CommentEvents);

    console.log(newComment);

    return commentSerializer(await commentsRepo.findOne({ id: newComment.id }));
  };

  updateComment = async ({ headers, comment, validated }: Request) => {
    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (comment.userId != decoded.id && !decoded.is_superuser) {
      throw new ErrorHTTP(401, `You do not own this comment!`);
    }

    await commentsRepo.update(comment.id, {
      ...validated,
    });

    const updatedComment = await commentsRepo.findOne({ id: comment.id });

    return commentSerializer(updatedComment);
  };

  deleteComment = async ({ headers, comment }: Request) => {
    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (comment.userId != decoded.id && !decoded.is_superuser) {
      throw new ErrorHTTP(401, `You do not own this comment!`);
    }

    await commentsRepo.delete(comment.id);
  };
}

export default new CommentService();
