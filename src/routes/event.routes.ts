import { Router } from "express";
import EventController from "../controllers/event.controller";
import { createEventSchema, updateEstablishmentSchema } from "../schemas/event";
import {
  validadeSchema,
  verifyAdmin,
  validateToken,
  getEventByIdOr404,
} from "../middlewares";

const eventRouter = Router();

eventRouter.post(
  "/events",
  validateToken,
  verifyAdmin,
  validadeSchema(createEventSchema),
  EventController.createEvent
);

eventRouter.get("/events", EventController.getEvents);

eventRouter.get("/events/:id", getEventByIdOr404, EventController.getOneEvent);

eventRouter.patch(
  "/events/:id",
  validateToken,
  verifyAdmin,
  getEventByIdOr404,
  validadeSchema(updateEstablishmentSchema),
  EventController.updateEvent
);

eventRouter.patch(
  "/events/isactive/:id",
  validateToken,
  verifyAdmin,
  getEventByIdOr404,
  EventController.isActive
);

export default eventRouter;
