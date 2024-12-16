import React, { useState } from 'react';
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
import { useTransactionAggregation } from '../../hooks/useTransactionAggregation';

const PERIOD_OPTIONS = [
  { value: 'daily', label: 'Quotidien' },
  { value: 'monthly', label: 'Mensuel' },
  { value: 'quarterly', label: 'Trimestriel' },
  { value: 'biannual', label: 'Semestriel' }
];

const TransactionGraph = ({ data }) => {
  const [period, setPeriod] = useState('daily');
  const aggregatedData = useTransactionAggregation(data, period);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
        >
          {PERIOD_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={aggregatedData}
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
          <Bar dataKey="debit" name="Débit" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="credit" name="Crédit" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;