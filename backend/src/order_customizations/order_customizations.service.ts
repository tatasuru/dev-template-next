import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderCustomizationDto } from './dto/create-order_customization.dto';
import { UpdateOrderCustomizationDto } from './dto/update-order_customization.dto';
import { OrderCustomizations } from 'src/order_customizations/entities/order_customization.entity';
import { OrderCustomization } from 'src/order_customizations/order_customizations.model';

@Injectable()
export class OrderCustomizationsService {
  constructor(
    @InjectRepository(OrderCustomizations)
    private itemRepository: Repository<OrderCustomization>,
  ) {}

  async findAll(): Promise<OrderCustomization[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<OrderCustomization> {
    const found = await this.itemRepository.findOne({
      where: { id },
      relations: ['order', 'customization_option'],
    });

    if (!found) {
      throw new NotFoundException(
        `OrderCustomization with ID "${id}" not found`,
      );
    }

    return found;
  }

  async create(
    createOrderCustomizationDto: CreateOrderCustomizationDto,
  ): Promise<OrderCustomization> {
    const item = this.itemRepository.create({
      order_id: createOrderCustomizationDto.order_id,
      customization_option_id:
        createOrderCustomizationDto.customization_option_id,
    });

    return await this.itemRepository.save(item);
  }

  async update(
    id: number,
    updateOrderCustomizationDto: UpdateOrderCustomizationDto,
  ): Promise<OrderCustomization> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['order', 'customization_option'],
    });

    item.order_id = updateOrderCustomizationDto.order_id;
    item.customization_option_id =
      updateOrderCustomizationDto.customization_option_id;
    item.updatedAt = new Date().toISOString();

    return await this.itemRepository.save(item);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.itemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `OrderCustomization with ID "${id}" not found`,
      );
    }

    return {
      message: `OrderCustomization with ID "${id}" deleted`,
    };
  }
}
