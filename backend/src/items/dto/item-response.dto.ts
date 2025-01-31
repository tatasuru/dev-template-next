// dto/item-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from '../item-status.enum';

export class ItemResponseDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'アイテムのUUID',
  })
  id: string;

  @ApiProperty({
    example: 'タスクの内容',
    description: 'タスクの内容',
  })
  body: string;

  @ApiProperty({
    enum: ItemStatus,
    example: ItemStatus.IN_PROGRESS,
    description: 'タスクの状態',
  })
  status: ItemStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
