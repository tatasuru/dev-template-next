import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { RecipeCustomizationsService } from './recipe_customizations.service';
import { RecipeCustomizationResponseDto } from './dto/recipe-customization-response.dto';
import { CreateRecipeCustomizationDto } from './dto/create-recipe-customization.dto';
import { RecipeCustomization } from './recipe_customizations.model';
import { RecipeCustomizations } from './entities/recipe_customization.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('recipe_customizations')
@Controller('recipe_customizations')
export class RecipeCustomizationsController {
  constructor(
    private readonly recipeCustomizationsService: RecipeCustomizationsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '全レシピカスタマイズ取得（レシピIDで絞り込み可能）',
  })
  @ApiResponse({
    status: 200,
    description: '全レシピカスタマイズ取得',
    type: RecipeCustomizationResponseDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'recipe_id',
    required: false,
    type: Number,
    description: 'レシピIDによる絞り込み',
  })
  async findAll(
    @Query('recipe_id') recipe_id?: number,
  ): Promise<RecipeCustomizations[] | RecipeCustomizations> {
    try {
      if (recipe_id) {
        return await this.recipeCustomizationsService.findAllByRecipeId(
          recipe_id,
        );
      }
      return await this.recipeCustomizationsService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '指定されたIDのレシピカスタマイズを取得' })
  @ApiResponse({
    status: 200,
    description: 'レシピカスタマイズ取得成功',
    type: RecipeCustomizationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'レシピカスタマイズが見つかりません',
  })
  async findOne(@Param('id') id: number): Promise<RecipeCustomizations> {
    try {
      return await this.recipeCustomizationsService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'レシピカスタマイズ作成' })
  @ApiResponse({
    status: 201,
    description: 'レシピカスタマイズ作成成功',
    type: RecipeCustomizationResponseDto,
  })
  @ApiBody({ type: RecipeCustomizationResponseDto })
  async create(
    @Body() recipeCustomization: CreateRecipeCustomizationDto,
  ): Promise<RecipeCustomizations> {
    try {
      return await this.recipeCustomizationsService.create(recipeCustomization);
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
    description: 'レシピ削除成功',
  })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.recipeCustomizationsService.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
