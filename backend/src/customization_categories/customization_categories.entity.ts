import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  Index,
} from 'typeorm';
import { CustomizationOptions } from '../customization_options/customization_options.entity';
import { RecipeCustomizations } from '../recipe_customizations/entities/recipe_customization.entity';

@Entity('customization_categories')
export class CustomizationCategories {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  value: string;

  @Index()
  @Column({ name: 'display_order', type: 'int', nullable: false })
  display_order: number;

  @Column({
    name: 'multiple_select',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  multiple_select: boolean;

  @Column({
    name: 'required',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  required: boolean;

  @OneToMany(
    () => CustomizationOptions,
    (customizationOption) => customizationOption.customization_category,
  )
  options: CustomizationOptions[];

  @ManyToMany(
    () => RecipeCustomizations,
    (recipeCustomization) => recipeCustomization.customization_categories,
  )
  recipe_customizations: RecipeCustomizations[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
