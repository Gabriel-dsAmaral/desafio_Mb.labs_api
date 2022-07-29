import { Express } from "express";
import userRouter from "./user.routes";
import eventRouter from "./event.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRouter);
  app.use("/api", eventRouter);
};

export default registerRouters;
