import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-orbitron rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black active:scale-95';
  
  const variants = {
    primary: 'bg-blue-500 dark:bg-orange-500 text-white hover:bg-blue-600 dark:hover:bg-orange-600 active:bg-blue-700 dark:active:bg-orange-700',
    secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-400 dark:active:bg-gray-600',
    outline: 'bg-transparent border border-blue-500 dark:border-orange-500 text-blue-500 dark:text-orange-500 hover:bg-blue-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white active:bg-blue-600 dark:active:bg-orange-600 active:text-white dark:active:text-white',
    ghost: 'bg-transparent text-blue-500 dark:text-orange-500 hover:bg-blue-500/10 dark:hover:bg-orange-500/10 active:bg-blue-500/20 dark:active:bg-orange-500/20',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
