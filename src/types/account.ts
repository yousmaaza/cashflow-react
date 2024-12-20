export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  currency: string
  color?: string
  icon?: string
  isDefault?: boolean
  createdAt: string
  updatedAt: string
}