import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomizationOptions } from './customization_options.entity';
import { CreateCustomizationOptionDto } from './dto/customization_categories-create.dto';
import { UpdateCustomizationOptionDto } from './dto/customization_categories-update.dto';

@Injectable()
export class CustomizationOptionsService {
  constructor(
    @InjectRepository(CustomizationOptions)
    private readonly customizationOptionsRepository: Repository<CustomizationOptions>,
  ) {}

  async findAll(categoryId?: number): Promise<CustomizationOptions[]> {
    try {
      const options = {
        order: {
          display_order: 'ASC' as const,
        },
        relations: {
          customization_category: true,
          cartItemCustomizations: true,
          order_customizations: true,
        },
        where: {},
      };

      if (categoryId) {
        options.where = { customization_category_id: categoryId };
      }

      const customizationOptions =
        await this.customizationOptionsRepository.find(options);

      return customizationOptions;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to fetch customization options: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<CustomizationOptions> {
    const found = await this.customizationOptionsRepository.findOne({
      where: { id },
      relations: {
        customization_category: true,
        cartItemCustomizations: true,
        order_customizations: true,
      },
    });

    if (!found) {
      throw new NotFoundException(
        `Customization option with ID "${id}" not found`,
      );
    }

    return found;
  }

  async create(
    createDto: CreateCustomizationOptionDto,
  ): Promise<CustomizationOptions> {
    try {
      // Get the maximum display_order value
      const maxDisplayOrder = await this.customizationOptionsRepository
        .createQueryBuilder('option')
        .where('option.customization_category_id = :categoryId', {
          categoryId: createDto.customization_category_id,
        })
        .select('MAX(option.display_order)', 'maxOrder')
        .getRawOne();

      const newDisplayOrder = (maxDisplayOrder?.maxOrder || 0) + 1;

      const option = this.customizationOptionsRepository.create({
        ...createDto,
        display_order: newDisplayOrder,
      });

      const savedOption =
        await this.customizationOptionsRepository.save(option);
      return this.findOne(savedOption.id);
    } catch (error) {
      throw new Error(
        `Failed to create customization option: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateDto: UpdateCustomizationOptionDto,
  ): Promise<CustomizationOptions> {
    const option = await this.findOne(id);

    try {
      // If display_order is being updated, ensure it's valid
      if (updateDto.display_order) {
        const maxDisplayOrder = await this.customizationOptionsRepository.count(
          {
            where: {
              customization_category_id: option.customization_category_id,
            },
          },
        );

        if (updateDto.display_order > maxDisplayOrder) {
          updateDto.display_order = maxDisplayOrder;
        }
      }

      const updatedOption = await this.customizationOptionsRepository.save({
        ...option,
        ...updateDto,
      });

      return this.findOne(updatedOption.id);
    } catch (error) {
      throw new Error(
        `Failed to update customization option: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const option = await this.findOne(id);

    try {
      await this.customizationOptionsRepository.remove(option);

      // Reorder remaining options
      await this.customizationOptionsRepository
        .createQueryBuilder()
        .update(CustomizationOptions)
        .set({
          display_order: () => 'display_order - 1',
        })
        .where(
          'customization_category_id = :categoryId AND display_order > :orderNum',
          {
            categoryId: option.customization_category_id,
            orderNum: option.display_order,
          },
        )
        .execute();

      return {
        message: `Customization option with ID "${id}" has been removed`,
      };
    } catch (error) {
      throw new Error(
        `Failed to remove customization option: ${error.message}`,
      );
    }
  }

  async updateOrder(
    categoryId: number,
    orderUpdates: { id: number; display_order: number }[],
  ): Promise<CustomizationOptions[]> {
    try {
      // Update each option's display_order
      await Promise.all(
        orderUpdates.map((update) =>
          this.customizationOptionsRepository.update(
            { id: update.id },
            { display_order: update.display_order },
          ),
        ),
      );

      // Return updated options in new order
      return this.findAll(categoryId);
    } catch (error) {
      throw new Error(`Failed to update display order: ${error.message}`);
    }
  }
}
