import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomizationOption } from './customization_options.model';
import { CustomizationOptions } from './customization_options.entity';

@Injectable()
export class CustomizationOptionsService {
  constructor(
    @InjectRepository(CustomizationOptions)
    private itemRepository: Repository<CustomizationOption>,
  ) {}

  async findAll(): Promise<CustomizationOption[]> {
    return await this.itemRepository.find({
      order: {
        display_order: 'ASC',
      },
      relations: ['customization_category', 'order_customizations'],
    });
  }

  async findOne(id: number): Promise<CustomizationOption> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['customization_category', 'order_customizations'],
    });

    if (!found) {
      throw new NotFoundException(
        `CustomizationOption with ID "${id}" not found`,
      );
    }

    return found;
  }

  async create(customization_option: {
    name: string;
    customization_category_id: number;
    image_url: string;
    additional_price: number;
    display_order: number;
  }): Promise<CustomizationOption> {
    const item = this.itemRepository.create({
      name: customization_option.name,
      customization_category_id: customization_option.customization_category_id,
      image_url: customization_option.image_url,
      additional_price: customization_option.additional_price,
      display_order: customization_option.display_order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.itemRepository.save(item);
  }

  async update(
    id: number,
    customization_option: {
      name: string;
      image_url: string;
      additional_price: number;
      display_order: number;
    },
  ): Promise<CustomizationOption> {
    const item = await this.findOne(id);

    item.name = customization_option.name;
    item.image_url = customization_option.image_url;
    item.additional_price = customization_option.additional_price;
    item.display_order = customization_option.display_order;
    item.updatedAt = new Date().toISOString();

    return await this.itemRepository.save(item);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `CustomizationOption with ID ${id} not found`,
      );
    }

    return {
      message: `CustomizationOption with ID ${id} has been successfully deleted`,
    };
  }
}
