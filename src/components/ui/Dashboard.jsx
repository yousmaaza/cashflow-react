import React from 'react';
import { TransactionsBarChart, TransactionsPieCharts } from '../charts/TransactionsCharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = ({ transactions = [], stats = {}, chartData = [], isLoading }) => {
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
    <div className="p-6 space-y-6 min-h-screen dark:bg-gray-900">
      {/* Cartes des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Total Balance</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(currentStats.totalBalance.value)} €
            </p>
            {renderTrendIndicator(currentStats.totalBalance.trend)}
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Avg Monthly Income</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(currentStats.avgMonthlyIncome.value)} €
            </p>
            {renderTrendIndicator(currentStats.avgMonthlyIncome.trend)}
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Avg Monthly Expenses</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(currentStats.avgMonthlyExpenses.value)} €
            </p>
            {renderTrendIndicator(currentStats.avgMonthlyExpenses.trend)}
          </div>
        </div>
      </div>

      {/* Graphique en barres des transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700">
        <TransactionsBarChart data={chartData} />
      </div>

      {/* Section des graphiques en camembert */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700">
        <div className="p-6">
          <TransactionsPieCharts transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;