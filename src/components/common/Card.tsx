'use client';

import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
}

const paddingStyles = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const paddingValues = {
  sm: '12px',
  md: '16px',
  lg: '24px',
};

export const Card = React.memo(({
  children,
  className,
  padding = 'md',
  variant = 'default',
}: CardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg shadow-gray-200/50 border border-gray-100';
      case 'outlined':
        return 'bg-transparent border-2 border-gray-200';
      default:
        return 'bg-white border border-gray-100 shadow-sm shadow-gray-100/50';
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200 hover:shadow-md',
        paddingStyles[padding],
        getVariantStyles(),
        className
      )}
      style={{
        borderRadius: 8,
        padding: paddingValues[padding],
      }}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
