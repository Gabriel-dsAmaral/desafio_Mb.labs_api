import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { RateEvents } from "../entities/rateEvent.entity";

interface IRateRepo {
  save: (rates: Partial<RateEvents>) => Promise<RateEvents>;
  findOne: (payload: object) => Promise<RateEvents | null>;
  getAll: () => Promise<RateEvents[]>;
  update: (id: string, payload: Partial<RateEvents>) => Promise<UpdateResult>;
}

class ratesRepo implements IRateRepo {
  private ormRepo: Repository<RateEvents>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(RateEvents);
  }

  save = async (rates: Partial<RateEvents>) => {
    return await this.ormRepo.save(rates);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<RateEvents>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new ratesRepo();
