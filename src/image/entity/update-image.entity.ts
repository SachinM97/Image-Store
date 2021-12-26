import { ApiProperty } from '@nestjs/swagger';

export class UpdateImage {
  @ApiProperty({ required: false })
  tags?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  credits?: string;

  @ApiProperty({ required: false })
  location?: string;
}
