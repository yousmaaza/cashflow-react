import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/services/transactionService';

interface ExpensesByPaymentTypeChartProps {
  transactions: Transaction[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border p-2 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {`${payload[0].value.toFixed(2)} €`}
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensesByPaymentTypeChart({ transactions }: ExpensesByPaymentTypeChartProps) {
  const [chartData, setChartData] = useState<{ name: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareChartData = async () => {
      try {
        setLoading(true);
        const expenses = transactions.filter(t => t.amount < 0);
        const paymentTypeTotals = expenses.reduce((acc, t) => {
          const paymentType = t.paymentMethod || 'Non spécifié';
          acc[paymentType] = (acc[paymentType] || 0) + Math.abs(t.amount);
          return acc;
        }, {} as Record<string, number>);

        const data = Object.entries(paymentTypeTotals)
          .map(([name, amount]) => ({ name, amount }))
          .sort((a, b) => b.amount - a.amount);

        setChartData(data);
      } catch (error) {
        console.error('Error preparing payment type chart data:', error);
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
          <CardTitle>Dépenses par moyen de paiement</CardTitle>
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
          <CardTitle>Dépenses par moyen de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Aucune dépense à afficher</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dépenses par moyen de paiement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number" 
                tickFormatter={(value) => `${value.toFixed(0)} €`}
                className="text-xs"
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                className="text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                fill="#2563eb"
                radius={[0, 4, 4, 0]}
                className="hover:opacity-80 transition-opacity fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}