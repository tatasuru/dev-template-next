import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
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
  async findAll(): Promise<User[]> {
    return await this.UsersService.findAll();
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
  ): Promise<User> {
    return await this.UsersService.create(userCreateDto);
  }
}
