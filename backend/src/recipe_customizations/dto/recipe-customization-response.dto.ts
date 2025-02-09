// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RecipeCustomizationResponseDto {
  @ApiProperty({
    example: 1,
    description: 'レシピカスタマイズID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'レシピID',
  })
  recipe_id: number;

  @ApiProperty({
    example: 1,
    description: 'カスタマイズカテゴリーID',
  })
  customization_category_id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
