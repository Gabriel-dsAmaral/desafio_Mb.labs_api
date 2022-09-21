import { Express } from "express";
import userRouter from "./user.routes";
import eventRouter from "./event.routes";
import commentRouter from "./comment.routes";
import rateRouter from "./rate.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRouter);
  app.use("/api", eventRouter);
  app.use("/api", commentRouter);
  app.use("/api", rateRouter);
};

export default registerRouters;
