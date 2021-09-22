import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import { ProductDetailEntity } from './entities/product-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, ProductDetailEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
