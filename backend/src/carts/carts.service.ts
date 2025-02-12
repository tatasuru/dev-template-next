import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts } from './entities/cart.entity';
import { Users } from '../users/users.entity';
// TODO: import related entities

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Carts[]> {
    return await this.cartRepository.find({
      relations: {
        user: true,
        // cart_items: {
        //   options: true,
        // },
      },
    });
  }

  async findOne(id: number): Promise<Carts> {
    const found = await this.cartRepository.findOne({
      where: { id },
      relations: {
        user: true,
        // cart_items: {
        //   options: true,
        // },
      },
    });

    if (!found) {
      throw new NotFoundException(`Cart with ID "${id}" not found`);
    }

    return found;
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
