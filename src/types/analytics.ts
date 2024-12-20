export interface SpendingByCategory {
  category: string
  amount: number
  percentage: number
  transactions: number
}

export interface MonthlyBalance {
  month: string
  income: number
  expense: number
  balance: number
}

export interface CashflowSummary {
  totalIncome: number
  totalExpense: number
  netIncome: number
  savingsRate: number
  topExpenseCategories: SpendingByCategory[]
  monthlyBalances: MonthlyBalance[]
}