import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
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
import { CustomizationOptionsService } from './customization_options.service';
import { CustomizationOptions } from './customization_options.entity';
import { CreateCustomizationOptionDto } from './dto/customization_categories-create.dto';
import { UpdateCustomizationOptionDto } from './dto/customization_categories-update.dto';

@ApiTags('customization_options')
@Controller('customization_options')
export class CustomizationOptionsController {
  constructor(
    private readonly customizationOptionsService: CustomizationOptionsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'カスタマイズオプション一覧取得' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: Number,
    description: 'カテゴリーIDでフィルタリング',
  })
  @ApiResponse({
    status: 200,
    description: 'カスタマイズオプション一覧を取得しました',
    type: [CustomizationOptions],
  })
  async findAll(
    @Query('categoryId') categoryId?: string,
  ): Promise<CustomizationOptions[]> {
    try {
      return await this.customizationOptionsService.findAll(
        categoryId ? +categoryId : undefined,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'カスタマイズオプション詳細取得' })
  @ApiResponse({
    status: 200,
    description: 'カスタマイズオプションを取得しました',
    type: CustomizationOptions,
  })
  @ApiResponse({
    status: 404,
    description: 'カスタマイズオプションが見つかりません',
  })
  async findOne(@Param('id') id: string): Promise<CustomizationOptions> {
    try {
      return await this.customizationOptionsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'カスタマイズオプション作成' })
  @ApiBody({ type: CreateCustomizationOptionDto })
  @ApiResponse({
    status: 201,
    description: 'カスタマイズオプションを作成しました',
    type: CustomizationOptions,
  })
  async create(
    @Body() createDto: CreateCustomizationOptionDto,
  ): Promise<CustomizationOptions> {
    try {
      return await this.customizationOptionsService.create(createDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'カスタマイズオプション更新' })
  @ApiBody({ type: UpdateCustomizationOptionDto })
  @ApiResponse({
    status: 200,
    description: 'カスタマイズオプションを更新しました',
    type: CustomizationOptions,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCustomizationOptionDto,
  ): Promise<CustomizationOptions> {
    try {
      return await this.customizationOptionsService.update(+id, updateDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('order/:categoryId')
  @ApiOperation({ summary: 'カスタマイズオプションの表示順序更新' })
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          display_order: { type: 'number' },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '表示順序を更新しました',
    type: [CustomizationOptions],
  })
  async updateOrder(
    @Param('categoryId') categoryId: string,
    @Body() orderUpdates: { id: number; display_order: number }[],
  ): Promise<CustomizationOptions[]> {
    try {
      return await this.customizationOptionsService.updateOrder(
        +categoryId,
        orderUpdates,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'カスタマイズオプション削除' })
  @ApiResponse({
    status: 200,
    description: 'カスタマイズオプションを削除しました',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.customizationOptionsService.remove(+id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
