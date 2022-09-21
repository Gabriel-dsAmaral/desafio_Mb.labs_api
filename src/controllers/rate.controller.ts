import { Request, Response } from "express";
import rateService from "../services/rate.service";

class RateController {
  createRate = async (req: Request, res: Response) => {
    const event = await rateService.createRate(req);
    return res.status(201).json(event);
  };

  updateRate = async (req: Request, res: Response) => {
    const updatedRate = await rateService.updateRate(req);
    return res.status(200).json(updatedRate);
  };
}

export default new RateController();
