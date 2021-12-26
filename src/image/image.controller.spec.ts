import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  describe('Image Controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    // Testing @Get requests
    it('should return an object with matching id with status code 200, if present', () => {
      expect(
        controller.getImageById('02846807-d4e7-4d7a-9209-ff99f32f3b10'),
      ).toEqual({
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
      });
    });

    it('should return filtered data with status code 200', () => {
      expect(controller.getImages('Cars', 10, 20)).toEqual([
        {
          id: 'a5748443-7282-498f-89bb-119cd09dfcbd',
          imageUrl: 'Random image path',
          tags: 'Cars',
          price: 20,
          credits: 'Owner_name_2',
          upload_date:
            'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
          quality: '640 x 480',
          size: '0.5 Mb',
          downloads: 7,
          location: 'Delhi',
        },
      ]);
    });

    // Testing @Post request
    it('should create a new image and return an object containing data related to newly create image with status code 201', () => {
      expect(
        controller.addNewImage({
          imageUrl: 'A random new URL',
          tags: 'Test',
          price: 10.49,
          credits: 'Tester',
          location: 'Jest',
        }),
      ).toEqual({
        id: expect.any(String),
        imageUrl: 'A random new URL',
        tags: 'Test',
        price: 10.49,
        credits: 'Tester',
        location: 'Jest',
        upload_date: expect.any(String),
        quality: expect.any(String),
        size: expect.any(String),
        downloads: 0,
      });
    });

    // Testing @Patch request
    it('should return the updated object with status code 200', () => {
      expect(
        controller.updateExistingImage('10c5d34a-264d-4eae-8579-1957e2aa2e2e', {
          tags: 'Bikes',
          location: 'Mumbai',
        }),
      ).toEqual({
        id: '10c5d34a-264d-4eae-8579-1957e2aa2e2e',
        imageUrl: 'Random image path',
        tags: 'Bikes',
        price: 15.99,
        credits: 'Owner_name_7',
        upload_date: 'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
        quality: '2580 x 1944',
        size: '2.5 Mb',
        downloads: 54023,
        location: 'Mumbai',
      });
    });

    // Testing @Delete request
    it('should delete data related to the id passed, and return the remaining data with status code 200', () => {
      expect(
        controller.deleteExistingImage('df9d0c07-7110-4f64-9326-0b74b4921834'),
      ).toEqual({
        message: 'Deleted successfully',
        Images: [
          {
            id: '02846807-d4e7-4d7a-9209-ff99f32f3b10',
            imageUrl: 'Random image path',
            tags: 'Christmas',
            price: 10.99,
            credits: 'Owner_name_1',
            upload_date:
              'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
            quality: '1392 x 1024',
            size: '1.0 Mb',
            downloads: 1223,
            location: 'Himachal',
          },
          {
            id: '10c5d34a-264d-4eae-8579-1957e2aa2e2e',
            imageUrl: 'Random image path',
            tags: 'Christmas',
            price: 15.99,
            credits: 'Owner_name_7',
            upload_date:
              'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
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
            upload_date:
              'Sun Dec 26 2021 12:34:25 GMT+0530 (India Standard Time)',
            quality: '640 x 480',
            size: '0.5 Mb',
            downloads: 7,
            location: 'Delhi',
          },
        ],
      });
    });
  });
});
