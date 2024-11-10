export type CategoryType = "expense" | "income";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
  icon?: string;
  budget?: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: CategoryType;
  recurring?: boolean;
  recurringFrequency?: "weekly" | "monthly" | "yearly";
  notes?: string;
  attachments?: string[]; // URLs to attached files
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
  rollover?: boolean;
}

export interface FinanceStore {
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
}
