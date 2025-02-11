import { PartialType } from '@nestjs/swagger';
import { CreateOrderCustomizationDto } from './create-order_customization.dto';

export class UpdateOrderCustomizationDto extends PartialType(
  CreateOrderCustomizationDto,
) {
  order_id: number;
  customization_option_id: number;
}
