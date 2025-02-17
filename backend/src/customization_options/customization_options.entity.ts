import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { CustomizationCategories } from '../customization_categories/customization_categories.entity';
import { OrderCustomizations } from '../order_customizations/entities/order_customization.entity';

@Entity('customization_options')
export class CustomizationOptions {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'customization_category_id', type: 'int', nullable: false })
  readonly customization_category_id: number;

  @OneToMany(
    () => OrderCustomizations,
    (orderCustomization) => orderCustomization.customization_option,
  )
  order_customizations: OrderCustomizations[];

  @ManyToOne(
    () => CustomizationCategories,
    (customizationCategory) => customizationCategory.options,
  )
  @JoinColumn({ name: 'customization_category_id' })
  customization_category: CustomizationCategories;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ name: 'additional_price', type: 'int', nullable: false })
  additional_price: number;

  @Index()
  @Column({ name: 'display_order', type: 'int', nullable: false })
  display_order: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
