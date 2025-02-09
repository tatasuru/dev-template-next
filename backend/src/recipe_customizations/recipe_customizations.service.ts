import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeCustomizations } from './entities/recipe_customization.entity';
import { RecipeCustomization } from './recipe_customizations.model';

@Injectable()
export class RecipeCustomizationsService {
  constructor(
    @InjectRepository(RecipeCustomizations)
    private itemRepository: Repository<RecipeCustomization>,
  ) {}

  async findAll(): Promise<RecipeCustomization[]> {
    return await this.itemRepository.find({
      relations: ['recipe', 'customizationCategory'],
    });
  }

  async findOne(id: number): Promise<RecipeCustomization> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['recipe', 'customizationCategory'],
    });

    if (!found) {
      throw new NotFoundException(
        `RecipeCustomization with ID "${id}" not found`,
      );
    }

    return found;
  }

  async create(recipeCustomization: {
    recipe_id: number;
    customization_category_id: number;
  }): Promise<RecipeCustomization> {
    const item = this.itemRepository.create({
      recipe_id: recipeCustomization.recipe_id,
      customization_category_id: recipeCustomization.customization_category_id,
    });

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
