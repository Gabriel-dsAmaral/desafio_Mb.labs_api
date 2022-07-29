import * as yup from "yup";

const responseObject = {
  id: yup.string().uuid().required(),
  user_name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  avatar_url: yup.string().required(),
  banner_url: yup.string().required(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedOneUser = yup.object().shape(newShape);

const serializedAllUsers = yup.array().of(yup.object().shape(newShape));

const userUpdateSchema = yup.object().shape({
  user_name: yup.string().optional(),
  avatar_url: yup.string().optional(),
  banner_url: yup.string().optional(),
});

export { serializedOneUser, serializedAllUsers, userUpdateSchema };
