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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const transactions = await this.getTransactions();
    
    // Calcul du nombre total de transactions
    const totalTransactionsCount = transactions.length;

    // Regrouper les transactions par mois
    const monthlyTransactions = transactions.reduce((acc, t) => {
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
    }, {} as Record<string, { expenses: number; income: number; count: number }>);

    // Calcul des moyennes mensuelles
    const monthCount = Object.keys(monthlyTransactions).length || 1; // Éviter la division par zéro
    const totalExpenses = Object.values(monthlyTransactions).reduce((sum, month) => sum + month.expenses, 0);
    const totalIncome = Object.values(monthlyTransactions).reduce((sum, month) => sum + month.income, 0);

    const averageMonthlyExpenses = totalExpenses / monthCount;
    const averageMonthlyIncome = totalIncome / monthCount;

    return {
      averageMonthlyExpenses,
      averageMonthlyIncome,
      totalTransactionsCount
    };
  },

  async getExpensesByCategory() {
    const transactions = await this.getTransactions();
    const expenses = transactions.filter(t => t.amount < 0);
    
    return expenses.reduce((acc, t) => {
      const category = t.category || 'Non catégorisé';
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);
  },

  async getExpensesByPaymentType() {
    const transactions = await this.getTransactions();
    const expenses = transactions.filter(t => t.amount < 0);
    
    return expenses.reduce((acc, t) => {
      const paymentType = t.paymentMethod || 'Non spécifié';
      if (!acc[paymentType]) {
        acc[paymentType] = 0;
      }
      acc[paymentType] += Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);
  },

  async getExpensesOverTime() {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {
          expenses: 0,
          income: 0
        };
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