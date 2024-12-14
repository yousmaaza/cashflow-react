import React from 'react';
import { Home, Clock, FileText, Target, Settings } from 'lucide-react';
import Logo from '../Logo';

const Sidebar = ({ currentPage, onPageChange }) => {
  console.log('Sidebar rendering, currentPage:', currentPage); // Debug log

  const menuItems = [
    { id: 'dashboard', icon: Home, text: 'Dashboard' },
    { id: 'analytics', icon: Clock, text: 'Analytics' },
    { id: 'transactions', icon: FileText, text: 'Transactions' },
    { id: 'goals', icon: Target, text: 'Goals' },
    { id: 'settings', icon: Settings, text: 'Settings' }
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
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
              className={`w-full flex items-center px-6 py-3 text-left ${isActive 
                ? 'bg-[#1a237e] text-white' 
                : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="ml-3">{item.text}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;