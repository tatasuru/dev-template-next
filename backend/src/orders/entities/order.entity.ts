import { User } from '../../users/users.model';
import { Users } from '../../users/users.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../order-status.enum';
import { PaymentMethod } from '../order-payment-method.enum';
import { OrderCustomizations } from '../../order_customizations/entities/order_customization.entity';
import { OrderCustomization } from '../../order_customizations/order_customizations.model';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({
    comment: 'オーダーID',
  })
  readonly id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    persistence: false,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User['id'];

  // TODO: paymenIdとcouponIdを定義する
  // payment_id: number;
  // coupon_id: number;

  @OneToMany(
    () => OrderCustomizations,
    (orderCustomization) => orderCustomization.order,
  )
  order_customizations: OrderCustomization[];

  @Index()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PREPARING,
    comment: 'ステータス',
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    comment: '支払い方法',
  })
  payment_method: PaymentMethod;

  @Column({
    type: 'integer',
    comment: '合計金額',
  })
  total_amount: number;

  @Column({
    type: 'integer',
    comment: '割引金額',
    default: 0,
  })
  discount_amount: number;

  @Column({
    type: 'integer',
    comment: '最終金額',
  })
  final_amount: number;

  @Column({
    type: 'text',
    comment: '支払い詳細',
  })
  payment_details: string;

  @Index()
  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  readonly created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  readonly updated_at: Date;
}
