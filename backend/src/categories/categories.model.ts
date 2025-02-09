import { Recipe } from '../recipes/recipes.model';

export interface Category {
  id: number;
  name: string;
  display_order: number;
  recipes: Recipe[];
  createdAt: string;
  updatedAt: string;
}
