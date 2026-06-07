'use client';

import React from 'react';
import { AppShell } from '@/components/common';

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
