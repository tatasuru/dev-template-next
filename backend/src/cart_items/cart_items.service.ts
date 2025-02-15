import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from '../cart_items/entities/cart_item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findAll(): Promise<CartItem[]> {
    try {
      return await this.cartItemRepository.find({
        relations: {
          cart: true,
          recipe: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`CartItems not found`);
    }
  }

  async findOne(id: number) {
    const found = await this.cartItemRepository.findOne({
      where: { id },
      relations: {
        cart: true,
        recipe: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`CartItem with ID "${id}" not found`);
    }

    return found;
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    try {
      const item = this.cartItemRepository.create(createCartItemDto);
      const savedItem = await this.cartItemRepository.save(item);
      return this.findOne(savedItem.id);
    } catch (error) {
      throw new Error(`Failed to create cartItem: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    try {
      const item = await this.cartItemRepository.findOne({
        where: { id },
        relations: {
          cart: true,
          recipe: true,
        },
      });
      Object.assign(item, updateCartItemDto);
      const updatedItem = await this.cartItemRepository.save(item);
      return this.findOne(updatedItem.id);
    } catch (error) {
      throw new Error(`Failed to update cartItem: ${error.message}`);
    }
  }

  delete(id: number) {
    try {
      this.cartItemRepository.delete(id);
      return `CartItem with ID "${id}" has been deleted`;
    } catch (error) {
      throw new Error(`Failed to delete cartItem: ${error.message}`);
    }
  }
}
