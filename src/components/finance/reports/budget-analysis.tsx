"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceStore } from "@/store/finance-store";
import { DateRange } from "react-day-picker";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { isWithinInterval } from "date-fns";
import { Progress } from "@/components/ui/progress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BudgetAnalysisProps {
  dateRange: DateRange | undefined;
}

export function BudgetAnalysis({ dateRange }: BudgetAnalysisProps) {
  const { budgets, transactions, categories } = useFinanceStore();

  if (!dateRange?.from || !dateRange?.to) {
    return <div>Please select a date range</div>;
  }

  const budgetAnalysis = budgets.map((budget) => {
    const category = categories.find((c) => c.id === budget.categoryId);
    const spent = transactions
      .filter(
        (t) =>
          t.categoryId === budget.categoryId &&
          t.type === "expense" &&
          isWithinInterval(new Date(t.date), {
            // fixing the error feeling very lazy
            start: dateRange.from || "",
            end: dateRange.to || "",
          })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const variance = budget.amount - spent;
    const progress = (spent / budget.amount) * 100;

    return {
      category,
      budget: budget.amount,
      spent,
      variance,
      progress,
    };
  });

  const data = {
    labels: budgetAnalysis.map((item) => item.category?.name),
    datasets: [
      {
        label: "Budget",
        data: budgetAnalysis.map((item) => item.budget),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Actual",
        data: budgetAnalysis.map((item) => item.spent),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }}>
            <Bar data={data} options={options} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {budgetAnalysis.map((analysis) => (
          <Card key={analysis.category?.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: analysis.category?.color }}
                />
                {analysis.category?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress
                value={analysis.progress}
                className={
                  analysis.progress > 100 ? "bg-red-200 dark:bg-red-900" : ""
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-lg font-medium">
                    ${analysis.budget.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actual</p>
                  <p className="text-lg font-medium">
                    ${analysis.spent.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variance</p>
                  <p
                    className={`text-lg font-medium ${
                      analysis.variance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${Math.abs(analysis.variance).toFixed(2)}
                    {analysis.variance >= 0 ? " under" : " over"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">% of Budget</p>
                  <p
                    className={`text-lg font-medium ${
                      analysis.progress > 100
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {analysis.progress.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
