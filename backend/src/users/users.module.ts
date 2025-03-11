import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Carts } from '../carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Carts])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
