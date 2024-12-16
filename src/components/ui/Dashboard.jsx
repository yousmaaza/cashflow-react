import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { BarChart4, Table, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = ({ transactions = [], stats = {}, chartData = [], isLoading }) => {
  // ... (rest of the component code remains the same until the chart section)

  return (
    <div className="p-6 space-y-6">
      {/* Stats cards section remains the same */}
      
      {/* Chart section */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-colors duration-200">
        <div className="flex justify-between items-center mb-6">
          {/* Header section remains the same */}
        </div>

        {viewType === 'chart' ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                barGap={0}
                barSize={20}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  className="dark:stroke-gray-700" 
                  vertical={false} 
                />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tickMargin={5}
                />
                <YAxis
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `${formatCurrency(value)} €`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ color: '#374151', marginBottom: '4px' }}
                  itemStyle={{ color: '#374151', padding: '2px 0' }}
                  formatter={(value) => [`${formatCurrency(value)} €`]}
                  labelFormatter={(label) => `Date: ${label}`}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
                {showCredit && (
                  <Bar
                    dataKey="credit"
                    name="Crédit"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                )}
                {showDebit && (
                  <Bar
                    dataKey="debit"
                    name="Débit"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          // Table view remains the same
        )}
      </div>
    </div>
  );
};

export default Dashboard;