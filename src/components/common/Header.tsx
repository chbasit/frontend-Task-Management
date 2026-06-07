'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from './ThemeToggle';
import { colors } from '@/config/colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Header = React.memo(({ title, subtitle, actions }: HeaderProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className="border-b bg-white/95 backdrop-blur"
      style={{
        borderColor: colors.border,
      }}
    >
      <div
        className="mx-auto flex max-w-[1440px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        style={{ padding: '16px 32px' }}
      >     
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: colors.text }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-base font-medium" style={{ color: colors.textLight }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
          
          <div className="rounded-lg border bg-white px-4 py-2.5 text-left sm:text-right" style={{ borderColor: colors.border }}>
            <p className="text-sm font-semibold" style={{ color: colors.text }}>
              Welcome, {user?.name || 'User'}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: colors.textLight }}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
