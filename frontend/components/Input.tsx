// Input Component
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  ...props 
}) => {
  const hasError = !!error;
  
  const inputClasses = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    hasError 
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
  } ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input 
        {...props} 
        className={inputClasses} 
      />
      {helperText && !hasError && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;