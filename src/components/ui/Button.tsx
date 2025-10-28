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
  const baseClasses = 'font-orbitron rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black';
  
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
    outline: 'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
    ghost: 'bg-transparent text-orange-500 hover:bg-orange-500/10',
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
