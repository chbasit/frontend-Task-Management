'use client';

import React from 'react';
import { Card } from './Card';
import { colors } from '@/config/colors';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export const StatCard = React.memo(({
  label,
  value,
  icon,
  trend,
  color = colors.primary,
}: StatCardProps) => {
  return (
    <Card padding="lg" className="relative min-h-36 overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide" style={{ color: colors.textLight }}>
            {label}
          </p>
          <p
            className="mt-3 text-4xl font-bold tracking-tight"
            style={{ color: colors.text }}
          >
            {value}
          </p>
        </div>
        {icon && (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {icon}
          </span>
        )}
      </div>

      {trend && (
        <div
          className="mt-5 flex items-center gap-1 text-xs font-semibold"
          style={{
            color: trend.isPositive ? colors.success : colors.danger,
          }}
        >
          <span>{trend.isPositive ? '+' : '-'}</span>
          <span>{Math.abs(trend.value)}% from last month</span>
        </div>
      )}
    </Card>
  );
});

StatCard.displayName = 'StatCard';
