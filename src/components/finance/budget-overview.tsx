"use client";
import { useFinanceStore } from "@/store/finance-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export function BudgetOverview() {
  const { budgets, transactions, categories } = useFinanceStore();
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const getBudgetProgress = (budget: any) => {
    const category = categories.find((c) => c.id === budget.categoryId);
    if (!category) return { spent: 0, progress: 0, remaining: budget.amount };

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
    const remaining = budget.amount - spent;

    return { spent, progress, remaining };
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        isWithinInterval(new Date(t.date), {
          start: monthStart,
          end: monthEnd,
        })
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const totalProgress = (totalSpent / totalBudget) * 100;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overall Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Spent: ${totalSpent.toFixed(2)}</span>
              <span>Budget: ${totalBudget.toFixed(2)}</span>
            </div>
            <Progress value={totalProgress} />
            <p className="text-sm text-muted-foreground">
              {totalProgress.toFixed(1)}% of total budget used
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const category = categories.find((c) => c.id === budget.categoryId);
          const { spent, progress, remaining } = getBudgetProgress(budget);

          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  />
                  {category?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress
                  value={progress}
                  className={progress > 100 ? "bg-red-200 dark:bg-red-900" : ""}
                />
                <div className="flex justify-between text-sm">
                  <span>Spent: ${spent.toFixed(2)}</span>
                  <span>Budget: ${budget.amount.toFixed(2)}</span>
                </div>
                <p
                  className={`text-sm ${
                    progress > 100 ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {progress > 100
                    ? `${(progress - 100).toFixed(1)}% over budget`
                    : `${remaining.toFixed(2)} remaining`}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
