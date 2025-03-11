import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { RecipeCustomizations } from '../recipe_customizations/entities/recipe_customization.entity';
import { CartItem } from '../cart_items/entities/cart_item.entity';

@Entity('recipes')
export class Recipes {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'category_id', type: 'int' })
  category_id: number;

  @ManyToOne(() => Categories, (category) => category.recipes)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @OneToMany(
    () => RecipeCustomizations,
    (recipeCustomization) => recipeCustomization.recipe,
  )
  recipe_customizations: RecipeCustomizations[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.recipe)
  cartItems: CartItem[];

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'base_price', type: 'int' })
  base_price: number;

  @Column({ type: 'int', nullable: true })
  calories: number;

  @Column({ name: 'cooking_time', type: 'int', nullable: true })
  cooking_time: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  badge: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Index()
  @Column({
    name: 'is_sold_out',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  is_sold_out: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
