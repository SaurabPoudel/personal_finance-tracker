"use client";
import { useFinanceStore } from "@/store/finance-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

export function GettingStartedGuide() {
  const { transactions, budgets } = useFinanceStore();

  const steps = [
    {
      title: "Set Up Categories",
      description: "Create categories to organize your transactions",
      link: "/categories",
      isComplete: true, // Categories are pre-populated
    },
    {
      title: "Create Your First Budget",
      description: "Set spending limits for different categories",
      link: "/budgets",
      isComplete: budgets.length > 0,
    },
    {
      title: "Add Transactions",
      description: "Start tracking your income and expenses",
      link: "/transactions",
      isComplete: transactions.length > 0,
    },
    {
      title: "View Reports",
      description: "Analyze your spending patterns",
      link: "/reports",
      isComplete: transactions.length > 0,
    },
  ];

  const allComplete = steps.every((step) => step.isComplete);

  if (allComplete) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Getting Started Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Follow these steps to get the most out of your personal finance
            tracker:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col space-y-2 rounded-lg border p-4"
              >
                <div className="flex items-center gap-2">
                  {step.isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <h3 className="font-medium">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                {!step.isComplete && (
                  <Link href={step.link} className="mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
