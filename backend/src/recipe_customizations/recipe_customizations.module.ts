import { Module } from '@nestjs/common';
import { RecipeCustomizationsService } from './recipe_customizations.service';
import { RecipeCustomizationsController } from './recipe_customizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCustomizations } from './entities/recipe_customization.entity';
import { CustomizationCategories } from '../customization_categories/customization_categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeCustomizations, CustomizationCategories]),
  ],
  controllers: [RecipeCustomizationsController],
  providers: [RecipeCustomizationsService],
})
export class RecipeCustomizationsModule {}
