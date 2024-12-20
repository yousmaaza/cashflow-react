export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Revenu' },
  { value: 'expense', label: 'Dépense' },
] as const

export const ACCOUNT_TYPES = [
  { value: 'checking', label: 'Compte courant' },
  { value: 'savings', label: 'Compte épargne' },
  { value: 'credit', label: 'Carte de crédit' },
  { value: 'investment', label: 'Compte d\'investissement' },
] as const

export const DEFAULT_CATEGORIES = {
  income: [
    { id: 'salary', name: 'Salaire', color: '#10b981' },
    { id: 'freelance', name: 'Freelance', color: '#3b82f6' },
    { id: 'investments', name: 'Investissements', color: '#6366f1' },
    { id: 'other_income', name: 'Autres revenus', color: '#8b5cf6' },
  ],
  expense: [
    { id: 'housing', name: 'Logement', color: '#ef4444' },
    { id: 'food', name: 'Alimentation', color: '#f97316' },
    { id: 'transport', name: 'Transport', color: '#f59e0b' },
    { id: 'utilities', name: 'Factures', color: '#84cc16' },
    { id: 'healthcare', name: 'Santé', color: '#06b6d4' },
    { id: 'entertainment', name: 'Loisirs', color: '#6366f1' },
    { id: 'shopping', name: 'Shopping', color: '#8b5cf6' },
    { id: 'other_expense', name: 'Autres dépenses', color: '#ec4899' },
  ],
} as const

export const DATE_FORMAT = 'dd/MM/yyyy'
export const CURRENCY = 'EUR'
export const LOCALE = 'fr-FR'