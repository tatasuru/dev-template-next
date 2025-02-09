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
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CategoryResponseDto } from './dto/categories-response.dto';
import { CategoryCreateDto } from './dto/categories-create.dto';
import { CategoryDeleteDto } from './dto/categories-delete.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: '全カテゴリー取得' })
  @ApiResponse({
    status: 200,
    description: '全カテゴリー取得',
    type: CategoryResponseDto,
    isArray: true,
  })
  async findAll(): Promise<Category[]> {
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
    type: CategoryResponseDto,
  })
  @ApiBody({ type: CategoryCreateDto })
  async create(
    @Body() categoryCreateDto: CategoryCreateDto,
  ): Promise<Category> {
    try {
      return await this.categoriesService.create(categoryCreateDto);
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
