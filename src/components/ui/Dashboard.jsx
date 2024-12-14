import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart4, Table, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = ({ transactions, stats, chartData, isLoading }) => {
  const [viewType, setViewType] = useState('chart');
  const [periodType, setPeriodType] = useState('Journalier');
  const [showDebit, setShowDebit] = useState(true);
  const [showCredit, setShowCredit] = useState(true);

  const formatCurrency = (value) => {
    return Number(value).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const renderTrendIndicator = (trend) => {
    if (trend === "NaN") return null;
    const trendValue = parseFloat(trend);
    const isPositive = trendValue > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <div className="flex items-center">
        <Icon className={`w-4 h-4 ${isPositive ? 'text-green-500' : 'text-red-500'} mr-1`} />
        <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{trend}%
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
      {/* Ligne d'en-tête avec filtre */}
      <div className="flex justify-end">
        <button className="px-4 py-2 flex items-center gap-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V20l-4-4v-5.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" />
          </svg>
          Filtres
        </button>
      </div>

      {/* Cartes des statistiques */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 mb-2">Total Balance</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBalance.value)} €</p>
            {renderTrendIndicator(stats.totalBalance.trend)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 mb-2">Avg Monthly Income</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgMonthlyIncome.value)} €</p>
            {renderTrendIndicator(stats.avgMonthlyIncome.trend)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 mb-2">Avg Monthly Expenses</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgMonthlyExpenses.value)} €</p>
            {renderTrendIndicator(stats.avgMonthlyExpenses.trend)}
          </div>
        </div>
      </div>

      {/* Section graphique */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Évolution des transactions (filtrées)</h3>
            <div className="flex items-center gap-6">
              <select
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5"
              >
                <option>Journalier</option>
                <option>Hebdomadaire</option>
                <option>Mensuel</option>
              </select>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showDebit}
                    onChange={(e) => setShowDebit(e.target.checked)}
                    className="rounded text-[#1a237e] focus:ring-[#1a237e]"
                  />
                  <span>Débit</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showCredit}
                    onChange={(e) => setShowCredit(e.target.checked)}
                    className="rounded text-[#1a237e] focus:ring-[#1a237e]"
                  />
                  <span>Crédit</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewType('chart')}
              className={`p-2 rounded ${viewType === 'chart' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <BarChart4 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`p-2 rounded ${viewType === 'table' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Table className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewType === 'chart' ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => `${formatCurrency(value)} €`}
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value)} €`]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                {showDebit && (
                  <Line
                    type="monotone"
                    dataKey="debit"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Débit"
                  />
                )}
                {showCredit && (
                  <Line
                    type="monotone"
                    dataKey="credit"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    name="Crédit"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  {showDebit && <th className="px-4 py-2 text-right">Débit</th>}
                  {showCredit && <th className="px-4 py-2 text-right">Crédit</th>}
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="px-4 py-2">{item.date}</td>
                    {showDebit && (
                      <td className="px-4 py-2 text-right text-red-500">
                        {item.debit ? `-${formatCurrency(item.debit)} €` : '-'}
                      </td>
                    )}
                    {showCredit && (
                      <td className="px-4 py-2 text-right text-green-500">
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