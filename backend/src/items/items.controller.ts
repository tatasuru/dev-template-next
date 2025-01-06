import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Post()
  async create(@Body() createItem: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItem);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    const result = await this.itemsService.delete(id);
    return { message: result };
  }
}
