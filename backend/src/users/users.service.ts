import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGender } from './user-gender.enum';
// import { v4 as uuid } from 'uuid';
import { User } from './users.model';
import { Carts } from '../carts/entities/cart.entity';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private itemRepository: Repository<Users>,
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    const found = await this.itemRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async create(user: {
    name: string;
    phone_number: string;
    gender: UserGender;
    birth_date: string;
  }): Promise<Users> {
    const item = this.itemRepository.create({
      name: user.name,
      phone_number: user.phone_number,
      gender: user.gender,
      birth_date: user.birth_date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const users = await this.itemRepository.save(item);
    const userId = users.id;

    const found = await this.cartRepository.findOne({
      where: { user_id: userId },
    });

    if (!found) {
      return users;
    } else {
      const newCart = this.cartRepository.create({ user_id: userId });
      await this.cartRepository.save(newCart);
    }

    return users;
  }

  async delete(id: number): Promise<string> {
    try {
      const found = await this.cartRepository.findOne({
        where: { user_id: id },
      });

      if (found) {
        await this.cartRepository.delete(found.id);
      }

      await this.itemRepository.delete(id);
      return `User with ID "${id}" has been deleted`;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
