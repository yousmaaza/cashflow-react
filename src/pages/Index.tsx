import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import ExpensesByCategoryChart from "@/components/dashboard/ExpensesByCategoryChart";
import ExpensesByPaymentTypeChart from "@/components/dashboard/ExpensesByPaymentTypeChart";
import ExpensesOverTimeChart from "@/components/dashboard/ExpensesOverTimeChart";
import { mockTransactions } from "@/data/mockTransactions";

const Index = () => {
  const totalBalance = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const monthlyIncome = mockTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = Math.abs(mockTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Solde actuel"
            value={`${totalBalance.toFixed(2)} €`}
            icon={<Wallet className="h-6 w-6" />}
          />
          <KPICard
            title="Revenus du mois"
            value={`${monthlyIncome.toFixed(2)} €`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="Dépenses du mois"
            value={`${monthlyExpenses.toFixed(2)} €`}
            icon={<TrendingDown className="h-6 w-6" />}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpensesByCategoryChart transactions={mockTransactions} />
          <ExpensesByPaymentTypeChart transactions={mockTransactions} />
        </div>

        <div className="w-full">
          <ExpensesOverTimeChart transactions={mockTransactions} />
        </div>
      </main>
    </div>
  );
};

export default Index;