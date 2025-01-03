import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private sql: any;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    // const databaseUrl = this.configService.get('DATABASE_URL');
    // this.sql = neon(databaseUrl);
  }
  async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
    const product = new Product();
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.discountPercentage = createProductDto.discountPercentage;
    product.stock = createProductDto.stock;
    product.category = createProductDto.category;
    product.brand = createProductDto.brand;
    product.status = createProductDto.status;

    console.log('image', image);

    if (image) {
      try {
        const fileName = await this.cloudinaryService.uploadFile(
          'product',
          image,
        );
        product.image = fileName as string;
      } catch (error) {
        console.log('error', error);

        throw new InternalServerErrorException('Failed to save image');
      }
    }

    return await this.productRepository.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
