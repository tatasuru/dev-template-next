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

  async findAll(): Promise<CustomizationCategory[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<CustomizationCategory> {
    const found = await this.itemRepository.findOne({
      where: { id },
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
    const item = this.itemRepository.create({
      name: customization_category.name,
      display_order: customization_category.display_order,
      multiple_select: customization_category.multiple_select,
      required: customization_category.required,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.itemRepository.save(item);
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
    const item = await this.findOne(id);

    item.name = customization_category.name;
    item.display_order = customization_category.display_order;
    item.multiple_select = customization_category.multiple_select;
    item.required = customization_category.required;
    item.updatedAt = new Date().toISOString();

    return await this.itemRepository.save(item);
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
