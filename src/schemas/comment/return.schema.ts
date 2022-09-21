import UserRepo from "../../repositories/user.repository";

interface Icomment {
  id?: string;
  userId: string;
  eventId: string;
  comment: string;
}

export const commentSerializer = async (comment: Icomment) => {
  const user = await UserRepo.findOne({ id: comment.userId });
  return {
    id: comment.id,
    comment: comment.comment,
    user_name: user.user_name,
    avatar: user.avatar_url,
  };
};
