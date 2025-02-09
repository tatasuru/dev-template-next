import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomizationCategory } from './customization_categories.model';
import { CustomizationCategories } from './customization_categories.entity';

@Injectable()
export class CustomizationCategoriesService {
  constructor(
    @InjectRepository(CustomizationCategories)
    private itemRepository: Repository<CustomizationCategory>,
  ) {}

  async findAll(option_id?: number): Promise<CustomizationCategory[]> {
    const query = this.itemRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.options', 'options')
      .orderBy('category.display_order', 'ASC');

    if (option_id) {
      query.where('options.id = :option_id', { option_id });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<CustomizationCategory> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['options'],
    });

    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return found;
  }

  async create(customization_category: {
    name: string;
    display_order: number;
    multiple_select: boolean;
    required: boolean;
  }): Promise<CustomizationCategory> {
    try {
      const newCategory = this.itemRepository.create({
        name: customization_category.name,
        display_order: customization_category.display_order,
        multiple_select: customization_category.multiple_select,
        required: customization_category.required,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const savedCategory = await this.itemRepository.save(newCategory);

      return await this.itemRepository.findOne({
        where: { id: savedCategory.id },
        relations: ['options'],
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    customization_category: {
      name: string;
      display_order: number;
      multiple_select: boolean;
      required: boolean;
    },
  ): Promise<CustomizationCategory> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['options'],
    });

    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    const updatedCategory = Object.assign(found, customization_category);

    try {
      const savedCategory = await this.itemRepository.save(updatedCategory);

      return await this.itemRepository.findOne({
        where: { id: savedCategory.id },
        relations: ['options'],
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      message: `Category with ID ${id} has been successfully deleted`,
    };
  }
}
