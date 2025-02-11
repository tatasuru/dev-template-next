import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCustomizationsService } from './order_customizations.service';
import { OrderCustomizationsController } from './order_customizations.controller';
import { OrderCustomizations } from 'src/order_customizations/entities/order_customization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCustomizations])],
  controllers: [OrderCustomizationsController],
  providers: [OrderCustomizationsService],
})
export class OrderCustomizationsModule {}
