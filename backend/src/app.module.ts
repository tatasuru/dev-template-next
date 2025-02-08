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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
