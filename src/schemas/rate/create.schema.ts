import * as yup from "yup";

const createrateSchema = yup.object().shape({
  rate: yup.number().required(),
});

export { createrateSchema };
