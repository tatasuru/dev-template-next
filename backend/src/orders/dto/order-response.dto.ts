import { ApiProperty } from '@nestjs/swagger';

export class OrderCreateResponseDto {
  @ApiProperty({
    example: 0o12,
    description: 'オーダーID',
  })
  order_id: number;

  @ApiProperty({
    example: '注文の詳細',
    description: '注文詳細',
  })
  order_details: string;
}
