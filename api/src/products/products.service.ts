import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductsEntity } from './entities/products.entity';
import { Product } from './interfaces/product';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async _findProduct(id) {
    const product = await this.productsRepository.findOne(id);

    if (product) {
      return product;
    }

    throw new NotFoundException('Could not find any product');
  }

  async create(product: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(product);
  }

  async count() {
    return this.productsRepository.query(
      'SELECT COUNT(*) count FROM nest_learn.products',
    );
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this._findProduct(id);
    return this.productsRepository.findOne(product.id);
  }

  async delete(id: number): Promise<DeleteResult> {
    const product = await this._findProduct(id);
    return await this.productsRepository.delete(product.id);
  }

  async update(id: number, recordToUpdate: UpdateProductDto): Promise<Product> {
    const product = await this._findProduct(id);
    const productData = await this.productsRepository.merge(
      product,
      recordToUpdate,
    );
    return await this.productsRepository.save(productData);
  }

  /*
    
            
            
              create(product) {
                this.products.push({
                  id: this.products.length + 1,
                  ...product,
                });
              }
            
              batchCreate(products) {
                this.products = this.products.concat(products);
              }
            
             
          
              private _findIndexById(id) {
                return this.products.findIndex((product) => product.id == id);
              }
            */
}
