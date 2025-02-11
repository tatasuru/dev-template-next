// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class OrderCustomizationsResponseDto {
  @ApiProperty({
    example: 1,
    description: 'オーダーカスタマイズID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'オーダーID',
  })
  order_id: number;

  @ApiProperty({
    example: 1,
    description: 'カスタマイズオプションID',
  })
  customization_option_id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
