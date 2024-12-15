import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeSwitch = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      }}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-gray-200" />
      ) : (
        <Sun className="w-4 h-4 text-white" />
      )}
      <span className={isDark ? 'text-gray-200' : 'text-white'}>
        Mode {isDark ? 'Sombre' : 'Clair'}
      </span>
    </button>
  );
};

export default ThemeSwitch;