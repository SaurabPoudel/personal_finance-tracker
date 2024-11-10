"use client";
import { useFinanceStore } from "@/store/finance-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "./category-form";
import { Pencil, Trash2 } from "lucide-react";

export function CategoryList() {
  const { categories, deleteCategory } = useFinanceStore();

  const expenseCategories = categories.filter(
    (category) => category.type === "expense"
  );
  const incomeCategories = categories.filter(
    (category) => category.type === "income"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <CategoryForm />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>
              Categories for tracking your expenses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenseCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-2 rounded-lg border"
                style={{ borderLeftColor: category.color, borderLeftWidth: 4 }}
              >
                <div>
                  <p className="font-medium">{category.name}</p>
                  {category.budget && (
                    <p className="text-sm text-muted-foreground">
                      Budget: ${category.budget}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      // TODO: Implement edit functionality
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income Categories</CardTitle>
            <CardDescription>
              Categories for tracking your income
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomeCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-2 rounded-lg border"
                style={{ borderLeftColor: category.color, borderLeftWidth: 4 }}
              >
                <div>
                  <p className="font-medium">{category.name}</p>
                  {category.budget && (
                    <p className="text-sm text-muted-foreground">
                      Target: ${category.budget}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      // TODO: Implement edit functionality
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
