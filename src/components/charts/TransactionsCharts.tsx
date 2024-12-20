import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type ChartData = {
  month: string
  revenus: number
  depenses: number
}

const data: ChartData[] = [
  { month: 'Jan', revenus: 2400, depenses: 1398 },
  { month: 'Fév', revenus: 1398, depenses: 2210 },
  { month: 'Mar', revenus: 9800, depenses: 2290 },
  { month: 'Avr', revenus: 3908, depenses: 2000 },
  { month: 'Mai', revenus: 4800, depenses: 2181 },
  { month: 'Jui', revenus: 3800, depenses: 2500 },
  { month: 'Jui', revenus: 4300, depenses: 2100 },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(value)
}

export function TransactionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution des transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.1)' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
              formatter={(value: number) => [formatCurrency(value)]}
            />
            <Bar
              dataKey="revenus"
              fill="hsl(142.1 76.2% 36.3%)"
              radius={[4, 4, 0, 0]}
              name="Revenus"
            />
            <Bar
              dataKey="depenses"
              fill="hsl(346.8 77.2% 49.8%)"
              radius={[4, 4, 0, 0]}
              name="Dépenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}