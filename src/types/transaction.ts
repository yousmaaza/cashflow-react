export interface Transaction {
  id: string
  date: string
  amount: number
  type: 'income' | 'expense'
  category: string
  description: string
  tags?: string[]
  accountId: string
  createdAt: string
  updatedAt: string
}

export interface TransactionCategory {
  id: string
  name: string
  type: 'income' | 'expense'
  color: string
  icon?: string
}

export interface TransactionFilters {
  startDate?: string
  endDate?: string
  type?: 'income' | 'expense'
  category?: string
  minAmount?: number
  maxAmount?: number
  searchQuery?: string
}