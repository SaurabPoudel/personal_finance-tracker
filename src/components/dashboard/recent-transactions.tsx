export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: -120.5,
      date: "2024-03-15",
      category: "Food",
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 4395.0,
      date: "2024-03-01",
      category: "Income",
    },
    {
      id: 3,
      description: "Netflix Subscription",
      amount: -15.99,
      date: "2024-03-14",
      category: "Entertainment",
    },
    {
      id: 4,
      description: "Electric Bill",
      amount: -85.0,
      date: "2024-03-10",
      category: "Utilities",
    },
    {
      id: 5,
      description: "Restaurant",
      amount: -45.8,
      date: "2024-03-13",
      category: "Food",
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.category}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`text-sm font-medium ${
                transaction.amount > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}$
              {Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
