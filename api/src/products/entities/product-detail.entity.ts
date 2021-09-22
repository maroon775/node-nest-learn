import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product-detail' })
export class ProductDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45 })
  partNumber: string;

  @Column({ length: 45 })
  dimension: string;

  @Column('float')
  weight: number;

  @Column({ length: 45 })
  manufacturer: string;
  @Column({ length: 45 })
  origin: string;
}
