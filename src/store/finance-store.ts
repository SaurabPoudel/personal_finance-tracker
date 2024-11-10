import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Category, Transaction, Budget, FinanceStore } from "@/types/finance";

interface FinanceState extends FinanceStore {
  // Category actions
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Transaction actions
  addTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // Budget actions
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
}

const defaultCategories: Category[] = [
  { id: "housing", name: "Housing", type: "expense", color: "#FF5733" },
  { id: "food", name: "Food & Dining", type: "expense", color: "#33FF57" },
  {
    id: "transportation",
    name: "Transportation",
    type: "expense",
    color: "#3357FF",
  },
  { id: "utilities", name: "Utilities", type: "expense", color: "#FF33F6" },
  {
    id: "entertainment",
    name: "Entertainment",
    type: "expense",
    color: "#33FFF6",
  },
  { id: "salary", name: "Salary", type: "income", color: "#5733FF" },
  { id: "investment", name: "Investment", type: "income", color: "#F6FF33" },
];

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      categories: defaultCategories,
      transactions: [],
      budgets: [],

      // Category actions
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: uuidv4() }],
        })),

      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      // Transaction actions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateTransaction: (id, transaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...transaction, updatedAt: new Date().toISOString() }
              : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // Budget actions
      addBudget: (budget) =>
        set((state) => ({
          budgets: [...state.budgets, { ...budget, id: uuidv4() }],
        })),

      updateBudget: (id, budget) =>
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...budget } : b
          ),
        })),

      deleteBudget: (id) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        })),
    }),
    {
      name: "finance-store",
    }
  )
);
