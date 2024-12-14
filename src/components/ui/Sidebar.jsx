import React from 'react';
import { Home, Clock, FileText, Target, Settings } from 'lucide-react';
import Logo from '../Logo';

const Sidebar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, text: 'Dashboard', color: 'text-[#1a237e]' },
    { id: 'analytics', icon: Clock, text: 'Analytics', color: 'text-[#1a237e]' },
    { id: 'transactions', icon: FileText, text: 'Transactions', color: 'text-[#1a237e]' },
    { id: 'goals', icon: Target, text: 'Goals', color: 'text-[#1a237e]' },
    { id: 'settings', icon: Settings, text: 'Settings', color: 'text-[#1a237e]' }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-xl font-bold text-[#1a237e]">FinCoach</span>
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
              className={`w-full flex items-center px-6 py-3 ${isActive 
                ? 'bg-[#1a237e] text-white' 
                : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="ml-3">{item.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;