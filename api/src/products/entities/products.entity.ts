import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductDetailEntity } from './product-detail.entity';

@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column('int')
  quantity: number;
  @Column()
  price: number;

  @OneToOne(
    (type) => ProductDetailEntity,
    (productDetail) => productDetail.product,
  )
  productDetail: ProductDetailEntity;
}
