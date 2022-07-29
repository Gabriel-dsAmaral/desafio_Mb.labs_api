import "express-async-errors";
import { Router } from "express";
import userController from "../controllers/user.controller";

import { validadeSchema, validateToken, verifyAdmin } from "../middlewares";
import {
  createUserSchema,
  loginUserSchema,
} from "../schemas/user/create.schema";
import { userUpdateSchema } from "../schemas/user/user.schema";

const userRouter = Router();

userRouter.post(
  "/signup",
  validadeSchema(createUserSchema),
  validateToken,
  verifyAdmin,
  userController.createUser
);
userRouter.post(
  "/signin",
  validadeSchema(loginUserSchema),
  userController.loginUser
);
userRouter.get("/users", validateToken, userController.getUser);
userRouter.get(
  "/users/:id",
  validateToken,
  verifyAdmin,
  userController.getById
);
userRouter.patch(
  "/users/:id",
  validadeSchema(userUpdateSchema),
  validateToken,
  userController.update
);

export default userRouter;
