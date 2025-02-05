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
import { Recipe } from './recipes.model';
import { RecipesService } from './recipes.service';
import { RecipeCreateDto } from './dto/recipe-create.dto';
import { RecipeUpdateDto } from './dto/recipe-update.dto';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: '全レシピ取得' })
  @ApiResponse({
    status: 200,
    description: '全レシピ取得',
    type: RecipeResponseDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'category_id',
    required: false,
    type: Number,
    description: 'カテゴリーIDでフィルター',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: '取得する件数を制限（指定がない場合は全件取得）',
  })
  async findAll(
    @Query('size') size?: number,
    @Query('category_id') category_id?: number,
  ): Promise<Recipe[]> {
    try {
      return await this.recipesService.findAll(size, category_id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '指定されたIDのレシピを取得' })
  @ApiResponse({
    status: 200,
    description: 'レシピ取得成功',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'レシピが見つかりません',
  })
  async findOne(@Param('id') id: number): Promise<Recipe> {
    try {
      return await this.recipesService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'レシピ更新' })
  @ApiResponse({
    status: 200,
    description: 'レシピが正常に更新されました',
    type: RecipeResponseDto,
  })
  @ApiBody({ type: RecipeUpdateDto })
  async update(
    @Param('id') id: number,
    @Body() updateRecipeDto: RecipeUpdateDto,
  ): Promise<Recipe> {
    try {
      return await this.recipesService.update(id, updateRecipeDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'レシピ登録' })
  @ApiResponse({
    status: 201,
    description: 'レシピが正常に登録されました',
    type: RecipeResponseDto,
  })
  @ApiBody({ type: RecipeCreateDto })
  async create(@Body() createRecipeDto: RecipeCreateDto): Promise<Recipe> {
    try {
      return await this.recipesService.create(createRecipeDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'レシピ削除' })
  @ApiResponse({
    status: 200,
    description: 'カテゴリーが正常に削除されました',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Recipe has been successfully deleted',
        },
      },
    },
  })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.recipesService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
