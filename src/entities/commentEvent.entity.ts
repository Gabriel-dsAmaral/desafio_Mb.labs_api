import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

@Entity("commentEvents")
export class CommentEvents {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.commentEvent)
  user: User;
  @JoinColumn()
  user_data: User;

  @ManyToOne(() => Event, (event) => event.commentEvent)
  event: Event;
}
