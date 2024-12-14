import React, { useState, useMemo } from 'react';
import { Home, Clock, FileText, Target, Settings, CreditCard, Filter } from 'lucide-react';
import TransactionTable from './TransactionTable';
import ChartSection from './ChartSection';
import FilterModal from './FilterModal';
import useFilters from '../../hooks/useFilters';

const Dashboard = ({ 
  transactions, 
  onUpdateTransaction, 
  onDeleteTransaction 
}) => {
  const [activeNav, setActiveNav] = useState('dashboard');

  // Utilisation du hook de filtrage
  const {
    filters,
    setFilters,
    isFiltersActive,
    setIsFiltersActive,
    isFilterModalOpen,
    setIsFilterModalOpen,
    filteredTransactions,
    categories,
    types,
    resetFilters,
    hasActiveFilters
  } = useFilters(transactions);

  // Calcul des statistiques sur les transactions filtrées
  const stats = useMemo(() => {
    if (!filteredTransactions.length) return {
      totalBalance: 0,
      averageMonthlyIncome: 0,
      averageMonthlyExpenses: 0,
    };

    // Grouper les transactions par mois
    const monthlyGroups = filteredTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          credits: [],
          debits: []
        };
      }
      
      if (transaction.montant >= 0) {
        acc[monthKey].credits.push(transaction.montant);
      } else {
        acc[monthKey].debits.push(Math.abs(transaction.montant));
      }
      
      return acc;
    }, {});

    const totalBalance = filteredTransactions.reduce((sum, t) => sum + t.montant, 0);

    const monthsCount = Object.keys(monthlyGroups).length || 1;
    
    const monthlyTotals = Object.values(monthlyGroups).map(month => ({
      totalCredit: month.credits.reduce((sum, amount) => sum + amount, 0),
      totalDebit: month.debits.reduce((sum, amount) => sum + amount, 0)
    }));

    const averageMonthlyIncome = monthlyTotals.reduce((sum, month) => 
      sum + month.totalCredit, 0) / monthsCount;

    const averageMonthlyExpenses = monthlyTotals.reduce((sum, month) => 
      sum + month.totalDebit, 0) / monthsCount;

    const sortedMonths = Object.keys(monthlyGroups).sort();
    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];

    let incomeChange = 0;
    let expensesChange = 0;

    if (currentMonth && previousMonth) {
      const currentMonthData = monthlyGroups[currentMonth];
      const previousMonthData = monthlyGroups[previousMonth];

      const currentIncome = currentMonthData.credits.reduce((sum, amount) => sum + amount, 0);
      const previousIncome = previousMonthData.credits.reduce((sum, amount) => sum + amount, 0);
      const currentExpenses = currentMonthData.debits.reduce((sum, amount) => sum + amount, 0);
      const previousExpenses = previousMonthData.debits.reduce((sum, amount) => sum + amount, 0);

      incomeChange = previousIncome === 0 ? 0 :
        ((currentIncome - previousIncome) / previousIncome) * 100;
      
      expensesChange = previousExpenses === 0 ? 0 :
        ((currentExpenses - previousExpenses) / previousExpenses) * 100;
    }

    return {
      totalBalance,
      averageMonthlyIncome,
      averageMonthlyExpenses,
      incomeChange,
      expensesChange
    };
  }, [filteredTransactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }).format(amount).replace('EUR', '€');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-900">FinCoach</h1>
        </div>
        <nav className="mt-4">
          {[
            { name: 'Dashboard', icon: Home, id: 'dashboard' },
            { name: 'Analytics', icon: Clock, id: 'analytics' },
            { name: 'Transactions', icon: FileText, id: 'transactions' },
            { name: 'Goals', icon: Target, id: 'goals' },
            { name: 'Settings', icon: Settings, id: 'settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left ${
                activeNav === item.id
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className={`h-4 w-4 mr-2 ${hasActiveFilters ? 'text-blue-500' : 'text-gray-500'}`} />
              {hasActiveFilters ? 'Filtres actifs' : 'Filtres'}
            </button>
          </div>

          {/* Filter Modal */}
          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            filters={filters}
            setFilters={setFilters}
            isFiltersActive={isFiltersActive}
            setIsFiltersActive={setIsFiltersActive}
            categories={categories}
            types={types}
            resetFilters={resetFilters}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Balance */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">Total Balance</h3>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {formatCurrency(stats.totalBalance)}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CreditCard className="w-6 h-6 text-blue-900" />
                </div>
              </div>
            </div>

            {/* Average Monthly Income */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">Avg Monthly Income</h3>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {formatCurrency(stats.averageMonthlyIncome)}
                  </p>
                  {stats.incomeChange !== 0 && (
                    <span className={`text-sm ${
                      stats.incomeChange >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stats.incomeChange >= 0 ? '↑' : '↓'} {Math.abs(stats.incomeChange).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Average Monthly Expenses */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">Avg Monthly Expenses</h3>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {formatCurrency(stats.averageMonthlyExpenses)}
                  </p>
                  {stats.expensesChange !== 0 && (
                    <span className={`text-sm ${
                      stats.expensesChange <= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stats.expensesChange >= 0 ? '↑' : '↓'} {Math.abs(stats.expensesChange).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Table */}
          <div className="space-y-6">
            <ChartSection 
              transactions={transactions}
              filteredTransactions={filteredTransactions} 
            />
            
            <TransactionTable
              transactions={filteredTransactions}
              onUpdateTransaction={onUpdateTransaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;