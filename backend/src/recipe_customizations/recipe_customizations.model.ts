export interface RecipeCustomization {
  id: number;
  recipe_id: number;
  customization_category_ids: number[];
  customization_categories: any[];
  createdAt: string;
  updatedAt: string;
}
