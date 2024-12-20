export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  account: string
  note?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  currency: string
  isDefault?: boolean
}

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color?: string
  icon?: string
}

export interface AnalyticsData {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  expensesByCategory: {
    category: string
    amount: number
    percentage: number
  }[]
  monthlyBalance: {
    month: string
    income: number
    expenses: number
    balance: number
  }[]
}