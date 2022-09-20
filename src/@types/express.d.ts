import {
  User,
  Event,
  Address,
  Tickets,
  CommentEvents,
  RateEvents,
} from "../entities";

type TValidated = User | Event | Address | Tickets;
export type TDecoded = { email: string; is_superuser: boolean };

declare global {
  namespace Express {
    interface Request {
      validated: User & Event & CommentEvents & RateEvents;
      user: User;
      decoded: TDecoded;
      userRequest: User;
      event: Event;
      comment: CommentEvents;
      findRepository: object;
    }
  }
}
