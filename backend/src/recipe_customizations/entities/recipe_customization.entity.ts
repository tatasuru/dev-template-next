import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recipes } from '../../recipes/recipes.entity';
import { CustomizationCategories } from '../../customization_categories/customization_categories.entity';

@Entity('recipe_customizations')
export class RecipeCustomizations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'recipe_id' })
  recipe_id: number;

  @ManyToOne(() => Recipes)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipes;

  @Column({ name: 'customization_category_id' })
  customization_category_id: number;

  @ManyToOne(() => CustomizationCategories)
  @JoinColumn({ name: 'customization_category_id' })
  customizationCategory: CustomizationCategories;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
