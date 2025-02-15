import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemCustomizationsService } from './cart_item_customizations.service';
import { CartItemCustomizationsController } from './cart_item_customizations.controller';
import { CartItem } from '../cart_items/entities/cart_item.entity';
import { CartItemCustomization } from './entities/cart_item_customization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemCustomization, CartItem])],
  controllers: [CartItemCustomizationsController],
  providers: [CartItemCustomizationsService],
})
export class CartItemCustomizationsModule {}
