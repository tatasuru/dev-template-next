import { ApiProperty } from '@nestjs/swagger';

export class CustomizationCategoryDeleteDto {
  @ApiProperty({
    example: 1,
    description: 'カスタマイズカテゴリーID',
  })
  id: number;
}
