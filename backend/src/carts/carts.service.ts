import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Carts } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
  ) {}

  async findAll(user_id: number): Promise<Carts[]> {
    const queryOptions: FindManyOptions<Carts> = {
      relations: {
        user: true,
        cartItems: true,
      },
    };

    if (user_id) {
      queryOptions.where = { user_id };
    }

    const carts = await this.cartRepository.find(queryOptions);
    return carts;
  }

  async findOne(id: number): Promise<Carts> {
    const found = await this.cartRepository.findOne({
      where: { id },
      relations: {
        user: true,
        cartItems: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`Cart with ID "${id}" not found`);
    }

    return found;
  }

  async create(user_id: number): Promise<Carts> {
    try {
      const newCart = this.cartRepository.create({ user_id });
      return await this.cartRepository.save(newCart);
    } catch (error) {
      throw new Error(`Failed to create cart: ${error.message}`);
    }
  }

  async delete(id: number): Promise<string> {
    try {
      await this.cartRepository.delete(id);
      return `Cart with ID "${id}" has been deleted`;
    } catch (error) {
      throw new Error(`Failed to delete cart: ${error.message}`);
    }
  }
}
