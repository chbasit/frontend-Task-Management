'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3,
  BriefcaseBusiness,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/config/colors';
import { cn } from '@/utils/helpers';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/projects', label: 'Projects', icon: BriefcaseBusiness },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <aside
      className={cn(
        'sticky left-0 top-0 z-30 hidden h-screen shrink-0 border-r bg-white transition-all duration-300 lg:block',
        isOpen ? 'w-64' : 'w-20'
      )}
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center justify-between gap-3  px-4" style={{ borderColor: colors.border }}>
          <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
             
            {isOpen && (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold" style={{ color: colors.text }}>
                  Task Manager
                </p>
                <p className="truncate text-xs" style={{ color: colors.textLight }}>
                  Workspace
                </p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: colors.border, color: colors.textLight }}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {isOpen && (
          <div className="px-4 pt-5">
            <Link
              href="/tasks"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Task
            </Link>
          </div>
        )}

        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all duration-200',
                  isActive ? 'bg-blue-50 shadow-sm' : 'hover:bg-gray-50'
                )}
                style={{
                  backgroundColor: isActive ? colors.primaryLight : undefined,
                  color: isActive ? colors.primary : colors.text,
                }}
                title={!isOpen ? item.label : undefined}
              >
                <Icon size={20} className="shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4" style={{ borderColor: colors.border }}>
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            {isOpen && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold" style={{ color: colors.text }}>
                  {user?.name || 'User'}
                </p>
                <p className="truncate text-xs" style={{ color: colors.textLight }}>
                  {user?.role || 'Member'}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-red-100"
            style={{
              backgroundColor: colors.dangerLight,
              color: colors.danger,
            }}
            title={!isOpen ? 'Logout' : undefined}
          >
            <LogOut size={17} />
            {isOpen && 'Logout'}
          </button>
        </div>
      </div>
    </aside>
  );
};
