import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './ui/Sidebar';
import Dashboard from './ui/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import LoadingIndicator from './ui/LoadingIndicator';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';

const API_URL = 'http://localhost:8000';

const calculateStats = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return {
      totalBalance: { value: 0, trend: 0 },
      avgMonthlyIncome: { value: 0, trend: 0 },
      avgMonthlyExpenses: { value: 0, trend: 0 }
    };
  }

  const totalBalance = transactions.reduce((sum, t) => sum + parseFloat(t.montant || 0), 0);

  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthKey]) {
      acc[monthKey] = { incomes: [], expenses: [] };
    }

    const amount = parseFloat(t.montant || 0);
    if (amount > 0) {
      acc[monthKey].incomes.push(amount);
    } else {
      acc[monthKey].expenses.push(Math.abs(amount));
    }

    return acc;
  }, {});

  const monthsCount = Object.keys(monthlyData).length || 1;
  const monthlyAverages = Object.values(monthlyData).reduce(
    (acc, { incomes, expenses }) => {
      acc.totalIncome += incomes.reduce((sum, val) => sum + val, 0);
      acc.totalExpenses += expenses.reduce((sum, val) => sum + val, 0);
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  const avgMonthlyIncome = monthlyAverages.totalIncome / monthsCount;
  const avgMonthlyExpenses = monthlyAverages.totalExpenses / monthsCount;

  const months = Object.keys(monthlyData).sort();
  let trend = 0;
  let incomeTrend = 0;
  let expensesTrend = 0;

  if (months.length >= 2) {
    const lastMonth = monthlyData[months[months.length - 1]];
    const previousMonth = monthlyData[months[months.length - 2]];

    const lastMonthTotal = lastMonth.incomes.reduce((sum, val) => sum + val, 0) -
                          lastMonth.expenses.reduce((sum, val) => sum + val, 0);
    const previousMonthTotal = previousMonth.incomes.reduce((sum, val) => sum + val, 0) -
                              previousMonth.expenses.reduce((sum, val) => sum + val, 0);

    const lastMonthIncome = lastMonth.incomes.reduce((sum, val) => sum + val, 0);
    const previousMonthIncome = previousMonth.incomes.reduce((sum, val) => sum + val, 0);

    const lastMonthExpenses = lastMonth.expenses.reduce((sum, val) => sum + val, 0);
    const previousMonthExpenses = previousMonth.expenses.reduce((sum, val) => sum + val, 0);

    trend = previousMonthTotal !== 0
      ? ((lastMonthTotal - previousMonthTotal) / Math.abs(previousMonthTotal)) * 100
      : 0;

    incomeTrend = previousMonthIncome !== 0
      ? ((lastMonthIncome - previousMonthIncome) / previousMonthIncome) * 100
      : 0;

    expensesTrend = previousMonthExpenses !== 0
      ? ((lastMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
      : 0;
  }

  return {
    totalBalance: {
      value: totalBalance,
      trend: trend
    },
    avgMonthlyIncome: {
      value: avgMonthlyIncome,
      trend: incomeTrend
    },
    avgMonthlyExpenses: {
      value: avgMonthlyExpenses,
      trend: expensesTrend
    }
  };
};

const prepareChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const dailyData = transactions.reduce((acc, t) => {
    const date = new Date(t.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { credit: 0, debit: 0 };
    }
    const amount = parseFloat(t.montant || 0);
    if (amount > 0) {
      acc[date].credit += amount;
    } else {
      acc[date].debit += Math.abs(amount);
    }
    return acc;
  }, {});

  return Object.entries(dailyData)
    .map(([date, values]) => ({ date, ...values }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const BankAppContent = ({ toggleTheme, theme }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isProcessing } = useLoading();
  const [filters, setFilters] = useState({
    dateRange: null,
    type: '',
    category: '',
    minAmount: '',
    maxAmount: ''
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      if (filters.dateRange) {
        const transactionDate = new Date(transaction.date);
        if (filters.dateRange.from && transactionDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && transactionDate > filters.dateRange.to) {
          return false;
        }
      }

      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      if (filters.category && transaction.categorie !== filters.category) {
        return false;
      }

      if (filters.minAmount && parseFloat(transaction.montant) < parseFloat(filters.minAmount)) {
        return false;
      }

      if (filters.maxAmount && parseFloat(transaction.montant) > parseFloat(filters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/transactions/`);
      if (!response.ok) throw new Error('Erreur lors du chargement des transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur de chargement:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      dateRange: null,
      type: '',
      category: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  const renderContent = () => {
    const sharedProps = {
      isLoading: isLoading || isProcessing,
      onTransactionsUpdate: loadData,
      transactions: filteredTransactions,
    };

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            {...sharedProps}
            stats={calculateStats(filteredTransactions)}
            chartData={prepareChartData(filteredTransactions)}
          />
        );
      case 'transactions':
        return (
          <TransactionsPage
            {...sharedProps}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        );
      default:
        return (
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Cette page est en cours de développement
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <LoadingIndicator />
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <main className="flex-1 ml-64 bg-white dark:bg-gray-900 transition-colors duration-200">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-l-4 border-red-500">
            {error}
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

const BankApp = (props) => {
  return (
    <LoadingProvider>
      <BankAppContent {...props} />
    </LoadingProvider>
  );
};

export default BankApp;