import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
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

  @OneToOne((type) => ProductDetailEntity)
  @JoinColumn()
  productDetails: ProductDetailEntity;
}
