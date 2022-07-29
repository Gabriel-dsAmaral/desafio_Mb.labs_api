import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Tickets } from "./tickets.entity";
import { User } from "./user.entity";

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

  @ManyToMany(() => User, (user) => user.my_events, { lazy: true })
  users: User[];
}
