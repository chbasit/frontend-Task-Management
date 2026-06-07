'use client';

import React from 'react';
import { colors } from '@/config/colors';
import { cn } from '@/utils/helpers';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
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
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 resize-vertical',
            'focus:outline-none',
            error
              ? `border-[${colors.danger}]`
              : `border-[${colors.border}]`
          )}
          style={{
            borderColor: error ? colors.danger : colors.border,
            color: colors.text,
            backgroundColor: colors.background,
            minHeight: '100px',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.primary;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? colors.danger : colors.border;
          }}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
