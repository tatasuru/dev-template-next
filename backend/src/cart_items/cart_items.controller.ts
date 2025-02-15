import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CartItem } from './entities/cart_item.entity';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Get()
  @ApiOperation({
    summary: '全カート',
  })
  @ApiResponse({
    status: 200,
    description: '全カートアイテム取得',
  })
  async findAll(): Promise<CartItem[]> {
    try {
      return await this.cartItemsService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'IDからカートアイテム取得',
  })
  @ApiResponse({
    status: 200,
    description: 'IDからカートアイテム取得',
  })
  @ApiResponse({
    status: 404,
    description: 'カートアイテムが見つかりません',
  })
  async findOne(@Param('id') id: string): Promise<CartItem> {
    try {
      return await this.cartItemsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({
    summary: 'カートアイテム作成',
  })
  @ApiResponse({
    status: 201,
    description: 'カートアイテム作成',
  })
  @ApiBody({ type: CreateCartItemDto })
  async create(
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    try {
      return await this.cartItemsService.create(createCartItemDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'IDからカートアイテム更新',
  })
  @ApiResponse({
    status: 200,
    description: 'IDからカートアイテム更新',
  })
  @ApiResponse({
    status: 404,
    description: 'カートアイテムが見つかりません',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    try {
      return await this.cartItemsService.update(+id, updateCartItemDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'IDからカートアイテム削除',
  })
  @ApiResponse({
    status: 200,
    description: 'IDからカートアイテム削除',
  })
  @ApiResponse({
    status: 404,
    description: 'カートアイテムが見つかりません',
  })
  async remove(@Param('id') id: string): Promise<string> {
    try {
      return this.cartItemsService.delete(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }
}
