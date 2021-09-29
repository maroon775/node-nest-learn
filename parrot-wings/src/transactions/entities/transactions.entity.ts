import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('transactions')
export class TransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @Column({ type: 'decimal', precision: 22, scale: 2, default: 0.0 })
  amount: number;

  @Column({ type: 'decimal', precision: 22, scale: 2, default: 0.0 })
  balance: number;

  @Column()
  description: string;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.transactions)
  @JoinColumn()
  user: UsersEntity;
}
