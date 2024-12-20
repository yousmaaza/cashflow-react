import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

const transactions = [
  {
    id: '1',
    description: 'Courses Carrefour',
    amount: -82.56,
    date: '2024-02-19',
    category: 'Alimentation',
  },
  {
    id: '2',
    description: 'Salaire',
    amount: 2500.00,
    date: '2024-02-15',
    category: 'Revenus',
  },
  {
    id: '3',
    description: 'Netflix',
    amount: -15.99,
    date: '2024-02-14',
    category: 'Loisirs',
  },
  {
    id: '4',
    description: 'SNCF',
    amount: -47.00,
    date: '2024-02-12',
    category: 'Transport',
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
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <div className={`w-full h-full rounded-full ${
                  transaction.amount > 0 ? 'bg-emerald-500' : 'bg-red-500'
                }`} />
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              transaction.amount > 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}