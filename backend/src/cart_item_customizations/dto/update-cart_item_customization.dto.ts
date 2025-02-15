import { PartialType } from '@nestjs/swagger';
import { CreateCartItemCustomizationDto } from './create-cart_item_customization.dto';

export class UpdateCartItemCustomizationDto extends PartialType(CreateCartItemCustomizationDto) {}
