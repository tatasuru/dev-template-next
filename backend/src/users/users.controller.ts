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
import { ItemResponseDto } from './dto/users-response.dto';
import { UserGender } from './user-gender.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'user情報取得' })
  @ApiResponse({
    status: 200,
    description: 'user情報取得',
    type: ItemResponseDto,
    isArray: true,
  })
  async findAll(): Promise<User[]> {
    return await this.UsersService.findAll();
  }
}
