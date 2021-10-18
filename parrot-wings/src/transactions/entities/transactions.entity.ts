import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('transactions')
export class TransactionsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 22, scale: 2, default: 0.0 })
  amount: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 22, scale: 2, default: 0.0 })
  balance: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column()
  userId: number;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.transactions)
  user: UsersEntity;

  @OneToOne(() => TransactionsEntity)
  @JoinColumn()
  parentTransaction: TransactionsEntity;
}
