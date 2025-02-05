import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.model';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private itemRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const found = await this.itemRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return found;
  }

  async create(category: {
    name: string;
    display_order: number;
  }): Promise<Category> {
    const item = this.itemRepository.create({
      name: category.name,
      display_order: category.display_order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

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
