import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';
import { Users } from '../../users/users.entity';

export class CreateCartDto {
  @ApiProperty({
    description: 'ユーザーID',
    example: 1,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '',
    example: '',
    type: Users,
  })
  user: Users;
}
