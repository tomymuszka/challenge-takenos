export interface AnalysisData {
  volumeTransactionsDay: number;
  volumeTransactionsWeek: number;
  volumeTransactionsMonth: number;
  topTenMerchants: string[];
  detectedFraudulentIds: string[];
  batch_id: string;
}
