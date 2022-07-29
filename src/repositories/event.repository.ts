import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Event } from "../entities/event.entity";

type TFindEvt = { evtId: string; ownerEmail: string };
interface IEventRepo {
  save: (event: Partial<Event>) => Promise<Event>;
  findOne: (payload: object) => Promise<Event | null>;
  getAll: () => Promise<Event[]>;
  update: (id: string, payload: Partial<Event>) => Promise<UpdateResult>;
}

class EventRepo implements IEventRepo {
  private ormRepo: Repository<Event>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Event);
  }

  save = async (event: Partial<Event>) => {
    return await this.ormRepo.save(event);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<Event>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new EventRepo();
