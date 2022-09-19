import { User } from "../entities/user.entity";
import { Request, Response } from "express";
import { AssertsShape } from "yup/lib/object";
import userRepository from "../repositories/user.repository";
import { EventRepo, ticketsRepo } from "../repositories";
import { compare } from "bcrypt";
import { sign, decode } from "jsonwebtoken";
import { config } from "dotenv";
import ErrorHTTP from "../errors/ErrorHTTP";
import { serializedCreateUserSchema } from "../schemas/user/create.schema";
import {
  serializedAllUsers,
  serializedOneUser,
} from "../schemas/user/user.schema";

config();
interface ILogin {
  status: number;
  message: object | string;
}

interface ILoginData {
  email: string;
  password: string;
}

class UserService {
  createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    const userAlreadyExists = (await userRepository.findOne({
      email: validated.email,
    })) as User | null;
    if (userAlreadyExists) {
      throw new ErrorHTTP(409, "Email already exists");
    }
    const user = await userRepository.save(
      Object.assign(new User(), validated)
    );
    const createdUser = await userRepository.findOne({ id: user.id });
    return await serializedCreateUserSchema.validate(createdUser, {
      stripUnknown: true,
    });
  };

  loginUser = async (userData: ILoginData): Promise<ILogin> => {
    const { email, password } = userData as ILoginData;

    const user = (await userRepository.findOne({ email })) as User | null;

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    const isValid = await compare(password, user?.password);

    if (!isValid) {
      throw new ErrorHTTP(401, "Email or password is incorrect");
    }

    const token = sign(
      { id: user.id, email: user.email, is_superuser: user.is_superuser },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES_IN as string,
      }
    );

    return {
      status: 200,
      message: {
        token,
      },
    };
  };

  getUser = async (req: Request) => {
    const token: string | any = req.headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (!decoded.is_superuser) {
      const user = (await userRepository.findOne({
        email: decoded.email,
      })) as User | null;

      return serializedOneUser.validate(user);
    } else {
      const users = (await userRepository.all()) as User[];

      return await serializedAllUsers.validate(users, { stripUnknown: true });
    }
  };

  getByid = async (req: Request) => {
    const { id } = req.params;

    const user = await userRepository.findOne({ id: id });

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    return await serializedOneUser.validate(user, { stripUnknown: true });
  };

  update = async ({ validated, params }: Request) => {
    const { id } = params;

    const user = await userRepository.findOne({ id: id });

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    await userRepository.update(user.id, { ...(validated as User) });

    const updatedUser = await userRepository.findOne({ id: id });

    return await serializedOneUser.validate(updatedUser, {
      stripUnknown: true,
    });
  };

  addEvent = async (req: Request) => {
    const token: string | any = req.headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    const user = (await userRepository.findOne({
      email: decoded.email,
    })) as User | null;

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    const event = await EventRepo.findOne({
      id: req.params.id,
    });

    if (!event) {
      throw new ErrorHTTP(404, "Event not found");
    }

    if (user.my_events.find((event) => event.id == req.params.id)) {
      throw new ErrorHTTP(404, "Event already registered");
    }

    user.my_events = [...user.my_events, event];

    await userRepository.save(user);

    const tickets = {
      id: event.tickets.id,
      avaible_quantity: event.tickets.avaible_quantity - 1,
      price: event.tickets.price,
      sold_amount: event.tickets.sold_amount + 1,
    };

    await ticketsRepo.update(event.tickets.id, {
      ...tickets,
    });

    event.tickets = Object.assign(event.tickets, tickets);

    await EventRepo.update(event.id, { ...event });

    const updatedUser = await userRepository.findOne({ email: decoded.email });

    return await serializedOneUser.validate(updatedUser);
  };

  removeEvent = async (req: Request) => {
    const token: string | any = req.headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    const user = (await userRepository.findOne({
      email: decoded.email,
    })) as User | null;

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    const event = await EventRepo.findOne({
      id: req.params.id,
    });

    if (!event) {
      throw new ErrorHTTP(404, "Event not found");
    }

    if (!user.my_events.find((event) => event.id == req.params.id)) {
      throw new ErrorHTTP(404, "Event not registered");
    }

    function removeDuplicated(value) {
      return value == event;
    }

    user.my_events = user.my_events.filter(removeDuplicated);

    await userRepository.save(user);

    const tickets = {
      id: event.tickets.id,
      avaible_quantity: event.tickets.avaible_quantity + 1,
      price: event.tickets.price,
      sold_amount: event.tickets.sold_amount - 1,
    };

    await ticketsRepo.update(event.tickets.id, {
      ...tickets,
    });

    event.tickets = Object.assign(event.tickets, tickets);

    const updatedUser = await userRepository.findOne({ email: decoded.email });

    return await serializedOneUser.validate(updatedUser);
  };
}

export default new UserService();
