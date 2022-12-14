import * as yup from "yup";
import { hashSync } from "bcrypt";
import { serializedArrEventsSchema } from "../event/create.schema";

const createUserSchema = yup.object().shape({
  user_name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
  avatar_url: yup.string().required(),
  banner_url: yup.string().required(),
});

const loginUserSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
});

const responseObject = {
  id: yup.string().uuid().required(),
  user_name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  avatar_url: yup.string().required(),
  banner_url: yup.string().required(),
  my_events: serializedArrEventsSchema,
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateUserSchema = yup.object().shape(newShape);

export { createUserSchema, serializedCreateUserSchema, loginUserSchema };
