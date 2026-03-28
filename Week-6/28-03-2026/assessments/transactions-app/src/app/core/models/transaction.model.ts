export interface Transaction {
  id?: number;
  date: string;        // YYYY-MM-DD
  description: string;
  type: 0 | 1;         // 0 = credit, 1 = debit
  amount: number;
  balance: string;     // e.g. "$12,234.45"
}

export interface TransactionFilter {
  date?: string;
}

export type SortField = 'amount' | null;
export type SortDirection = 'asc' | 'desc';
