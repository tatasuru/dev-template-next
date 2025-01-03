import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item';
import { ItemStatus } from './item-status.enum';
import { Item } from './items.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private todoItems: Item[] = [];

  findAll(): Item[] {
    return this.todoItems;
  }

  create(createItem: CreateItemDto): Item {
    const item = {
      id: uuid(),
      ...createItem,
      status: ItemStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todoItems.push(item);
    return item;
  }

  delete(id: string): string {
    this.todoItems = this.todoItems.filter((item) => item.id !== id);
    return `item_id: ${id} delete success`;
  }
}
