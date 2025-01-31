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
import { ItemResponseDto } from './dto/item-response.dto';
import { ItemStatus } from './item-status.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'TODOリスト取得' })
  @ApiResponse({
    status: 200,
    description: 'TODOリスト取得',
    type: ItemResponseDto,
    isArray: true,
  })
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
