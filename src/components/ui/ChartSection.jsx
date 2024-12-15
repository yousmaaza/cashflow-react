import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartSection = ({ transactions }) => {
  return (
    <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Évolution des transactions
        </h2>
        <div className="flex items-center gap-6">
          <select
            className="bg-gray-800/80 text-gray-200 px-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            defaultValue="Journalier"
          >
            <option>Journalier</option>
            <option>Hebdomadaire</option>
            <option>Mensuel</option>
          </select>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 text-gray-200">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-500 rounded-md bg-gray-800/80 border-gray-700/50"
                defaultChecked
              />
              <span className="hover:text-red-400 transition-colors">Débit</span>
            </label>
            <label className="flex items-center gap-3 text-gray-200">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-500 rounded-md bg-gray-800/80 border-gray-700/50"
                defaultChecked
              />
              <span className="hover:text-green-400 transition-colors">Crédit</span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={transactions}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorDebit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `${value} €`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#E5E7EB', marginBottom: '4px' }}
              itemStyle={{ color: '#E5E7EB', padding: '2px 0' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="debit"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Débit"
              fillOpacity={1}
              fill="url(#colorDebit)"
            />
            <Line
              type="monotone"
              dataKey="credit"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Crédit"
              fillOpacity={1}
              fill="url(#colorCredit)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;