import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tickets")
export class Tickets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  avaible_quantity: number;

  @Column()
  price: number;

  @Column()
  sold_amount: number;
}
