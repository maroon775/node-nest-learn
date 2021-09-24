import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhotosEntity } from '../../photos/entities/photos.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PhotosEntity, (photosEntity) => photosEntity.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  photos: PhotosEntity[];
}
