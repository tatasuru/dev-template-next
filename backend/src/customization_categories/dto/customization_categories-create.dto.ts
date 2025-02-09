import { ApiProperty } from '@nestjs/swagger';

export class CustomizationCategoryCreateDto {
  @ApiProperty({
    example: 'パンの種類',
    description: 'カスタマイズカテゴリーの名前',
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: '表示順',
  })
  display_order: number;

  @ApiProperty({
    example: false,
    description: '複数選択可能かどうか',
  })
  multiple_select: boolean;

  @ApiProperty({
    example: false,
    description: '必須項目かどうか',
  })
  required: boolean;
}
