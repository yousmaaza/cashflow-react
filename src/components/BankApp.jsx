import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard/Dashboard';
import TransactionList from './Transactions/TransactionList';
import Settings from './Settings/Settings';
import { fetchTransactions } from '../services/api';

const BankApp = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  return (
    <div className="flex h-screen bg-primary text-white">
      {/* Sidebar */}
      <div className="w-64 bg-secondary p-4">
        <h1 className="text-xl font-bold mb-8">CashFlow</h1>
        <nav>
          <button
            className={`w-full text-left p-2 mb-2 rounded ${
              currentView === 'dashboard' ? 'bg-primary' : ''
            }`}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`w-full text-left p-2 mb-2 rounded ${
              currentView === 'transactions' ? 'bg-primary' : ''
            }`}
            onClick={() => setCurrentView('transactions')}
          >
            Transactions
          </button>
          <button
            className={`w-full text-left p-2 mb-2 rounded ${
              currentView === 'settings' ? 'bg-primary' : ''
            }`}
            onClick={() => setCurrentView('settings')}
          >
            Paramètres
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' && (
          <Dashboard transactions={transactions} />
        )}
        {currentView === 'transactions' && (
          <TransactionList transactions={transactions} onUpdate={loadTransactions} />
        )}
        {currentView === 'settings' && (
          <Settings />
        )}
      </div>
    </div>
  );
};

export default BankApp;