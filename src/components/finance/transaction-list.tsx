"use client";
import { useState } from "react";
import { useFinanceStore } from "@/store/finance-store";
import { TransactionForm } from "./transaction-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { Calendar, Search, Trash2 } from "lucide-react";
import { DateRange } from "react-day-picker";

export function TransactionList() {
  const { transactions, categories, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "expense" | "income">(
    "all"
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all"
          ? true
          : transaction.categoryId === categoryFilter;
      const matchesType =
        typeFilter === "all" ? true : transaction.type === typeFilter;
      const matchesDate =
        dateRange?.from && dateRange?.to
          ? new Date(transaction.date) >= dateRange.from &&
            new Date(transaction.date) <= dateRange.to
          : true;

      return matchesSearch && matchesCategory && matchesType && matchesDate;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        <TransactionForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex gap-2">
          <Search className="h-4 w-4 opacity-50" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(value: any) => setTypeFilter(value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="expense">Expenses</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 font-medium">
          <div>Date</div>
          <div>Description</div>
          <div>Category</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {filteredTransactions.map((transaction) => {
            const category = categories.find(
              (c) => c.id === transaction.categoryId
            );
            return (
              <div
                key={transaction.id}
                className="grid grid-cols-5 gap-4 p-4 items-center"
              >
                <div className="text-sm">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  {transaction.notes && (
                    <div className="text-sm text-muted-foreground">
                      {transaction.notes}
                    </div>
                  )}
                </div>
                <div>
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category?.color }}
                  />
                  {category?.name}
                </div>
                <div
                  className={`text-right font-medium ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
          {filteredTransactions.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
