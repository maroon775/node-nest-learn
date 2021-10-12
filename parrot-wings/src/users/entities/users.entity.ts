import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionsEntity } from '../../transactions/entities/transactions.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @OneToMany(
    () => TransactionsEntity,
    (transactionEntity) => transactionEntity.user,
  )
  transactions: TransactionsEntity;
}
