import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  @Column('integer', {
    name: 'customization_category_ids',
    array: true,
    nullable: true,
    default: [],
  })
  customization_category_ids: number[];

  @ManyToMany(
    () => CustomizationCategories,
    (category) => category.recipe_customizations,
  )
  @JoinTable({
    name: 'recipe_customization_categories',
    joinColumn: {
      name: 'recipe_customization_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'customization_category_id',
      referencedColumnName: 'id',
    },
  })
  customization_categories: CustomizationCategories[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
