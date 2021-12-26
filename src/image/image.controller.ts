import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entity/image.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateImage } from './entity/update-image.entity';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private ImageService: ImageService) {}

  // Get all images and get images by filter
  @ApiOkResponse({
    type: Image,
    isArray: true,
    description: 'To get all Images',
  })
  @ApiQuery({ name: 'tags', required: false })
  @ApiQuery({ name: 'p1', required: false })
  @ApiQuery({ name: 'p2', required: false })
  @Get()
  getImages(
    @Query('tags') tags?: string,
    @Query('p1') start_price?: number,
    @Query('p2') end_price?: number,
  ): Image[] {
    return this.ImageService.findALl(tags, start_price, end_price);
  }

  // Get an image by id
  @ApiOkResponse({ type: Image, description: 'Find an Image by id' })
  @ApiNotFoundResponse()
  @Get(':id')
  getImageById(@Param('id') id: string): Image {
    // TODO: Auto parse id

    const image = this.ImageService.findById(id);
    if (!image) {
      throw new NotFoundException();
    }
    return image;
  }

  // Upload/Add a new image
  @ApiOkResponse({ type: Image, description: 'Adds a new Image' })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: Image })
  @Post()
  addNewImage(@Body() body: CreateImageDto): Image {
    return this.ImageService.addImage(body);
  }

  // Update an existing image
  @ApiOkResponse({ type: Image, description: 'Updates an existing Image' })
  @ApiCreatedResponse({ type: Image })
  @ApiParam({ name: 'id' })
  @ApiBadRequestResponse()
  @Patch(':id')
  updateExistingImage(@Param('id') id: string, @Body() body: UpdateImage) {
    this.ImageService.updateImage(id, body);
    return this.ImageService.findById(id);
  }

  // Delete an existing image
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiResponse({
    status: 200,
    description: 'Deletes an existing Image',
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteExistingImage(@Param('id') id: string) {
    this.ImageService.deleteImage(id);
    return {
      message: 'Deleted successfully',
      Images: this.ImageService.findALl(),
    };
  }
}
