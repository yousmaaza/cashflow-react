import React from 'react';
import piggyBank from '../assets/piggy-bank.svg';

const Logo = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src={piggyBank} 
        alt="Cashflow App Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
