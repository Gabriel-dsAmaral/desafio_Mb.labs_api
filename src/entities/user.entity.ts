import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Event } from "./event.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  user_name: string;

  @Column()
  avatar_url: string;

  @Column()
  banner_url: string;

  @Column()
  is_superuser: boolean;

  @ManyToMany(() => Event, (event) => event.users, { eager: true })
  @JoinTable()
  my_events: Event[];

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };
}
