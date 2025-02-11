import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { CustomizationOptions } from '../../customization_options/customization_options.entity';

@Entity('order_customizations')
export class OrderCustomizations {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'order_id', type: 'int', nullable: false })
  order_id: number;

  @Column({ name: 'customization_option_id', type: 'int', nullable: false })
  customization_option_id: number;

  @ManyToOne(() => Order, (order) => order.order_customizations)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(
    () => CustomizationOptions,
    (option) => option.order_customizations,
  )
  @JoinColumn({ name: 'customization_option_id' })
  customization_option: CustomizationOptions;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
