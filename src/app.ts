import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import { errorHandler } from "./errors/errors";
import registerRouters from "./routes";
import { errorHandling } from "./middlewares";

const app = express();

app.use(express.json());

registerRouters(app);

app.use(errorHandling);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
