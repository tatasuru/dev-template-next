import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { UserGender } from './user-gender.enum';
import { Carts } from '../carts/entities/cart.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;

  @Column({ type: 'text' })
  birth_date: string;

  @OneToMany(() => Carts, (cart) => cart.user)
  carts: Carts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
