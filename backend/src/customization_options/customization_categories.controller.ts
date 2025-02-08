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
import { CustomizationCategory } from './customization_options.model';
import { CustomizationCategoriesService } from './customization_options.service';
import { CustomizationCategoryResponseDto } from './dto/customization_categories-response.dto';
import { CustomizationCategoryCreateDto } from './dto/customization_categories-create.dto';
import { CustomizationCategoryDeleteDto } from './dto/customization_categories-delete.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CustomizationCategoriesController {
  constructor(
    private readonly categoriesService: CustomizationCategoriesService,
  ) {}

  @Get()
  @ApiOperation({ summary: '全カテゴリー取得' })
  @ApiResponse({
    status: 200,
    description: '全カテゴリー取得',
    type: CustomizationCategoryResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CustomizationCategory[]> {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'カテゴリー登録' })
  @ApiResponse({
    status: 201,
    description: 'カテゴリーが正常に登録されました',
    type: CustomizationCategoryResponseDto,
  })
  @ApiBody({ type: CustomizationCategoryCreateDto })
  async create(
    @Body() categoryCreateDto: CustomizationCategoryCreateDto,
  ): Promise<CustomizationCategory> {
    try {
      return await this.categoriesService.create(categoryCreateDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'カテゴリー更新' })
  @ApiResponse({
    status: 200,
    description: 'カテゴリーが正常に更新されました',
    type: CustomizationCategoryResponseDto,
  })
  @ApiBody({ type: CustomizationCategoryCreateDto })
  async update(
    @Param('id') id: number,
    @Body() categoryCreateDto: CustomizationCategoryCreateDto,
  ): Promise<CustomizationCategory> {
    try {
      return await this.categoriesService.update(id, categoryCreateDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'カテゴリー削除' })
  @ApiResponse({
    status: 200,
    description: 'カテゴリーが正常に削除されました',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Category has been successfully deleted',
        },
      },
    },
  })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.categoriesService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
