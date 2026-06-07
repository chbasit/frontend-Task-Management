'use client';

import React from 'react';
import { colors } from '@/config/colors';
import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const sizeStyles: Record<string, string> = {
  sm: 'min-h-9 px-3 py-1.5 text-sm',
  md: 'min-h-11 px-4 py-2.5 text-sm',
  lg: 'min-h-12 px-5 py-3 text-base',
};

// Helper function to get button styles based on variant
const getButtonStyles = (variant: string) => {
  const baseClasses = 'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  switch (variant) {
    case 'primary':
      return { base: baseClasses + ' text-white', hasCustomStyle: true };
    case 'secondary':
      return { base: baseClasses + ' text-white', hasCustomStyle: true };
    case 'danger':
      return { base: baseClasses + ' text-white', hasCustomStyle: true };
    case 'success':
      return { base: baseClasses + ' text-white', hasCustomStyle: true };
    case 'outline':
      return { base: baseClasses + ' bg-transparent', hasCustomStyle: true };
    default:
      return { base: baseClasses, hasCustomStyle: false };
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className,
      disabled,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const buttonStyles = getButtonStyles(variant);
    
    const getInlineStyle = (): React.CSSProperties => {
      const baseStyle: React.CSSProperties = {
        ...style,
      };

      if (variant === 'primary') {
        return {
          ...baseStyle,
          backgroundColor: isLoading ? colors.primaryDark : colors.primary,
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1)',
        };
      } else if (variant === 'secondary') {
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.1)',
        };
      } else if (variant === 'danger') {
        return {
          ...baseStyle,
          backgroundColor: colors.danger,
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.1)',
        };
      } else if (variant === 'success') {
        return {
          ...baseStyle,
          backgroundColor: colors.success,
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)',
        };
      } else if (variant === 'outline') {
        return {
          ...baseStyle,
          borderColor: colors.primary,
          color: colors.primary,
          border: `2px solid ${colors.primary}`,
        };
      }

      return baseStyle;
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonStyles.base,
          sizeStyles[size],
          className
        )}
        style={getInlineStyle()}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = colors.primaryDark;
            e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(59, 130, 246, 0.2)';
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = colors.secondaryDark;
            e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(139, 92, 246, 0.2)';
          } else if (variant === 'danger') {
            e.currentTarget.style.backgroundColor = colors.dangerDark;
            e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(239, 68, 68, 0.2)';
          } else if (variant === 'success') {
            e.currentTarget.style.backgroundColor = colors.successDark;
            e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(16, 185, 129, 0.2)';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = colors.primaryLight;
          }
        }}
        onMouseLeave={(e) => {
          const inlineStyle = getInlineStyle();
          Object.assign(e.currentTarget.style, inlineStyle);
        }}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
