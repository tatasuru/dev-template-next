import { Module } from '@nestjs/common';
import { OrderCustomizationsService } from './order_customizations.service';
import { OrderCustomizationsController } from './order_customizations.controller';

@Module({
  controllers: [OrderCustomizationsController],
  providers: [OrderCustomizationsService],
})
export class OrderCustomizationsModule {}
