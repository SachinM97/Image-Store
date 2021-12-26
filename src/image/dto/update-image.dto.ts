import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsAlphanumeric, IsPositive } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty({ required: false })
  @IsAlphanumeric()
  tags?: string;

  @ApiProperty({ required: false })
  @IsPositive()
  price?: number;

  @ApiProperty({ required: false })
  @IsAlphanumeric()
  credits?: string;

  @ApiProperty({ required: false })
  @IsAlpha()
  location?: string;
}
