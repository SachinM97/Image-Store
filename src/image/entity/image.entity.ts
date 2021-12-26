import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  id: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  credits: string;

  @ApiProperty()
  upload_date: string;

  @ApiProperty()
  quality: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  downloads: number;

  @ApiProperty()
  location: string;
}
