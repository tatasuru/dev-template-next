import { CreateCartItemCustomizationDto } from '../../cart_item_customizations/dto/create-cart_item_customization.dto';
export class CreateCartItemDto {
  cart_id: number;
  recipe_id: number;
  quantity: number;
  special_request: string;
  customizations: number[];
}
