export interface Transaction {
  id: number;
  amount: number;
  balance: number;
  userId: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
  parentTransaction?: Transaction;
}
