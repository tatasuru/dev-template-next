import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { Carts } from '../carts/entities/cart.entity';
import { CartItem } from './entities/cart_item.entity';
import { CartItemCustomization } from '../cart_item_customizations/entities/cart_item_customization.entity';
import { CustomizationOptions } from '../customization_options/customization_options.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItem,
      Carts,
      CartItemCustomization,
      CustomizationOptions,
    ]),
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
