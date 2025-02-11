import { OrderStatus } from '../order-status.enum';
import { PaymentMethod } from '../order-payment-method.enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCreateDto {
  @ApiProperty({
    example: 12345,
    description: 'ユーザーID',
  })
  user_id: number;

  @ApiProperty({
    example: OrderStatus.COMPLETED,
    description: 'ステータス',
  })
  status: OrderStatus;

  @ApiProperty({
    example: PaymentMethod.CREDIT_CARD,
    description: '支払い方法',
  })
  payment_method: PaymentMethod;

  @ApiProperty({
    example: 1000,
    description: '合計金額',
  })
  total_amount: number;

  @ApiProperty({
    example: 100,
    description: '割引金額',
  })
  discount_amount: number;

  @ApiProperty({
    example: 900,
    description: '最終金額',
  })
  final_amount: number;

  @ApiProperty({
    example: 'payment details',
    description: '支払い詳細',
  })
  payment_details: string;
}
