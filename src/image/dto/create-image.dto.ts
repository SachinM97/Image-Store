import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  @Length(1)
  imageUrl: string;

  @ApiProperty()
  @IsAlphanumeric()
  tags: string;

  @ApiProperty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsAlphanumeric()
  credits: string;

  @ApiProperty()
  @IsAlpha()
  location: string;
}
