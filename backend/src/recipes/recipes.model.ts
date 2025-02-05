import { Category } from 'src/categories/categories.model';
export interface Recipe {
  id: number;
  category_id: number;
  category: Category;
  name: string;
  description: string;
  base_price: number;
  calories: number;
  cooking_time: number;
  badge: string;
  image_url: string;
  is_sold_out: boolean;
  createdAt: string;
  updatedAt: string;
}
