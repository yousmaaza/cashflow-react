import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '@/services/transactionService';

interface ExpensesOverTimeChartProps {
  transactions: Transaction[];
}

interface ChartDataPoint {
  date: string;
  expenses: number;
  income: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border p-2 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((p: any, index: number) => (
          <p key={index} className="text-sm text-muted-foreground">
            {`${p.name === 'expenses' ? 'Dépenses' : 'Revenus'}: ${p.value.toFixed(2)} €`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' }).format(date);
};

export default function ExpensesOverTimeChart({ transactions }: ExpensesOverTimeChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareChartData = async () => {
      try {
        setLoading(true);
        const monthlyData = transactions.reduce((acc, t) => {
          const date = new Date(t.date);
          const monthYear = date.toISOString().slice(0, 7); // YYYY-MM format

          if (!acc[monthYear]) {
            acc[monthYear] = { expenses: 0, income: 0 };
          }

          if (t.amount < 0) {
            acc[monthYear].expenses += Math.abs(t.amount);
          } else {
            acc[monthYear].income += t.amount;
          }

          return acc;
        }, {} as Record<string, { expenses: number; income: number }>);

        const data = Object.entries(monthlyData)
          .map(([date, values]) => ({
            date,
            ...values,
          }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setChartData(data);
      } catch (error) {
        console.error('Error preparing time series chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    prepareChartData();
  }, [transactions]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolution des dépenses et revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolution des dépenses et revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Aucune donnée à afficher</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolution des dépenses et revenus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date"
                tickFormatter={formatDate}
                className="text-xs"
              />
              <YAxis 
                tickFormatter={(value) => `${value.toFixed(0)} €`}
                className="text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Dépenses"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="income"
                name="Revenus"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}