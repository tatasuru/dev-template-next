import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { Carts } from './entities/cart.entity';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @ApiOperation({
    summary: '全カート取得',
  })
  @ApiQuery({
    name: 'user_id',
    required: false,
    type: Number,
    description: 'ユーザーIDでフィルター',
  })
  @ApiResponse({
    status: 200,
    description: '全カート取得',
  })
  async findAll(@Query('user_id') user_id?: number): Promise<Carts[]> {
    try {
      return await this.cartsService.findAll(user_id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'IDからカート取得',
  })
  @ApiResponse({
    status: 200,
    description: 'IDからカート取得',
  })
  @ApiResponse({
    status: 404,
    description: 'カートが見つかりません',
  })
  async findOne(@Param('id') id: string): Promise<Carts> {
    try {
      return await this.cartsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({
    summary: 'カート作成',
  })
  @ApiResponse({
    status: 201,
    description: 'カート作成',
  })
  @ApiBody({ type: Carts })
  async create(@Body() createCartDto: Carts): Promise<Carts> {
    try {
      return await this.cartsService.create(createCartDto.user_id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'IDからカート削除',
  })
  @ApiResponse({
    status: 200,
    description: 'IDからカート削除',
  })
  @ApiResponse({
    status: 404,
    description: 'カートが見つかりません',
  })
  async delete(@Param('id') id: string): Promise<string> {
    try {
      return this.cartsService.delete(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
