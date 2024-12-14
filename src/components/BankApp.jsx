import React, { useState } from 'react';
import Sidebar from './ui/Sidebar';
import Dashboard from './ui/Dashboard';
import TransactionsPage from './pages/TransactionsPage';

const BankApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'transactions':
        return <TransactionsPage />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
            <p className="text-gray-600 mt-2">Cette page est en cours de développement.</p>
          </div>
        );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="ml-64">
        {renderPage()}
      </div>
    </div>
  );
};

export default BankApp;