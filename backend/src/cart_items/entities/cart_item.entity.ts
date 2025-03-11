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
import { CartItemCustomization } from '../../cart_item_customizations/entities/cart_item_customization.entity';
import { Carts } from '../../carts/entities/cart.entity';
import { Recipes } from '../../recipes/recipes.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_id' })
  cart_id: number;

  @Column({ name: 'recipe_id' })
  recipe_id: number;

  @ManyToOne(() => Recipes, (recipe) => recipe.cartItems)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipes;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'special_request' })
  special_request: string;

  @ManyToOne(() => Carts, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Carts;

  @OneToMany(
    () => CartItemCustomization,
    (cartItemCustomization) => cartItemCustomization.cartItem,
  )
  customizations: CartItemCustomization[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
