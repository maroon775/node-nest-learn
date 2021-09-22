import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@UseInterceptors(TransformInterceptor)
// @UseFilters(HttpExceptionFilter)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll() {
    return this.productsService.findAll();
  }

  @Get('count')
  async count() {
    return this.productsService.count();
  }

  @Get(':id')
  async findOneById(@Param('id') id) {
    return await this.productsService.findOne(id);
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<DeleteResult> {
    return this.productsService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }
}
