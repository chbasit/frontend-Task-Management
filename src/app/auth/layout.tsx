'use client';

import React from 'react';
import { colors } from '@/config/colors';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.neutral[50] }}
    >
      {children}
    </div>
  );
}
