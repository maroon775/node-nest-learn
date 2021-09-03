export type DatabaseId = number;

export interface TransactionDto {
  user_id: DatabaseId;
  amount: number;
  message?: string;
  timestamp: number;
  ref_transaction?: DatabaseId;
}
