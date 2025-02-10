import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderCustomization } from './order_customizations.model';
import { OrderCustomizationsResponseDto } from './dto/order_customizations-response.dto';
import { OrderCustomizationsService } from './order_customizations.service';
import { CreateOrderCustomizationDto } from './dto/create-order_customization.dto';
import { UpdateOrderCustomizationDto } from './dto/update-order_customization.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('order_customizations')
@Controller('order_customizations')
export class OrderCustomizationsController {
  constructor(
    private readonly orderCustomizationsService: OrderCustomizationsService,
  ) {}

  @Get()
  @ApiOperation({ summary: '全オーダーカスタマイズ取得' })
  @ApiResponse({
    status: 200,
    description: '全オーダーカスタマイズ取得',
    type: OrderCustomizationsResponseDto,
  })
  async findAll(): Promise<OrderCustomization[]> {
    try {
      return this.orderCustomizationsService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '指定されたIDのオーダーカスタマイズを取得' })
  @ApiResponse({
    status: 200,
    description: 'オーダーカスタマイズ取得成功',
    type: OrderCustomizationsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'オーダーカスタマイズが見つかりません',
  })
  async findOne(@Param('id') id: string): Promise<OrderCustomization> {
    try {
      return this.orderCustomizationsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'オーダーカスタマイズ作成' })
  @ApiResponse({
    status: 201,
    description: 'オーダーカスタマイズ作成成功',
    type: OrderCustomizationsResponseDto,
  })
  @ApiBody({ type: CreateOrderCustomizationDto })
  async create(
    @Body() createOrderCustomizationDto: CreateOrderCustomizationDto,
  ): Promise<OrderCustomization> {
    try {
      return this.orderCustomizationsService.create(
        createOrderCustomizationDto,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'オーダーカスタマイズ更新' })
  @ApiResponse({
    status: 200,
    description: 'オーダーカスタマイズ更新成功',
    type: OrderCustomizationsResponseDto,
  })
  @ApiBody({ type: UpdateOrderCustomizationDto })
  async update(
    @Param('id') id: string,
    @Body() updateOrderCustomizationDto: UpdateOrderCustomizationDto,
  ): Promise<OrderCustomization> {
    try {
      return this.orderCustomizationsService.update(
        +id,
        updateOrderCustomizationDto,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'オーダーカスタマイズ削除' })
  @ApiResponse({
    status: 200,
    description: 'オーダーカスタマイズ削除成功',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'オーダーカスタマイズが正常に削除されました',
        },
      },
    },
  })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.orderCustomizationsService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
