import { useEffect, useState } from 'react';
import { Calculator, TrendingUp, ListTodo } from 'lucide-react';
import { Card } from '@/components/ui/card';
import KPICard from '@/components/dashboard/KPICard';
import ExpensesByCategoryChart from '@/components/dashboard/ExpensesByCategoryChart';
import ExpensesByPaymentTypeChart from '@/components/dashboard/ExpensesByPaymentTypeChart';
import ExpensesOverTimeChart from '@/components/dashboard/ExpensesOverTimeChart';
import api, { Transaction } from '@/services/api';

interface DashboardStats {
  averageMonthlyExpenses: number;
  averageMonthlyIncome: number;
  totalTransactionsCount: number;
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [transactions, dashboardStats] = await Promise.all([
          api.getTransactions(),
          api.getDashboardStats()
        ]);
        setTransactions(transactions);
        setStats(dashboardStats);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <Card className="p-6 bg-destructive/10 text-destructive">
        <p className="text-lg font-medium">{error}</p>
        <p className="text-sm mt-2">Veuillez rafraîchir la page ou réessayer plus tard.</p>
      </Card>
    );
  }

  const formatCurrency = (value: number | null) => {
    if (value === null) return '0,00 €';
    return value.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
  };

  const formatNumber = (value: number | null) => {
    if (value === null) return '0';
    return value.toLocaleString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Moyenne mensuelle des dépenses"
            value={stats?.averageMonthlyExpenses}
            icon={<Calculator className="h-6 w-6" />}
            loading={loading}
            valueFormatter={formatCurrency}
          />
          <KPICard
            title="Moyenne mensuelle des revenus"
            value={stats?.averageMonthlyIncome}
            icon={<TrendingUp className="h-6 w-6" />}
            loading={loading}
            valueFormatter={formatCurrency}
          />
          <KPICard
            title="Nombre total d'opérations"
            value={stats?.totalTransactionsCount}
            icon={<ListTodo className="h-6 w-6" />}
            loading={loading}
            valueFormatter={formatNumber}
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