import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionChart = ({ data, period }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#a3a3a3' }}
        />
        <YAxis 
          tick={{ fill: '#a3a3a3' }}
          width={80}
          tickFormatter={(value) => `${value} €`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
          labelStyle={{ color: '#a3a3a3' }}
          formatter={(value) => [`${value} €`]}
        />
        <Legend />
        <Bar dataKey="debit" name="Débit" fill="#ef4444" />
        <Bar dataKey="credit" name="Crédit" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;