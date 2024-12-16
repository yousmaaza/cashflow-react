import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Transaction {
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface TransactionsBarChartProps {
  transactions: Transaction[];
}

const TransactionsBarChart: React.FC<TransactionsBarChartProps> = ({ transactions }) => {
  // Grouper les transactions par jour
  const dailyTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date.split('T')[0]; // Prendre seulement la date
    if (!acc[date]) {
      acc[date] = { date, credits: 0, debits: 0 };
    }
    if (transaction.type === 'credit') {
      acc[date].credits += transaction.amount;
    } else {
      acc[date].debits += Math.abs(transaction.amount);
    }
    return acc;
  }, {} as Record<string, { date: string; credits: number; debits: number }>);

  // Convertir en tableau pour Recharts
  const data = Object.values(dailyTransactions).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="w-full h-[400px] p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Évolution des transactions par jour
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)} €`}
            labelFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')}
          />
          <Legend />
          <Bar 
            dataKey="credits" 
            name="Crédits" 
            fill="#4ade80" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="debits" 
            name="Débits" 
            fill="#f87171" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsBarChart;