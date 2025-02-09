// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CustomizationOptionResponseDto {
  @ApiProperty({
    example: 1,
    description: 'カスタマイズオプションID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'カスタマイズカテゴリーID',
  })
  customization_category_id: number;

  @ApiProperty({
    example: 'ホワイト',
    description: 'カスタマイズオプション名',
  })
  name: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'icon画像URL',
  })
  image_url: number;

  @ApiProperty({
    example: 100,
    description: '追加料金',
  })
  additional_price: number;

  @ApiProperty({
    example: 1,
    description: '表示順',
  })
  display_order: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
