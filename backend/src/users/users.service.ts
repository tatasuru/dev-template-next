import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGender } from './user-gender.enum';
// import { v4 as uuid } from 'uuid';
import { User } from './users.model';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private itemRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<User> {
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
  }): Promise<User> {
    const item = this.itemRepository.create({
      name: user.name,
      phone_number: user.phone_number,
      gender: user.gender,
      birth_date: user.birth_date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.itemRepository.save(item);
  }
}
