import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('CustomizationCategories')
export class CustomizationCategories {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Index()
  @Column({ name: 'display_order', type: 'int', nullable: false })
  display_order: number;

  @Column({
    name: 'multiple_select',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  multiple_select: boolean;

  @Column({
    name: 'required',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  required: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
