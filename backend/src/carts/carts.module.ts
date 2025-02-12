import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './entities/cart.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carts, Users])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
