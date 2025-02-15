import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartItemCustomizationDto } from './dto/create-cart_item_customization.dto';
import { UpdateCartItemCustomizationDto } from './dto/update-cart_item_customization.dto';
import { CartItemCustomization } from './entities/cart_item_customization.entity';

@Injectable()
export class CartItemCustomizationsService {
  constructor(
    @InjectRepository(CartItemCustomization)
    private cartItemCustomizationRepository: Repository<CartItemCustomization>,
  ) {}

  async findAll(cartItemId: number): Promise<CartItemCustomization[]> {
    try {
      const options = {
        relations: {
          cartItem: true,
          customizationOption: true,
        },
        where: {},
      };

      if (cartItemId) {
        options.where = { cartItemId };
      }

      const customizations =
        await this.cartItemCustomizationRepository.find(options);

      if (!customizations.length) {
        const errorMessage = cartItemId
          ? `No customizations found for cart item ID "${cartItemId}"`
          : 'No customizations found';
        throw new NotFoundException(errorMessage);
      }

      return customizations;
    } catch (error) {
      throw new NotFoundException(`CartItemCustomizations not found`);
    }
  }

  async findOne(id: number): Promise<CartItemCustomization> {
    const found = await this.cartItemCustomizationRepository.findOne({
      where: { id },
      relations: {
        cartItem: true,
        customizationOption: true,
      },
    });

    if (!found) {
      throw new NotFoundException(
        `CartItemCustomization with ID "${id}" not found`,
      );
    }

    return found;
  }

  async create(
    createCartItemCustomizationDto: CreateCartItemCustomizationDto,
  ): Promise<CartItemCustomization> {
    try {
      const item = this.cartItemCustomizationRepository.create(
        createCartItemCustomizationDto,
      );
      const savedItem = await this.cartItemCustomizationRepository.save(item);
      return this.findOne(savedItem.id);
    } catch (error) {
      throw new Error(
        `Failed to create cartItemCustomization: ${error.message}`,
      );
    }
  }

  async delete(id: number): Promise<string> {
    try {
      this.cartItemCustomizationRepository.delete(id);
      return `CartItemCustomization with ID "${id}" deleted`;
    } catch (error) {
      throw new Error(
        `Failed to delete cartItemCustomization: ${error.message}`,
      );
    }
  }
}
