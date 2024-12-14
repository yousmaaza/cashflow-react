import React, { useState, useEffect } from 'react';
import Sidebar from './ui/Sidebar';
import Dashboard from './ui/Dashboard';
import TransactionsPage from './pages/TransactionsPage';

const API_URL = 'http://localhost:8000';

const BankApp = () => {
  console.log('BankApp rendering'); // Debug log

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered'); // Debug log
    loadData();
  }, []);

  const loadData = async () => {
    console.log('Loading data...'); // Debug log
    try {
      setIsLoading(true);
      setError(null);
      
      // Charger les transactions
      console.log('Fetching transactions...'); // Debug log
      const transactionsResponse = await fetch(`${API_URL}/transactions/`);
      if (!transactionsResponse.ok) throw new Error('Erreur lors du chargement des transactions');
      const transactionsData = await transactionsResponse.json();
      console.log('Transactions loaded:', transactionsData); // Debug log
      setTransactions(transactionsData);

      // Charger les statistiques
      console.log('Fetching stats...'); // Debug log
      const statsResponse = await fetch(`${API_URL}/stats/`);
      if (!statsResponse.ok) throw new Error('Erreur lors du chargement des statistiques');
      const statsData = await statsResponse.json();
      console.log('Stats loaded:', statsData); // Debug log
      setStats(statsData);

    } catch (err) {
      console.error('Error in loadData:', err); // Debug log
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    console.log('Rendering content for page:', currentPage); // Debug log

    const dashboardProps = {
      transactions,
      stats: stats || {
        totalBalance: { value: "0,00", trend: "NaN" },
        avgMonthlyIncome: { value: "0,00", trend: "NaN" },
        avgMonthlyExpenses: { value: "0,00", trend: "NaN" }
      },
      chartData: transactions.map(t => ({
        date: new Date(t.date).toLocaleDateString(),
        credit: t.montant > 0 ? t.montant : 0,
        debit: t.montant < 0 ? Math.abs(t.montant) : 0
      })).sort((a, b) => new Date(a.date) - new Date(b.date)),
      isLoading
    };

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard {...dashboardProps} />;
      case 'transactions':
        return <TransactionsPage 
          transactions={transactions} 
          onTransactionsUpdate={loadData}
          isLoading={isLoading}
        />;
      default:
        return (
          <div className="p-6">
            <h1>Page en développement</h1>
          </div>
        );
    }
  };

  console.log('Current page:', currentPage); // Debug log

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