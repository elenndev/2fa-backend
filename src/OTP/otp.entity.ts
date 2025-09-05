import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  pin: string;

  @Column('bigint')
  expiration: number;
}
