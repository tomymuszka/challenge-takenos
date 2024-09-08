export interface volumeTransactions {
  day: number;
  week: number;
  month: number;
}

export interface TransactionData {
  transaction_id: string;
  date: Date;
  user_id: string;
  merchant: string;
  amount: number;
  batch_id: string;
}
