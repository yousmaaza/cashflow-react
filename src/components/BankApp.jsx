import React, { useState, useEffect } from 'react';
import Sidebar from './ui/Sidebar';
import Dashboard from './ui/Dashboard';
import TransactionsPage from './pages/TransactionsPage';

const BankApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les transactions au démarrage
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/transactions/');
      if (!response.ok) {
        throw new Error('Failed to load transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculer les statistiques pour le dashboard
  const calculateStats = () => {
    if (!transactions.length) return {
      totalBalance: { value: "0,00", trend: "NaN" },
      avgMonthlyIncome: { value: "0,00", trend: "NaN" },
      avgMonthlyExpenses: { value: "0,00", trend: "NaN" }
    };

    const credits = transactions.filter(t => t.amount > 0).map(t => t.amount);
    const debits = transactions.filter(t => t.amount < 0).map(t => Math.abs(t.amount));

    const totalBalance = credits.reduce((a, b) => a + b, 0) - debits.reduce((a, b) => a + b, 0);
    const avgIncome = credits.length ? credits.reduce((a, b) => a + b, 0) / credits.length : 0;
    const avgExpenses = debits.length ? debits.reduce((a, b) => a + b, 0) / debits.length : 0;

    return {
      totalBalance: {
        value: totalBalance.toFixed(2),
        trend: calculateTrend(totalBalance, transactions)
      },
      avgMonthlyIncome: {
        value: avgIncome.toFixed(2),
        trend: calculateTrend(avgIncome, credits)
      },
      avgMonthlyExpenses: {
        value: avgExpenses.toFixed(2),
        trend: calculateTrend(avgExpenses, debits)
      }
    };
  };

  // Calculer la tendance (peut être amélioré selon vos besoins)
  const calculateTrend = (currentValue, historicalData) => {
    if (historicalData.length < 2) return "NaN";
    const previousValue = historicalData[historicalData.length - 2];
    if (!previousValue) return "NaN";
    return (((currentValue - previousValue) / previousValue) * 100).toFixed(1);
  };

  // Préparer les données pour le graphique
  const prepareChartData = () => {
    return transactions.map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      credit: t.amount > 0 ? t.amount : 0,
      debit: t.amount < 0 ? Math.abs(t.amount) : 0
    }));
  };

  const renderContent = () => {
    const dashboardProps = {
      transactions,
      stats: calculateStats(),
      chartData: prepareChartData(),
      isLoading
    };

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard {...dashboardProps} />;
      case 'transactions':
        return <TransactionsPage 
          transactions={transactions} 
          onTransactionsUpdate={loadTransactions}
          isLoading={isLoading}
        />;
      default:
        return (
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                </h1>
                <p className="text-gray-600 mt-1">Cette page est en cours de développement</p>
              </div>
              <button className="px-4 py-2 flex items-center gap-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V20l-4-4v-5.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" />
                </svg>
                Filtres
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 ml-64 bg-gray-50">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 border-l-4 border-red-500">
            {error}
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default BankApp;