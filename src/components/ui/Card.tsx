import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  id?: string;
  [key: string]: unknown;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'bordered',
  id,
  ...props
}) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300',
    bordered: 'bg-white dark:bg-gray-800 border border-orange-500 rounded-xl shadow-lg transition-colors duration-300',
    elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-orange-500/50 transition-colors duration-300',
  };

  return (
    <div 
      id={id}
      className={cn(variants[variant], className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
