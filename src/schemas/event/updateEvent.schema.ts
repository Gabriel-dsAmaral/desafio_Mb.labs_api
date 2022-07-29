import * as yup from "yup";

const updateEstablishmentSchema = yup.object().shape({
  title: yup.string().optional(),
  owner_name: yup.string().optional(),
  banner_url: yup.string().optional(),
  icon_url: yup.string().optional(),
  is_remote: yup.boolean().optional(),
  description: yup.string().optional(),
  address: yup
    .object()
    .shape({
      city: yup.string().optional(),
      street: yup.string().optional(),
      number: yup.number().max(99999).optional(),
      zipCode: yup.string().optional(),
      district: yup.string().optional(),
    })
    .optional(),
  tickets: yup
    .object()
    .shape({
      avaible_quantity: yup.number().optional(),
      price: yup.number().optional(),
      sold_amount: yup.number().optional(),
    })
    .optional(),
});

export { updateEstablishmentSchema };
