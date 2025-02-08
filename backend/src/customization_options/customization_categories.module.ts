import { Module } from '@nestjs/common';
import { CustomizationCategoriesController } from './customization_categories.controller';
import { CustomizationCategoriesService } from './customization_options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomizationCategories } from './customization_options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomizationCategories])],
  controllers: [CustomizationCategoriesController],
  providers: [CustomizationCategoriesService],
})
export class CustomizationCategoriesModule {}
