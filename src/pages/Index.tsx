import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import ExpensesByCategoryChart from '@/components/dashboard/ExpensesByCategoryChart';
import ExpensesByPaymentTypeChart from '@/components/dashboard/ExpensesByPaymentTypeChart';
import ExpensesOverTimeChart from '@/components/dashboard/ExpensesOverTimeChart';
import { transactionService, Transaction } from '@/services/transactionService';
import { Card } from '@/components/ui/card';

interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  incomeTrend: number;
  expensesTrend: number;
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [transactions, stats] = await Promise.all([
          transactionService.getTransactions(),
          transactionService.getCurrentMonthStats()
        ]);
        setTransactions(transactions);
        setStats(stats);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-destructive/10 text-destructive">
        <p className="text-lg font-medium">{error}</p>
        <p className="text-sm mt-2">Veuillez rafraîchir la page ou réessayer plus tard.</p>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Solde actuel"
            value={`${stats.totalBalance.toFixed(2)} €`}
            icon={<Wallet className="h-6 w-6" />}
          />
          <KPICard
            title="Revenus du mois"
            value={`${stats.monthlyIncome.toFixed(2)} €`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: stats.incomeTrend, isPositive: stats.incomeTrend >= 0 }}
          />
          <KPICard
            title="Dépenses du mois"
            value={`${stats.monthlyExpenses.toFixed(2)} €`}
            icon={<TrendingDown className="h-6 w-6" />}
            trend={{ value: Math.abs(stats.expensesTrend), isPositive: stats.expensesTrend <= 0 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpensesByCategoryChart transactions={transactions} />
          <ExpensesByPaymentTypeChart transactions={transactions} />
        </div>

        <div className="w-full">
          <ExpensesOverTimeChart transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default Index;