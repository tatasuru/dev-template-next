import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from '../user-gender.enum';

export class UserCreateDto {
  @ApiProperty({
    example: 'user name',
    description: 'ユーザーの名前',
  })
  name: string;

  @ApiProperty({
    example: '000-0000-0000',
    description: 'ユーザーの電話番号',
  })
  phone_number: string;

  @ApiProperty({
    enum: UserGender,
    example: UserGender.MALE,
    description: 'ユーザーの性別',
  })
  gender: UserGender;

  @ApiProperty({
    example: '1990-01-01',
    description: 'ユーザーの生年月日',
  })
  birth_date: string;
}
