import {
  Controller,
  Get,
  Post,
  Body,
  Query,
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
import { CartItemCustomizationsService } from './cart_item_customizations.service';
import { CreateCartItemCustomizationDto } from './dto/create-cart_item_customization.dto';
import { UpdateCartItemCustomizationDto } from './dto/update-cart_item_customization.dto';
import { CartItemCustomization } from './entities/cart_item_customization.entity';

@ApiTags('cart-item-customizations')
@Controller('cart-item-customizations')
export class CartItemCustomizationsController {
  constructor(
    private readonly cartItemCustomizationsService: CartItemCustomizationsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '全カートアイテムカスタマイズ',
  })
  @ApiQuery({
    name: 'cartItemId',
    required: false,
    type: String,
    description: 'カートアイテムIDによるフィルタリング',
  })
  @ApiResponse({
    status: 200,
    description: '全カートアイテムカスタマイズ取得',
  })
  @ApiResponse({
    status: 404,
    description: 'カートアイテムカスタマイズが見つかりません',
  })
  async findAll(
    @Query('cartItemId') cartItemId?: string,
  ): Promise<CartItemCustomization[]> {
    try {
      return await this.cartItemCustomizationsService.findAll(
        cartItemId ? +cartItemId : null,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'IDからカートアイテムカスタマイズ取得',
  })
  @ApiResponse({
    status: 200,
    description: 'IDからカートアイテムカスタマイズ取得',
  })
  @ApiResponse({
    status: 404,
    description: 'カートアイテムカスタマイズが見つかりません',
  })
  async findOne(@Param('id') id: string): Promise<CartItemCustomization> {
    try {
      return await this.cartItemCustomizationsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({
    summary: 'カートアイテムカスタマイズ作成',
  })
  @ApiResponse({
    status: 201,
    description: 'カートアイテムカスタマイズ作成',
  })
  @ApiResponse({
    status: 400,
    description: 'リクエストデータが不正です',
  })
  @ApiBody({ type: CreateCartItemCustomizationDto })
  async create(
    @Body() createCartItemCustomizationDto: CreateCartItemCustomizationDto,
  ): Promise<CartItemCustomization> {
    try {
      return await this.cartItemCustomizationsService.create(
        createCartItemCustomizationDto,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'IDからカートアイテムカスタマイズ削除',
  })
  @ApiResponse({
    status: 200,
    description: 'カートアイテムカスタマイズ削除',
  })
  @ApiResponse({
    status: 404,
    description: 'カートアイテムカスタマイズが見つかりません',
  })
  async remove(@Param('id') id: string): Promise<string> {
    try {
      return await this.cartItemCustomizationsService.delete(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
