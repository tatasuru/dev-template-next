import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeCustomizations } from './entities/recipe_customization.entity';
import { CustomizationCategories } from '../customization_categories/customization_categories.entity';
import { RecipeCustomization } from './recipe_customizations.model';

@Injectable()
export class RecipeCustomizationsService {
  constructor(
    @InjectRepository(RecipeCustomizations)
    private itemRepository: Repository<RecipeCustomizations>,
    @InjectRepository(CustomizationCategories)
    private categoryRepository: Repository<CustomizationCategories>,
  ) {}

  async findAll(): Promise<RecipeCustomizations[]> {
    return await this.itemRepository.find({
      relations: {
        recipe: true,
        customization_categories: {
          options: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<RecipeCustomizations> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: {
        recipe: true,
        customization_categories: {
          options: true,
        },
      },
    });

    if (!found) {
      throw new NotFoundException(
        `RecipeCustomization with ID "${id}" not found`,
      );
    }

    return found;
  }

  async findAllByRecipeId(recipe_id: number): Promise<RecipeCustomizations> {
    const found = await this.itemRepository.findOne({
      where: { recipe_id },
      relations: {
        recipe: true,
        customization_categories: {
          options: true,
        },
      },
    });

    if (!found) {
      throw new NotFoundException(
        `RecipeCustomization with ID "${recipe_id}" not found`,
      );
    }

    return found;
  }

  async create(recipeCustomization: {
    recipe_id: number;
    customization_category_ids: number[];
  }): Promise<RecipeCustomizations> {
    try {
      // カテゴリエンティティを取得
      const categories = await this.categoryRepository.findByIds(
        recipeCustomization.customization_category_ids,
      );

      const item = this.itemRepository.create({
        recipe_id: recipeCustomization.recipe_id,
        customization_category_ids:
          recipeCustomization.customization_category_ids,
        customization_categories: categories, // カテゴリの関連付け
      });

      return await this.itemRepository.save(item);
    } catch (error) {
      throw new Error(
        `Failed to create recipe customization: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    recipeCustomization: {
      recipe_id?: number;
      customization_category_ids?: number[];
    },
  ): Promise<RecipeCustomizations> {
    const item = await this.findOne(id);

    if (recipeCustomization.recipe_id) {
      item.recipe_id = recipeCustomization.recipe_id;
    }

    if (recipeCustomization.customization_category_ids) {
      const categories = await this.categoryRepository.findByIds(
        recipeCustomization.customization_category_ids,
      );
      item.customization_category_ids =
        recipeCustomization.customization_category_ids;
      item.customization_categories = categories;
    }

    return await this.itemRepository.save(item);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `RecipeCustomization with ID ${id} not found`,
      );
    }

    return {
      message: `RecipeCustomization with ID ${id} has been successfully deleted`,
    };
  }
}
