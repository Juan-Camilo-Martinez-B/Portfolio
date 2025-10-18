import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  id?: string;
  [key: string]: any;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'bordered',
  id,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-800 rounded-xl shadow-lg',
    bordered: 'bg-gray-800 border border-orange-500 rounded-xl shadow-lg',
    elevated: 'bg-gray-800 rounded-xl shadow-2xl border border-orange-500/50',
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
