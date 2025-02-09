import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
  @ApiProperty({
    example: 'sandwich',
    description: 'カテゴリーの名前',
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: '表示順',
  })
  display_order: number;
}
