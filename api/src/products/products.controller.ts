import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { creatProductDto } from './dto/creatProduct.dto';
import HttpExceptionFilter from '../common/filters/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id) {
    const product = this.productsService.findByPrimaryKey(id);
    if (product) {
      return product;
    }

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Post()
  createProduct(@Body() productData: creatProductDto) {
    this.productsService.create(productData);
    return {
      success: true,
    };
  }

  @Post('/batch')
  createBatchProducts(@Body() products: [creatProductDto]) {
    this.productsService.batchCreate(products);
    return {
      count: this.productsService.findAll().length,
      success: true,
    };
  }

  // @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  removeProduct(@Param('id') id) {
    const product = this.productsService.findByPrimaryKey(id);
    if (product) {
      this.productsService.remove(id);
      return {
        success: true,
      };
    }

    throw new NotFoundException();
  }
}
