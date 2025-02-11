import { Recipe } from '../recipes/recipes.model';

export interface CustomizationCategory {
  id: number;
  name: string;
  value: string;
  display_order: number;
  multiple_select: boolean;
  required: boolean;
  createdAt: string;
  updatedAt: string;
}
