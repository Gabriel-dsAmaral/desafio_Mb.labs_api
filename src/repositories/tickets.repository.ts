import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Tickets } from "../entities/tickets.entity";

interface ITicketsRepo {
  save: (tickets: Partial<Tickets>) => Promise<Tickets>;
  findOne: (payload: Partial<Tickets>) => Promise<Tickets | null>;
  getAll: () => Promise<Tickets[]>;
  update: (id: string, payload: Partial<Tickets>) => Promise<UpdateResult>;
}

class ticketsRepo implements ITicketsRepo {
  private ormRepo: Repository<Tickets>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Tickets);
  }

  save = async (tickets: Partial<Tickets>) => {
    return await this.ormRepo.save(tickets);
  };

  findOne = async (payload: Partial<Tickets>) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<Tickets>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new ticketsRepo();
