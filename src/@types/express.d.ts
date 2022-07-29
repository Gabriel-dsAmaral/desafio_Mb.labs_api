import { User, Event, Address, Tickets } from "../entities";

type TValidated = User | Event | Address | Tickets;
export type TDecoded = { email: string; is_superuser: boolean };

declare global {
  namespace Express {
    interface Request {
      validated: User & Event;
      user: User;
      decoded: TDecoded;
      userRequest: User;
      event: Event;
      findRepository: object;
    }
  }
}
