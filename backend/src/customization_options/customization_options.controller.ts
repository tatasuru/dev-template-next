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
import { CustomizationOption } from './customization_options.model';
import { CustomizationOptionsService } from './customization_options.service';
import { CustomizationOptionResponseDto } from './dto/customization_options-response.dto';
import { CustomizationOptionCreateDto } from './dto/customization_categories-create.dto';
import { CustomizationOptionDeleteDto } from './dto/customization_options-delete.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('customization_options')
@Controller('customization_options')
export class CustomizationOptionsController {
  constructor(
    private readonly categoriesService: CustomizationOptionsService,
  ) {}

  @Get()
  @ApiOperation({ summary: '全カテゴリー取得' })
  @ApiResponse({
    status: 200,
    description: '全カテゴリー取得',
    type: CustomizationOptionResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CustomizationOption[]> {
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
    type: CustomizationOptionResponseDto,
  })
  @ApiBody({ type: CustomizationOptionCreateDto })
  async create(
    @Body() categoryCreateDto: CustomizationOptionCreateDto,
  ): Promise<CustomizationOption> {
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
    type: CustomizationOptionResponseDto,
  })
  @ApiBody({ type: CustomizationOptionCreateDto })
  async update(
    @Param('id') id: number,
    @Body() customizationOptionCreateDto: CustomizationOptionCreateDto,
  ): Promise<CustomizationOption> {
    try {
      return await this.categoriesService.update(
        id,
        customizationOptionCreateDto as CustomizationOption,
      );
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
