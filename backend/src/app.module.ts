import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { CategoriesModule } from './categories/categories.module';
import { CustomizationCategoriesModule } from './customization_categories/customization_categories.module';
import { CustomizationOptionsModule } from './customization_options/customization_options.module';
import { OrdersModule } from './orders/orders.module';
import { RecipeCustomizationsModule } from './recipe_customizations/recipe_customizations.module';
import { OrderCustomizationsModule } from './order_customizations/order_customizations.module';

@Module({
  // TODO: find env variables in ../../.env
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    RecipesModule,
    CategoriesModule,
    CustomizationCategoriesModule,
    CustomizationOptionsModule,
    OrdersModule,
    RecipeCustomizationsModule,
    OrderCustomizationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
