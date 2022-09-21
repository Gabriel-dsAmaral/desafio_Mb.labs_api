import errorHandling from "./errorHandling.middleware";
import validateToken from "./validateToken.middleware";
import validadeSchema from "./validateSchema.middleware";
import verifyAdmin from "./verifyAdmin.middleware";
import getEventByIdOr404 from "./getEventByIdOr404.middleware";
import getCommentByIdOr404 from "./getCommentByIdOr404.middleware";
import getRateByIdOr404 from "./getRateByIdOr404.middleware";

export {
  validadeSchema,
  errorHandling,
  validateToken,
  verifyAdmin,
  getEventByIdOr404,
  getCommentByIdOr404,
  getRateByIdOr404,
};
