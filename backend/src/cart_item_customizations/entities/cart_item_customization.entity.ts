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
import { CartItem } from '../../cart_items/entities/cart_item.entity';
import { CustomizationOptions } from '../../customization_options/customization_options.entity';

@Entity('cart_item_customizations')
export class CartItemCustomization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_item_id' })
  cart_item_id: number;

  @Column({ name: 'customization_option_id' })
  customization_option_id: number;

  @ManyToOne(() => CartItem, (cartItem) => cartItem.customizations)
  @JoinColumn({ name: 'cart_item_id' })
  cartItem: CartItem;

  @ManyToOne(
    () => CustomizationOptions,
    (customizationOption) => customizationOption.order_customizations,
  )
  @JoinColumn({ name: 'customization_option_id' })
  customizationOption: CustomizationOptions;

  @CreateDateColumn()
  createdAt: Date;
}
