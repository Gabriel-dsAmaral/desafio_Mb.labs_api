import { CommentEvents } from "../../entities/commentEvent.entity";

export const commentSerializer = (comment: CommentEvents) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user: {
      id: comment.userId,
      user_name: comment.user.user_name,
      avatar_url: comment.user.avatar_url,
    },
  };
};

export const arrCommentsSerializer = (array: CommentEvents[]) => {
  const serializedArray = [];

  array.forEach((comment) => serializedArray.push(commentSerializer(comment)));

  return serializedArray;
};
