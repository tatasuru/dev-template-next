import { Module } from '@nestjs/common';
import { CustomizationCategoriesController } from './customization_categories.controller';
import { CustomizationCategoriesService } from './customization_categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomizationCategories } from './customization_categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomizationCategories])],
  controllers: [CustomizationCategoriesController],
  providers: [CustomizationCategoriesService],
})
export class CustomizationCategoriesModule {}
