import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('CustomizationOptions')
export class CustomizationOptions {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'customization_category_id', type: 'int', nullable: false })
  readonly customization_category_id: number;

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
