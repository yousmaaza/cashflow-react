import { Card } from "@/components/ui/card";
import { ShoppingBag, Coffee, Home, Car } from "lucide-react";

const transactions = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: -120.50,
    date: "2024-03-15",
    category: "Shopping",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Coffee Shop",
    amount: -4.50,
    date: "2024-03-15",
    category: "Food & Drink",
    icon: Coffee,
  },
  {
    id: 3,
    title: "Rent Payment",
    amount: -1500.00,
    date: "2024-03-14",
    category: "Housing",
    icon: Home,
  },
  {
    id: 4,
    title: "Car Insurance",
    amount: -89.99,
    date: "2024-03-14",
    category: "Transport",
    icon: Car,
  },
];

export const TransactionList = () => {
  return (
    <Card className="financial-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary-50 rounded-full">
                <transaction.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{transaction.title}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};