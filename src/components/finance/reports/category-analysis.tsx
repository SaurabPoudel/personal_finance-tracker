"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceStore } from "@/store/finance-store";
import { DateRange } from "react-day-picker";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { isWithinInterval } from "date-fns";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryAnalysisProps {
  dateRange: DateRange | undefined;
}

export function CategoryAnalysis({ dateRange }: CategoryAnalysisProps) {
  const { transactions, categories } = useFinanceStore();

  if (!dateRange?.from || !dateRange?.to) {
    return <div>Please select a date range</div>;
  }

  const filteredTransactions = transactions.filter(
    (t) =>
      t.type === "expense" &&
      isWithinInterval(new Date(t.date), {
        start: dateRange.from || "",
        end: dateRange.to || "",
      })
  );

  const categorySpending = categories
    .filter((c) => c.type === "expense")
    .map((category) => {
      const spent = filteredTransactions
        .filter((t) => t.categoryId === category.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        category,
        spent,
      };
    })
    .sort((a, b) => b.spent - a.spent);

  const data = {
    labels: categorySpending.map((item) => item.category.name),
    datasets: [
      {
        data: categorySpending.map((item) => item.spent),
        backgroundColor: categorySpending.map((item) => item.category.color),
        borderColor: categorySpending.map((item) => item.category.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const totalSpent = categorySpending.reduce(
    (sum, item) => sum + item.spent,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }} className="flex justify-center">
            <Pie data={data} options={options} />
          </div>
        </CardContent>
      </Card>

      {categorySpending.map(({ category, spent }) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Amount Spent
              </span>
              <span className="font-medium">${spent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                % of Total Spending
              </span>
              <span className="font-medium">
                {((spent / totalSpent) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
