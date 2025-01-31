// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from '../user-gender.enum';

export class ItemResponseDto {
  @ApiProperty({
    example: '1',
    description: 'ユーザーID',
  })
  id: string;

  @ApiProperty({
    example: 'user name',
    description: 'ユーザーの名前',
  })
  name: string;

  @ApiProperty({
    enum: UserGender,
    example: UserGender.MALE,
    description: 'ユーザーの性別',
  })
  gender: UserGender;

  @ApiProperty({
    example: 'user phone number',
    description: 'ユーザーの電話番号',
  })
  phone_number: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
