"use client";
import { Progress } from "@/components/ui/progress";

export function BudgetProgress() {
  const categories = [
    { name: "Housing", spent: 1200, budget: 1500, progress: 80 },
    { name: "Food", spent: 400, budget: 600, progress: 66.7 },
    { name: "Transportation", spent: 300, budget: 400, progress: 75 },
    { name: "Entertainment", spent: 150, budget: 200, progress: 75 },
    { name: "Utilities", spent: 200, budget: 300, progress: 66.7 },
  ];

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{category.name}</span>
            <span>
              ${category.spent} / ${category.budget}
            </span>
          </div>
          <Progress value={category.progress} />
        </div>
      ))}
    </div>
  );
}
