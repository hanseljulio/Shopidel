export interface IWalletTransaction {
  id: number;
  type: string;
  from: string;
  to: string;
  amount: string;
  created_at: string;
}
