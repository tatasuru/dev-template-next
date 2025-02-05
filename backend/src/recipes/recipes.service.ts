import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipes.model';
import { Recipes } from './recipes.entity';
import { RecipeCreateDto } from './dto/recipe-create.dto';
import { RecipeUpdateDto } from './dto/recipe-update.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private itemRepository: Repository<Recipe>,
  ) {}

  async findAll(size?: number): Promise<Recipe[]> {
    const query = this.itemRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.category', 'category')
      .orderBy('recipe.createdAt', 'DESC');

    if (size && size > 0) {
      query.take(size);
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Recipe> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!found) {
      throw new NotFoundException(`Recipe with ID "${id}" not found`);
    }

    return found;
  }

  async create(recipe: RecipeCreateDto): Promise<Recipe> {
    try {
      const newRecipe = this.itemRepository.create({
        name: recipe.name,
        category_id: recipe.category_id,
        description: recipe.description,
        base_price: recipe.base_price,
        calories: recipe.calories,
        cooking_time: recipe.cooking_time,
        badge: recipe.badge,
        image_url: recipe.image_url,
        is_sold_out: recipe.is_sold_out,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const savedRecipe = await this.itemRepository.save(newRecipe);

      // return savedRecipe;
      return await this.itemRepository.findOne({
        where: { id: savedRecipe.id },
        relations: ['category'],
      });
    } catch (error) {
      // error code 23503 is a foreign key violation
      if (error.code === '23503') {
        throw new NotFoundException(
          `Category with ID ${recipe.category_id} not found`,
        );
      }
      throw error;
    }
  }

  async update(id: number, recipe: RecipeUpdateDto): Promise<Recipe> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!found) {
      throw new NotFoundException(`Recipe with ID "${id}" not found`);
    }

    // merge the found recipe with the new recipe
    const updatedRecipe = Object.assign(found, recipe);

    try {
      await this.itemRepository.save(updatedRecipe);
      return await this.itemRepository.findOne({
        where: { id },
        relations: ['category'],
      });
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(
          `Category with ID ${recipe.category_id} not found`,
        );
      }
      throw error;
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return {
      message: `Recipe with ID ${id} has been successfully deleted`,
    };
  }
}
