import api from './api';

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: string;
  paymentMethod: string;
}

interface MonthlyData {
  expenses: number;
  income: number;
  count: number;
}

interface DashboardStats {
  averageMonthlyExpenses: number;
  averageMonthlyIncome: number;
  totalTransactionsCount: number;
}

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    return api.get('/transactions');
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const transactions = await this.getTransactions();
    const monthlyData = this.groupTransactionsByMonth(transactions);

    // Calcul du nombre total de transactions
    const totalTransactionsCount = transactions.length;

    // Calcul des moyennes mensuelles
    const monthCount = Object.keys(monthlyData).length || 1; // Éviter la division par zéro
    const totalExpenses = Object.values(monthlyData).reduce((sum, month) => sum + month.expenses, 0);
    const totalIncome = Object.values(monthlyData).reduce((sum, month) => sum + month.income, 0);

    return {
      averageMonthlyExpenses: totalExpenses / monthCount,
      averageMonthlyIncome: totalIncome / monthCount,
      totalTransactionsCount
    };
  },

  private groupTransactionsByMonth(transactions: Transaction[]): Record<string, MonthlyData> {
    return transactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          expenses: 0,
          income: 0,
          count: 0
        };
      }

      if (t.amount < 0) {
        acc[monthKey].expenses += Math.abs(t.amount);
      } else {
        acc[monthKey].income += t.amount;
      }
      acc[monthKey].count += 1;

      return acc;
    }, {} as Record<string, MonthlyData>);
  },

  async getExpensesByCategory(): Promise<Record<string, number>> {
    const transactions = await this.getTransactions();
    return transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => {
        const category = t.category || 'Non catégorisé';
        acc[category] = (acc[category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);
  },

  async getExpensesByPaymentType(): Promise<Record<string, number>> {
    const transactions = await this.getTransactions();
    return transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => {
        const paymentType = t.paymentMethod || 'Non spécifié';
        acc[paymentType] = (acc[paymentType] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);
  },

  async getExpensesOverTime(): Promise<Record<string, { expenses: number; income: number }>> {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = { expenses: 0, income: 0 };
      }

      if (t.amount < 0) {
        acc[monthYear].expenses += Math.abs(t.amount);
      } else {
        acc[monthYear].income += t.amount;
      }

      return acc;
    }, {} as Record<string, { expenses: number; income: number }>);
  }
};