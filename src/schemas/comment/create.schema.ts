import * as yup from "yup";

const createCommentSchema = yup.object().shape({
  comment: yup.string().required(),
});

export { createCommentSchema };
