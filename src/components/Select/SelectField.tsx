import React from 'react';

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ value, onChange, options, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        block w-full px-3 py-2 text-sm
        border rounded-md shadow-sm
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        dark:focus:ring-blue-400 dark:focus:border-blue-400
        cursor-pointer
        transition-colors
      "
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
          "
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
