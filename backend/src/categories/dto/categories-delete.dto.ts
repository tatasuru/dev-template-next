import { ApiProperty } from '@nestjs/swagger';

export class CategoryDeleteDto {
  @ApiProperty({
    example: 1,
    description: 'カテゴリーのid',
  })
  id: number;
}
