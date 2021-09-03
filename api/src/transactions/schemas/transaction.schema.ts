import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  user_id: ObjectId;

  @Prop()
  amount: number;

  @Prop()
  message?: string;

  @Prop()
  timestamp: number;

  @Prop()
  ref_transaction?: ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
