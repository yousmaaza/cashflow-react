import React, { useState } from 'react';
import Sidebar from './ui/Sidebar';
import Dashboard from './ui/Dashboard';
import TransactionsPage from './pages/TransactionsPage';

const BankApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'transactions':
        return <TransactionsPage />;
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
              
              {/* Bouton Filtres - présent sur toutes les pages */}
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
        {renderContent()}
      </main>
    </div>
  );
};

export default BankApp;