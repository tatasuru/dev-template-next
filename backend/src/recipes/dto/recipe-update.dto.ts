// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RecipeUpdateDto {
  @ApiProperty({
    example: 'recipe name',
    description: 'レシピの名前',
  })
  name: string;

  @ApiProperty({ description: 'カテゴリーID' })
  category_id: number;

  @ApiProperty({
    example: 'description',
    description: 'レシピの説明',
  })
  description: string;

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
  is_sold_out: boolean;
}
