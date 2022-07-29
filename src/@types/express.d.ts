import { User, Event } from "../entities";

type TValidated = User | Event;
export type TDecoded = { email: string; is_superuser: boolean };

declare global {
  namespace Express {
    interface Request {
      validated: User;
      user: User;
      decoded: TDecoded;
      userRequest: User;
      findRepository: object;
    }
  }
}
