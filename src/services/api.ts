import axios from 'axios';

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: string;
  paymentMethod: string;
}

interface DashboardStats {
  averageMonthlyExpenses: number;
  averageMonthlyIncome: number;
  totalTransactionsCount: number;
}

interface MonthlyData {
  expenses: number;
  income: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = {
  async getTransactions(): Promise<Transaction[]> {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const transactions = await this.getTransactions();
    const monthlyData = this.groupTransactionsByMonth(transactions);

    const monthCount = Object.keys(monthlyData).length || 1;
    const totalExpenses = Object.values(monthlyData).reduce((sum, month) => sum + month.expenses, 0);
    const totalIncome = Object.values(monthlyData).reduce((sum, month) => sum + month.income, 0);

    return {
      averageMonthlyExpenses: totalExpenses / monthCount,
      averageMonthlyIncome: totalIncome / monthCount,
      totalTransactionsCount: transactions.length
    };
  },

  private groupTransactionsByMonth(transactions: Transaction[]): Record<string, MonthlyData> {
    return transactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = { expenses: 0, income: 0 };
      }

      if (t.amount < 0) {
        acc[monthKey].expenses += Math.abs(t.amount);
      } else {
        acc[monthKey].income += t.amount;
      }

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
  }
};

export default api;