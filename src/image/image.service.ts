import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entity/image.entity';
import { uuid } from 'uuidv4';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  private imageResolution = [
    ['640 x 480', '0.5 Mb'],
    ['1392 x 1024', '1.0 Mb'],
    ['1600 x 1200', '1.5 Mb'],
    ['2080 x 1542', '2.0 Mb'],
    ['2580 x 1944', '2.5 Mb'],
    ['2816 x 2112', '3.0 Mb'],
    ['3264 x 2448', '3.5 Mb'],
    ['4080 x 3072', '4.0 Mb'],
    ['6464 x 4864', '4.5 Mb'],
  ];
  private getImageIndex = this.getRandomNumber(this.imageResolution.length);
  private images: Image[] = [
    {
      id: '02846807-d4e7-4d7a-9209-ff99f32f3b10',
      imageUrl: 'Random image path',
      tags: 'Christmas',
      price: 10.99,
      credits: 'Owner_name_1',
      upload_date: 'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
      quality: '1392 x 1024',
      size: '1.0 Mb',
      downloads: 1223,
      location: 'Himachal',
    },
    {
      id: 'df9d0c07-7110-4f64-9326-0b74b4921834',
      imageUrl: 'Random image path',
      tags: 'Nature',
      price: 7.99,
      credits: 'Owner_name_2',
      upload_date: 'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
      quality: '4080 x 3072',
      size: '4.0 Mb',
      downloads: 533,
      location: 'Karnataka',
    },
    {
      id: '10c5d34a-264d-4eae-8579-1957e2aa2e2e',
      imageUrl: 'Random image path',
      tags: 'Christmas',
      price: 15.99,
      credits: 'Owner_name_7',
      upload_date: 'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
      quality: '2580 x 1944',
      size: '2.5 Mb',
      downloads: 54023,
      location: 'Rajasthan',
    },
    {
      id: 'a5748443-7282-498f-89bb-119cd09dfcbd',
      imageUrl: 'Random image path',
      tags: 'Cars',
      price: 20,
      credits: 'Owner_name_2',
      upload_date: 'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
      quality: '640 x 480',
      size: '0.5 Mb',
      downloads: 7,
      location: 'Delhi',
    },
  ];

  private getRandomNumber(size) {
    return Math.floor(Math.random() * size);
  }

  findALl(tags?: string, start_price?: number, end_price?: number): Image[] {
    // In case start_price is greater than end_price
    if (start_price && end_price)
      if (start_price > end_price) throw new BadRequestException();

    // If no params are passed
    if (!tags && !start_price && !end_price) return this.images;

    // If all three filters are applied
    if (tags && start_price && end_price) {
      if (start_price > end_price) throw new BadRequestException();

      return this.images.filter(
        (image) =>
          image.tags === tags &&
          image.price >= start_price &&
          image.price <= end_price,
      );
    }

    // Only tags filter is applied
    if (tags && !start_price && !end_price) {
      return this.images.filter((image) => image.tags === tags);
    }

    if (!start_price || !end_price) throw new BadRequestException();

    if (start_price && end_price)
      return this.images.filter(
        (image) => image.price >= start_price && image.price <= end_price,
      );
    return this.images;
  }

  findById(imageId: string): Image {
    return this.images.find((image) => image.id === imageId);
  }

  addImage(createImageDto: CreateImageDto): Image {
    if (
      !createImageDto.imageUrl ||
      !createImageDto.tags ||
      !createImageDto.price
    ) {
      throw new BadRequestException();
    }

    const newImage = {
      id: uuid(),
      ...createImageDto,
      upload_date: new Date().toString(),
      quality: this.imageResolution[this.getImageIndex][0],
      size: this.imageResolution[this.getImageIndex][1],
      downloads: 0,
    };
    this.images.push(newImage);
    return newImage;
  }

  updateImage(imageId: string, updateImageDto: UpdateImageDto) {
    if (
      !updateImageDto.tags &&
      !updateImageDto.price &&
      !updateImageDto.credits &&
      !updateImageDto.location
    ) {
      throw new BadRequestException();
    }
    const index = this.images.findIndex((image) => image.id === imageId);
    const image = this.images[index];

    if (!image) {
      throw new NotFoundException(`Could not find product with id: ${imageId}`);
    }
    const updatedImage = { ...image };
    if (updateImageDto.tags) {
      updatedImage.tags = updateImageDto.tags;
    }
    if (updateImageDto.price) {
      updatedImage.price = updateImageDto.price;
    }
    if (updateImageDto.credits) {
      updatedImage.credits = updateImageDto.credits;
    }
    if (updateImageDto.location) {
      updatedImage.location = updateImageDto.location;
    }
    this.images[index] = updatedImage;
    return null;
  }

  deleteImage(imageId: string) {
    const index = this.images.findIndex((image) => image.id === imageId);
    if (index == -1) throw new NotFoundException();
    this.images.splice(index, 1);
    return null;
  }
}
