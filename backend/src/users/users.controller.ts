import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { UserResponseDto } from './dto/user-response.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserGender } from './user-gender.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Users } from './users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'user情報取得' })
  @ApiResponse({
    status: 200,
    description: 'user情報取得',
    type: UserResponseDto,
    isArray: true,
  })
  async findAll(): Promise<Users[]> {
    return await this.UsersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '指定されたIDのuser情報を取得' })
  @ApiResponse({
    status: 200,
    description: 'user情報取得成功',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'user情報が見つかりません',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.UsersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'user情報登録' })
  @ApiResponse({
    status: 201,
    description: 'user情報登録',
    type: UserResponseDto,
  })
  @ApiBody({ type: UserCreateDto })
  async create(
    @Body() userCreateDto: UserCreateDto,
    user: {
      name: string;
      phone_number: string;
      gender: UserGender;
      birth_date: string;
    },
  ): Promise<Users> {
    return await this.UsersService.create(userCreateDto);
  }
}
