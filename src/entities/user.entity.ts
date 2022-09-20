import { compare, hash } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { CommentEvents } from "./commentEvent.entity";
import { RateEvents } from "./rateEvent.entity";
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

  @Column({ default: false })
  is_superuser: boolean;

  @OneToMany(() => CommentEvents, (commentEvent) => commentEvent.user)
  commentEvent: CommentEvents[];

  @OneToMany(() => RateEvents, (rateEvent) => rateEvent.user)
  rateEvent: RateEvents[];

  @ManyToMany(() => Event, (event) => event.users, { eager: true })
  @JoinTable()
  my_events: Event[];

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return this.password && (this.password = await hash(this.password, 10));
  }
}
