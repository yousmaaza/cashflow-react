import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionBarChart = ({ transactions, height = '400px' }) => {
  const chartData = useMemo(() => {
    return transactions.map(transaction => ({
      date: new Date(transaction.date).toLocaleDateString(),
      montant: transaction.amount,
      categorie: transaction.category
    }));
  }, [transactions]);

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Évolution des Transactions</h2>
      <div style={{ height: height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px'
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                paddingTop: '10px'
              }}
            />
            <Bar
              dataKey="montant"
              fill="#4F46E5"
              name="Montant"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionBarChart;
