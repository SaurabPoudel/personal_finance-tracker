"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceStore } from "@/store/finance-store";
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
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  isWithinInterval,
} from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MonthlyComparison() {
  const { transactions, categories } = useFinanceStore();
  const currentDate = new Date();

  // Get last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(currentDate, i);
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
      label: format(date, "MMM yyyy"),
    };
  }).reverse();

  const monthlyData = months.map((month) => {
    const monthTransactions = transactions.filter((t) =>
      isWithinInterval(new Date(t.date), {
        start: month.start,
        end: month.end,
      })
    );

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    return {
      month: month.label,
      income,
      expenses,
      savings,
      savingsRate,
    };
  });

  const data = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map((d) => d.income),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Expenses",
        data: monthlyData.map((d) => d.expenses),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Savings",
        data: monthlyData.map((d) => d.savings),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
          <CardTitle>Monthly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }}>
            <Bar data={data} options={options} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {monthlyData.map((month) => (
          <Card key={month.month}>
            <CardHeader>
              <CardTitle>{month.month}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Income</p>
                  <p className="text-lg font-medium text-green-600">
                    ${month.income.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expenses</p>
                  <p className="text-lg font-medium text-red-600">
                    ${month.expenses.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Savings</p>
                  <p
                    className={`text-lg font-medium ${
                      month.savings >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${month.savings.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Savings Rate</p>
                  <p
                    className={`text-lg font-medium ${
                      month.savingsRate >= 20
                        ? "text-green-600"
                        : month.savingsRate >= 10
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {month.savingsRate.toFixed(1)}%
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
