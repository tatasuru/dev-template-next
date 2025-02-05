// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RecipeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'レシピのID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'カテゴリーのID',
  })
  category_id: number;

  @ApiProperty({
    example: 'recipe name',
    description: 'レシピの名前',
  })
  name: number;

  @ApiProperty({
    example: 'description',
    description: 'レシピの説明',
  })
  description: number;

  @ApiProperty({
    example: 1000,
    description: 'ベース価格',
  })
  base_price: number;

  @ApiProperty({
    example: 700,
    description: 'カロリー',
  })
  calories: number;

  @ApiProperty({
    example: 15,
    description: '提供時間',
  })
  cooking_time: number;

  @ApiProperty({
    example: 'new',
    description: 'バッチのlabel',
  })
  badge: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: '画像のURL',
  })
  image_url: string;

  @ApiProperty({
    example: true,
    description: '売り切れかどうか',
  })
  is_sold_out: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
