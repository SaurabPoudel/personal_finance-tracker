"use client";
import { useFinanceStore } from "@/store/finance-store";
import { format } from "date-fns";

export function RecentTransactions() {
  const { transactions, categories } = useFinanceStore();

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (transactions.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No transactions yet. Add your first transaction to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => {
        const category = categories.find(
          (c) => c.id === transaction.categoryId
        );
        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.description}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: category?.color }}
                />
                <p className="text-sm text-muted-foreground">
                  {category?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-sm font-medium ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), "MMM dd")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
