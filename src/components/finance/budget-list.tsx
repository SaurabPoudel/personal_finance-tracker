"use client";
import { useState } from "react";
import { useFinanceStore } from "@/store/finance-store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Search, Trash2 } from "lucide-react";
import { format } from "date-fns";

export function BudgetList() {
  const { budgets, categories, deleteBudget } = useFinanceStore();
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredBudgets = budgets.filter((budget) => {
    const category = categories.find((c) => c.id === budget.categoryId);
    const matchesSearch =
      category?.name.toLowerCase().includes(search.toLowerCase()) || false;
    const matchesPeriod =
      periodFilter === "all" ? true : budget.period === periodFilter;
    const matchesCategory =
      categoryFilter === "all" ? true : budget.categoryId === categoryFilter;

    return matchesSearch && matchesPeriod && matchesCategory;
  });

  const totalBudget = filteredBudgets.reduce(
    (sum, budget) => sum + budget.amount,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-4 w-4 opacity-50" />
          <Input
            placeholder="Search budgets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <Select value={periodFilter} onValueChange={setPeriodFilter}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Filter by period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Periods</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories
              .filter((category) => category.type === "expense")
              .map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBudgets.map((budget) => {
              const category = categories.find(
                (c) => c.id === budget.categoryId
              );
              const isActive =
                new Date(budget.startDate) <= new Date() &&
                (!budget.endDate || new Date(budget.endDate) >= new Date());

              return (
                <TableRow key={budget.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category?.color }}
                      />
                      {category?.name}
                    </div>
                  </TableCell>
                  <TableCell>${budget.amount.toFixed(2)}</TableCell>
                  <TableCell className="capitalize">{budget.period}</TableCell>
                  <TableCell>
                    {format(new Date(budget.startDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
                        onClick={() => deleteBudget(budget.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredBudgets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No budgets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <div className="rounded-lg bg-muted px-4 py-2">
          <span className="text-sm font-medium">Total Budget: </span>
          <span className="text-sm font-bold">${totalBudget.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
