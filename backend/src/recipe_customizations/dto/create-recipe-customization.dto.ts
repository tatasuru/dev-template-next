import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';

export class CreateRecipeCustomizationDto {
  @ApiProperty({
    description: 'レシピID',
    example: 1,
  })
  @IsNumber()
  recipe_id: number;

  @ApiProperty({
    description: 'カスタマイズカテゴリーID配列',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  customization_category_ids: number[];
}
