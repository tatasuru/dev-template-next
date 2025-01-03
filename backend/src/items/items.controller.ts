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
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Post()
  create(@Body() createItem: CreateItemDto): Item {
    return this.itemsService.create(createItem);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): { message: string } {
    const result = this.itemsService.delete(id);
    return { message: result };
  }
}
