import React from 'react';
import { Home, FileText, Settings, Sun, Moon } from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange, toggleTheme, theme }) => {
  const isDark = theme === 'dark';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900/50 backdrop-blur-sm shadow-lg border-r border-gray-200 dark:border-gray-800/50 transition-colors duration-200">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          CashFlow
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${currentPage === id 
                ? (isDark 
                    ? 'bg-gray-800/50 text-white' 
                    : 'bg-gray-100 text-gray-900')
                : (isDark 
                    ? 'text-gray-300 hover:bg-gray-800/30' 
                    : 'text-gray-600 hover:bg-gray-50')
              }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>

      {/* Theme Switch */}
      <div className="absolute bottom-6 left-0 w-full px-6">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDark
              ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4" />
              Mode Clair
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              Mode Sombre
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;