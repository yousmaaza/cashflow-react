import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Transaction {
  date: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
}

interface Props {
  transactions: Transaction[];
}

const TransactionBarChart: React.FC<Props> = ({ transactions }) => {
  const processData = () => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = transaction.date.split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, debit: 0, credit: 0 };
      }
      if (transaction.type === 'DEBIT') {
        acc[date].debit += Math.abs(transaction.amount);
      } else {
        acc[date].credit += transaction.amount;
      }
      return acc;
    }, {} as Record<string, { date: string; debit: number; credit: number }>);

    return Object.values(groupedData).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={processData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="debit" fill="#ff4d4d" name="Débit" />
        <Bar dataKey="credit" fill="#4dff4d" name="Crédit" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionBarChart;