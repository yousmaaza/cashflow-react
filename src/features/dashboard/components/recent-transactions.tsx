import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

type Transaction = {
  id: string
  description: string
  amount: number
  date: string
  category: string
  type: 'income' | 'expense'
}

// Données mockées pour l'exemple
const transactions: Transaction[] = [
  {
    id: '1',
    description: 'Salaire ACME Corp',
    amount: 2500.00,
    date: '2024-02-25',
    category: 'Salaire',
    type: 'income'
  },
  {
    id: '2',
    description: 'Courses Carrefour',
    amount: -82.56,
    date: '2024-02-24',
    category: 'Alimentation',
    type: 'expense'
  },
  {
    id: '3',
    description: 'Netflix',
    amount: -15.99,
    date: '2024-02-23',
    category: 'Loisirs',
    type: 'expense'
  },
  {
    id: '4',
    description: 'SNCF',
    amount: -47.00,
    date: '2024-02-22',
    category: 'Transport',
    type: 'expense'
  },
  {
    id: '5',
    description: 'Freelance Design',
    amount: 450.00,
    date: '2024-02-21',
    category: 'Revenus',
    type: 'income'
  },
]

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function RecentTransactions() {
  return (
    <ScrollArea className="h-[350px] pr-4">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-9 w-9">
              <div 
                className={`w-full h-full rounded-full ${transaction.type === 'income' 
                  ? 'bg-emerald-500' 
                  : 'bg-red-500'}`} 
              />
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.date)} · {transaction.category}
              </p>
            </div>
            <div className={`text-sm font-medium ${transaction.type === 'income' 
              ? 'text-emerald-600 dark:text-emerald-400' 
              : 'text-red-600 dark:text-red-400'}`}
            >
              {transaction.type === 'income' ? '+' : ''}
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}