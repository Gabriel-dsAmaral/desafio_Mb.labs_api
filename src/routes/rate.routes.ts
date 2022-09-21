import { Router } from "express";
import RateController from "../controllers/rate.controller";
import {
  validateToken,
  validadeSchema,
  getEventByIdOr404,
  getRateByIdOr404,
} from "../middlewares";
import { createrateSchema } from "../schemas/rate/create.schema";

const rateRouter = Router();

rateRouter.post(
  "/rate/event/:id",
  validateToken,
  getEventByIdOr404,
  validadeSchema(createrateSchema),
  RateController.createRate
);

rateRouter.patch(
  "/rate",
  validateToken,
  validadeSchema(createrateSchema),
  RateController.updateRate
);

export default rateRouter;
