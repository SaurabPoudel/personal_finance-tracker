"use client";
import { useFinanceStore } from "@/store/finance-store";
import { Progress } from "@/components/ui/progress";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export function BudgetProgress() {
  const { budgets, transactions, categories } = useFinanceStore();
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  if (budgets.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No budgets set. Create a budget to track your spending!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const category = categories.find((c) => c.id === budget.categoryId);
        const spent = transactions
          .filter(
            (t) =>
              t.categoryId === budget.categoryId &&
              t.type === "expense" &&
              isWithinInterval(new Date(t.date), {
                start: monthStart,
                end: monthEnd,
              })
          )
          .reduce((sum, t) => sum + t.amount, 0);

        const progress = (spent / budget.amount) * 100;

        return (
          <div key={budget.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: category?.color }}
                />
                <span>{category?.name}</span>
              </div>
              <span>
                ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
              </span>
            </div>
            <Progress
              value={progress}
              className={progress > 100 ? "bg-red-200 dark:bg-red-900" : ""}
            />
            <p
              className={`text-xs ${
                progress > 100 ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              {progress > 100
                ? `${(progress - 100).toFixed(1)}% over budget`
                : `${(100 - progress).toFixed(1)}% remaining`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
