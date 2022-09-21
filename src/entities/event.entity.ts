import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./address.entity";
import { Tickets } from "./tickets.entity";
import { User } from "./user.entity";
import { CommentEvents } from "./commentEvent.entity";
import { RateEvents } from "./rateEvent.entity";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title: string;

  @Column()
  owner_name: string;

  @Column()
  banner_url: string;

  @Column()
  icon_url: string;

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @Column()
  is_remote: boolean;

  @OneToOne((type) => Tickets, {
    eager: true,
  })
  @JoinColumn()
  tickets: Tickets;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 5 })
  average_rate: number;

  @OneToMany(() => CommentEvents, (commentEvent) => commentEvent.event)
  commentEvent: CommentEvents[];

  @OneToMany(() => RateEvents, (rateEvent) => rateEvent.event)
  rateEvent: RateEvents[];

  @ManyToMany(() => User, (user) => user.my_events, { lazy: true })
  users: User[];

  @JoinColumn()
  comments: CommentEvents[];
}
