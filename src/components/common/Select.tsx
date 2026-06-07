'use client';

import React from 'react';
import { colors } from '@/config/colors';
import { cn } from '@/utils/helpers';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className, ...props }, ref) => {
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
        <select
          ref={ref}
          className={cn(
            'min-h-11 w-full cursor-pointer rounded-lg border bg-no-repeat px-4 py-2.5 text-sm transition-all duration-200',
            'appearance-none focus:outline-none',
            error
              ? `border-[${colors.danger}]`
              : `border-[${colors.border}]`,
            className
          )}
          style={{
            borderColor: error ? colors.danger : colors.border,
            color: colors.text,
            backgroundColor: colors.background,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 14px center',
            paddingRight: '2.75rem',
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';
