import { ApiProperty } from '@nestjs/swagger';

export class CustomizationOptionDeleteDto {
  @ApiProperty({
    example: 1,
    description: 'カスタマイズオプションID',
  })
  id: number;
}
