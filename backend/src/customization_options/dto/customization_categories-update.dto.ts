import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomizationOptionDto {
  @ApiProperty({
    example: 1,
    description: 'カスタマイズカテゴリーID',
  })
  customization_category_id: number;

  @ApiProperty({
    example: 'ホワイト',
    description: 'カスタマイズオプションの名前',
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: '画像のURL',
  })
  image_url: string;

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
}
