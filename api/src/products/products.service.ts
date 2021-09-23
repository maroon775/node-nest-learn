import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductsEntity } from './entities/products.entity';
import { Product, UpdateProduct } from './interfaces/product';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetailEntity } from './entities/product-detail.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(ProductDetailEntity)
    private readonly productDetailRepository: Repository<ProductDetailEntity>,
  ) {}

  async _findProduct(id) {
    const product = await this.productsRepository.findOne(id, {
      relations: ['productDetail'],
    });

    if (product) {
      return product;
    }

    throw new NotFoundException('Could not find any product');
  }

  async create(createProduct: CreateProductDto): Promise<Product> {
    const productEntity = await this.productsRepository.create(createProduct);

    productEntity.productDetail = await this.productDetailRepository.save(
      createProduct.productDetail,
    );

    return await this.productsRepository.save(productEntity);
  }

  async count() {
    return this.productsRepository.query(
      'SELECT COUNT(*) count FROM nest_learn.products',
    );
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productDetail'],
    });
  }

  async findOne(id: number): Promise<Product> {
    return await this._findProduct(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    const product = await this._findProduct(id);
    return await this.productsRepository.delete(product.id);
  }

  async update(id: number, recordToUpdate: UpdateProduct): Promise<Product> {
    const product = await this._findProduct(id);
    await this.productsRepository.merge(product, recordToUpdate);

    await this.productDetailRepository.save(product.productDetail);
    return await this.productsRepository.save(product);
  }
}
