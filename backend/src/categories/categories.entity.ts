import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Recipes } from '../recipes/recipes.entity';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Index()
  @Column({ name: 'display_order', type: 'int', nullable: false })
  display_order: number;

  @OneToMany(() => Recipes, (recipe) => recipe.category)
  recipes: Recipes[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
