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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  },

  async getCurrentMonthStats() {
    const transactions = await this.getTransactions();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
    const monthlyIncome = monthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const monthlyExpenses = Math.abs(
      monthTransactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    // Calculate trends comparing to last month
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    });

    const lastMonthIncome = lastMonthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const lastMonthExpenses = Math.abs(
      lastMonthTransactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const incomeTrend = lastMonthIncome ? 
      ((monthlyIncome - lastMonthIncome) / lastMonthIncome) * 100 : 0;
    const expensesTrend = lastMonthExpenses ? 
      ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0;

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      incomeTrend,
      expensesTrend
    };
  },

  async getExpensesByCategory() {
    const transactions = await this.getTransactions();
    const expenses = transactions.filter(t => t.amount < 0);
    
    return expenses.reduce((acc, t) => {
      const category = t.category;
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
      const paymentType = t.paymentMethod;
      if (!acc[paymentType]) {
        acc[paymentType] = 0;
      }
      acc[paymentType] += Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);
  },

  async getExpensesOverTime() {
    const transactions = await this.getTransactions();
    const expenses = transactions.filter(t => t.amount < 0);
    
    return expenses.reduce((acc, t) => {
      const date = new Date(t.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);
  }
};