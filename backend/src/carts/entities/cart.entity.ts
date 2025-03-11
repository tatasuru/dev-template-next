import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Users } from '../../users/users.entity';
import { CartItem } from '../../cart_items/entities/cart_item.entity';

@Entity('carts')
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Users, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
