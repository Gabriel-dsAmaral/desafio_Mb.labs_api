import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { CommentEvents } from "../entities/commentEvent.entity";

interface ICommentRepo {
  save: (comments: Partial<CommentEvents>) => Promise<CommentEvents>;
  findOne: (payload: object) => Promise<CommentEvents | null>;
  getAll: () => Promise<CommentEvents[]>;
  update: (
    id: string,
    payload: Partial<CommentEvents>
  ) => Promise<UpdateResult>;
}

class commentsRepo implements ICommentRepo {
  private ormRepo: Repository<CommentEvents>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(CommentEvents);
  }

  save = async (comments: Partial<CommentEvents>) => {
    return await this.ormRepo.save(comments);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<CommentEvents>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new commentsRepo();
