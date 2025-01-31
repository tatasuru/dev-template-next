import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGender } from './user-gender.enum';
import { v4 as uuid } from 'uuid';
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
}
