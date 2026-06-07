'use client';

import React from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { Sidebar } from './Sidebar';
import { colors } from '@/config/colors';

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen" style={{ backgroundColor: colors.neutral[50] }}>
        <Sidebar />
        <div className="min-w-0 flex-1">
          <main>{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
