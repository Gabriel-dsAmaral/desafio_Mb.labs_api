import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

@Entity("rateEvent")
export class RateEvents {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @Column()
  rate: number;

  @ManyToOne(() => User, (user) => user.rateEvent)
  user: User;

  @ManyToOne(() => Event, (event) => event.rateEvent)
  event: Event;
}
