import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart4, Table } from 'lucide-react';

const Dashboard = ({ transactions }) => {
  const [viewType, setViewType] = useState('chart'); // 'chart' ou 'table'
  const [periodType, setPeriodType] = useState('Journalier');
  const [showDebit, setShowDebit] = useState(true);
  const [showCredit, setShowCredit] = useState(true);

  // Données d'état factices pour la démo
  const stats = {
    totalBalance: {
      value: "0,00",
      trend: "NaN"
    },
    avgMonthlyIncome: {
      value: "0,00",
      trend: "NaN"
    },
    avgMonthlyExpenses: {
      value: "0,00",
      trend: "NaN"
    }
  };

  // Données graphique factices pour la démo
  const chartData = [];

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
            <p className="text-2xl font-bold text-gray-900">{stats.totalBalance.value} €</p>
            {stats.totalBalance.trend !== "NaN" && (
              <div className="flex items-center text-sm">
                <span className={stats.totalBalance.trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {stats.totalBalance.trend}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 mb-2">Avg Monthly Income</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{stats.avgMonthlyIncome.value} €</p>
            {stats.avgMonthlyIncome.trend !== "NaN" && (
              <div className="flex items-center text-sm">
                <span className="text-red-500">↓ {stats.avgMonthlyIncome.trend}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 mb-2">Avg Monthly Expenses</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{stats.avgMonthlyExpenses.value} €</p>
            {stats.avgMonthlyExpenses.trend !== "NaN" && (
              <div className="flex items-center text-sm">
                <span className="text-red-500">↓ {stats.avgMonthlyExpenses.trend}%</span>
              </div>
            )}
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

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {showDebit && (
                <Line
                  type="monotone"
                  dataKey="debit"
                  stroke="#ef4444"
                  dot={false}
                  name="Débit"
                />
              )}
              {showCredit && (
                <Line
                  type="monotone"
                  dataKey="credit"
                  stroke="#22c55e"
                  dot={false}
                  name="Crédit"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;