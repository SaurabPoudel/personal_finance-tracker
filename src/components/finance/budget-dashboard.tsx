"use client";
import { useFinanceStore } from "@/store/finance-store";
import { BudgetForm } from "./budget-form";
import { BudgetOverview } from "./budget-overview";
import { BudgetList } from "./budget-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BudgetDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Budget Management</h2>
        <BudgetForm />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <BudgetOverview />
        </TabsContent>

        <TabsContent value="budgets">
          <BudgetList />
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid gap-4 md:grid-cols-2">
            {/* We'll add spending trends and budget vs actual charts here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
