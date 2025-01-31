import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserGender } from './user-gender.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
