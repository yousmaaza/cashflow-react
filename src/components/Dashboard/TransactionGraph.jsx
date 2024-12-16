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

const TransactionGraph = ({ data, period }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
        <XAxis 
          dataKey="date"
          tick={{ fill: '#a0aec0' }}
        />
        <YAxis 
          tick={{ fill: '#a0aec0' }}
          tickFormatter={(value) => `${value.toFixed(2)} €`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1a202c',
            border: '1px solid #2d3748',
            borderRadius: '4px',
            color: '#a0aec0'
          }}
          formatter={(value) => [`${value.toFixed(2)} €`]}
        />
        <Legend />
        <Bar dataKey="debit" name="Débit" fill="#ef4444" />
        <Bar dataKey="credit" name="Crédit" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionGraph;