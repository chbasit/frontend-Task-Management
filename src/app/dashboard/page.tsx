'use client';

import React from 'react';
import Link from 'next/link';
import { BriefcaseBusiness, Plus } from 'lucide-react';
import { Header, Chart } from '@/components/common';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  const taskChartData = [
    { name: 'Week 1', value: 12 },
    { name: 'Week 2', value: 19 },
    { name: 'Week 3', value: 15 },
    { name: 'Week 4', value: 25 },
    { name: 'Week 5', value: 22 },
  ];

  const projectChartData = [
    { name: 'Active', value: 30 },
    { name: 'Completed', value: 30 },
    { name: 'On Hold', value: 40 },
  ];

  return (
    <div>
      <Header
        title="Dashboard"
        actions={
          <>
            <Link
              href="/projects"
              className="inline-flex min-h-8 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              New Project
            </Link>
            <Link
              href="/tasks"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              
              Add Task <Plus size={17} />
            </Link>
          </>
        }
      />

      <div
        className="mx-auto max-w-[1440px] space-y-6"
        style={{ padding: '28px 32px' }}
      >
        <DashboardStats />
        <RecentActivity />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Chart
            title="Tasks Completed"
            data={taskChartData}
            type="line"
          />
          <Chart
            title="Project Status"
            data={projectChartData}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
}
