import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, Wallet } from 'lucide-react'

type StatisticProps = {
  title: string
  value: string
  trend?: number
  icon?: React.ReactNode
  trendColor?: 'positive' | 'negative' | 'neutral'
}

function StatisticCard({ title, value, trend, icon, trendColor = 'neutral' }: StatisticProps) {
  const trendColorClasses = {
    positive: 'text-emerald-600',
    negative: 'text-red-600',
    neutral: 'text-blue-600'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {trend !== undefined && (
          <p className={`text-xs ${trendColorClasses[trendColor]}`}>
            {trend >= 0 ? (
              <ArrowUpIcon className="inline h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="inline h-4 w-4 mr-1" />
            )}
            {Math.abs(trend)}% par rapport au mois dernier
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function Statistics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatisticCard
        title="Solde total"
        value="5,231.89 €"
        icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
      />
      <StatisticCard
        title="Revenus (mois)"
        value="3,452.00 €"
        trend={12.5}
        trendColor="positive"
      />
      <StatisticCard
        title="Dépenses (mois)"
        value="2,836.00 €"
        trend={-4.2}
        trendColor="negative"
      />
      <StatisticCard
        title="Économies (mois)"
        value="616.00 €"
        trend={8.4}
        trendColor="positive"
      />
    </div>
  )
}