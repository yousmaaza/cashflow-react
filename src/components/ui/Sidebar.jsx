import React from 'react';
import { Home, Clock, FileText, Target, Settings } from 'lucide-react';
import Logo from '../Logo';

const Sidebar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, text: 'Dashboard' },
    { id: 'analytics', icon: Clock, text: 'Analytics' },
    { id: 'transactions', icon: FileText, text: 'Transactions' },
    { id: 'goals', icon: Target, text: 'Goals' },
    { id: 'settings', icon: Settings, text: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Logo size="md" />
          <h1 className="text-2xl font-bold text-gray-900">FinCoach</h1>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center px-6 py-4 space-x-3 ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;