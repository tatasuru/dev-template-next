export class CreateCartItemDto {
  cart_id: number;
  recipe_id: number;
  quantity: number;
  special_request: string;
}
