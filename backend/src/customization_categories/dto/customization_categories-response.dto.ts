// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CustomizationCategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'カスタマイズカテゴリーID',
  })
  id: number;

  @ApiProperty({
    example: 'recipe name',
    description: 'カスタマイズカテゴリー名',
  })
  name: number;

  @ApiProperty({
    example: 1,
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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
