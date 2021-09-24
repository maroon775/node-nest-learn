import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('photos')
export class PhotosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.photos)
  user: UsersEntity;
}
