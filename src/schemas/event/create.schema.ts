import * as yup from "yup";

const createEventSchema = yup.object().shape({
  title: yup.string().required(),
  owner_name: yup.string().required(),
  banner_url: yup.string().required(),
  icon_url: yup.string().required(),
  is_remote: yup.boolean().required(),
  description: yup.string().required(),
  address: yup
    .object()
    .shape({
      city: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().max(99999).required(),
      zipCode: yup.string().required(),
      district: yup.string().required(),
    })
    .required(),
  tickets: yup
    .object()
    .shape({
      avaible_quantity: yup.number().required(),
      price: yup.number().required(),
      sold_amount: yup.number().required(),
    })
    .required(),
});

const responseObject = {
  id: yup.string().uuid().required(),
  title: yup.string().required(),
  owner_name: yup.string().required(),
  banner_url: yup.string().required(),
  icon_url: yup.string().required(),
  is_remote: yup.boolean().required(),
  description: yup.string().required(),
  address: yup
    .object()
    .shape({
      // city: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().max(99999).required(),
      zipCode: yup.string().required(),
      district: yup.string().required(),
    })
    .required(),
  tickets: yup
    .object()
    .shape({
      avaible_quantity: yup.number().required(),
      price: yup.number().required(),
      sold_amount: yup.number().required(),
    })
    .required(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateEventSchema = yup.object().shape(newShape);

const serializedArrEventsSchema = yup.array().of(yup.object().shape(newShape));

export {
  createEventSchema,
  serializedCreateEventSchema,
  serializedArrEventsSchema,
};
