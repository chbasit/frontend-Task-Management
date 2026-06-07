'use client';

import React from 'react';
import { colors } from '@/config/colors';
import { cn } from '@/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="font-medium text-sm"
            style={{ color: colors.text }}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'min-h-11 w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200',
              'focus:outline-none',
              icon ? 'pl-10' : undefined,
              className
            )}
            style={{
              borderColor: error ? colors.danger : colors.border,
              color: colors.text,
              backgroundColor: colors.background,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary;
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(59, 130, 246, 0.1)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? colors.danger : colors.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-sm" style={{ color: colors.danger }}>
            {error}
          </span>
        ) : helperText ? (
          <span className="text-sm" style={{ color: colors.textLight }}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
