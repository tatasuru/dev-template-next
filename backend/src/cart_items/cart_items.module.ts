import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { Carts } from '../carts/entities/cart.entity';
import { CartItem } from './entities/cart_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Carts])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
