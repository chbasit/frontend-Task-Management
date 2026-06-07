'use client';

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from './Card';
import { colors } from '@/config/colors';

interface ChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  type?: 'line' | 'bar' | 'pie';
}

export const Chart = React.memo(({ title, data, type = 'line' }: ChartProps) => {
  const chartColors = [colors.primary, colors.secondary, colors.success, colors.warning];

  const customTooltip = {
    contentStyle: {
      backgroundColor: colors.background,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '12px',
    },
    labelStyle: { color: colors.text, fontWeight: '600' },
    wrapperStyle: { outline: 'none' },
  };

  return (
    <Card padding="lg" className="min-h-[380px] hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold mb-6 tracking-tight" style={{ color: colors.text }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} opacity={0.3} />
            <XAxis dataKey="name" stroke={colors.textLight} style={{ fontSize: '12px' }} />
            <YAxis stroke={colors.textLight} style={{ fontSize: '12px' }} />
            <Tooltip {...customTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              strokeWidth={2.5}
              dot={{ fill: colors.primary, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        ) : type === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} opacity={0.3} />
            <XAxis dataKey="name" stroke={colors.textLight} style={{ fontSize: '12px' }} />
            <YAxis stroke={colors.textLight} style={{ fontSize: '12px' }} />
            <Tooltip {...customTooltip} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar 
              dataKey="value" 
              fill={colors.primary} 
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill={colors.primary}
              dataKey="value"
              isAnimationActive={true}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip {...customTooltip} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
});

Chart.displayName = 'Chart';
