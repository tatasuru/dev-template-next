import { Module } from '@nestjs/common';
import { CustomizationOptionsController } from './customization_options.controller';
import { CustomizationOptionsService } from './customization_options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomizationOptions } from './customization_options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomizationOptions])],
  controllers: [CustomizationOptionsController],
  providers: [CustomizationOptionsService],
})
export class CustomizationOptionsModule {}
