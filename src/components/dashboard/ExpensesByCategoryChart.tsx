import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { transactionService, Transaction } from '@/services/transactionService';

interface ExpensesByCategoryChartProps {
  transactions: Transaction[];
}

const COLORS = [
  '#2563eb', // blue-600
  '#7c3aed', // violet-600
  '#db2777', // pink-600
  '#ea580c', // orange-600
  '#16a34a', // green-600
  '#8b5cf6', // violet-500
  '#84cc16', // lime-500
  '#06b6d4', // cyan-500
  '#f59e0b', // amber-500
  '#ec4899', // pink-500
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border p-2 rounded-lg shadow-lg">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {`${payload[0].value.toFixed(2)} €`}
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensesByCategoryChart({ transactions }: ExpensesByCategoryChartProps) {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareChartData = async () => {
      try {
        setLoading(true);
        const expenses = transactions.filter(t => t.amount < 0);
        const categoryTotals = expenses.reduce((acc, t) => {
          const category = t.category || 'Non catégorisé';
          acc[category] = (acc[category] || 0) + Math.abs(t.amount);
          return acc;
        }, {} as Record<string, number>);

        const data = Object.entries(categoryTotals)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);

        setChartData(data);
      } catch (error) {
        console.error('Error preparing category chart data:', error);
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
          <CardTitle>Dépenses par catégorie</CardTitle>
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
          <CardTitle>Dépenses par catégorie</CardTitle>
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
        <CardTitle>Dépenses par catégorie</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-background hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => 
                  <span className="text-sm">{value}</span>
                }
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}