import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart4, Table, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = ({ transactions = [], stats = {}, chartData = [], isLoading }) => {
  const [viewType, setViewType] = useState('chart');
  const [periodType, setPeriodType] = useState('Journalier');
  const [showDebit, setShowDebit] = useState(true);
  const [showCredit, setShowCredit] = useState(true);

  const defaultStats = {
    totalBalance: { value: 0, trend: 0 },
    avgMonthlyIncome: { value: 0, trend: 0 },
    avgMonthlyExpenses: { value: 0, trend: 0 }
  };

  const currentStats = {
    totalBalance: stats.totalBalance || defaultStats.totalBalance,
    avgMonthlyIncome: stats.avgMonthlyIncome || defaultStats.avgMonthlyIncome,
    avgMonthlyExpenses: stats.avgMonthlyExpenses || defaultStats.avgMonthlyExpenses
  };

  const formatCurrency = (value) => {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
    if (isNaN(numValue)) return '0,00';
    return numValue.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const renderTrendIndicator = (trend) => {
    if (!trend || trend === "NaN" || isNaN(trend)) return null;
    const trendValue = typeof trend === 'string' ? parseFloat(trend.replace(',', '.')) : trend;
    if (isNaN(trendValue)) return null;

    const isPositive = trendValue > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <div className="flex items-center">
        <Icon className={`w-4 h-4 ${isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'} mr-1`} />
        <span className={`${isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {isPositive ? '+' : ''}{Math.abs(trendValue).toFixed(1)}%
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Cartes des statistiques */}
      <div className="grid grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-colors duration-200">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Total Balance</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(currentStats.totalBalance.value)} €</p>
            {renderTrendIndicator(currentStats.totalBalance.trend)}
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-colors duration-200">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Avg Monthly Income</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(currentStats.avgMonthlyIncome.value)} €</p>
            {renderTrendIndicator(currentStats.avgMonthlyIncome.trend)}
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-colors duration-200">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Avg Monthly Expenses</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(currentStats.avgMonthlyExpenses.value)} €</p>
            {renderTrendIndicator(currentStats.avgMonthlyExpenses.trend)}
          </div>
        </div>
      </div>

      {/* Section graphique */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-colors duration-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Évolution des transactions</h3>
            <div className="flex items-center gap-6">
              <select
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200"
              >
                <option>Journalier</option>
                <option>Hebdomadaire</option>
                <option>Mensuel</option>
              </select>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={showDebit}
                    onChange={(e) => setShowDebit(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-red-500 dark:text-red-400 rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 transition-colors duration-200"
                  />
                  <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Débit</span>
                </label>

                <label className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={showCredit}
                    onChange={(e) => setShowCredit(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-500 dark:text-green-400 rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 transition-colors duration-200"
                  />
                  <span className="hover:text-green-500 dark:hover:text-green-400 transition-colors">Crédit</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewType('chart')}
              className={`p-2 rounded-lg transition-colors ${
                viewType === 'chart' 
                  ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <BarChart4 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewType === 'table' 
                  ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Table className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewType === 'chart' ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                {showDebit && (
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
                )}
                {showCredit && (
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
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Date</th>
                  {showDebit && <th className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 font-medium">Débit</th>}
                  {showCredit && <th className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 font-medium">Crédit</th>}
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{item.date}</td>
                    {showDebit && (
                      <td className="px-4 py-3 text-right text-red-500 dark:text-red-400">
                        {item.debit ? `-${formatCurrency(item.debit)} €` : '-'}
                      </td>
                    )}
                    {showCredit && (
                      <td className="px-4 py-3 text-right text-green-500 dark:text-green-400">
                        {item.credit ? `+${formatCurrency(item.credit)} €` : '-'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;