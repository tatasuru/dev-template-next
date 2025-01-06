import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item';
import { ItemStatus } from './item-status.enum';
import { Item } from './items.model';
import { v4 as uuid } from 'uuid';
import { Items } from './items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async create(createItem: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create({
      id: uuid(),
      ...createItem,
      status: ItemStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.itemRepository.save(item);
  }

  async delete(id: string): Promise<string> {
    await this.itemRepository.delete(id);
    return `item_id: ${id} delete success`;
  }
}
