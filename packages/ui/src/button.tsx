import React from 'react';
import { Loading } from './loading';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";

    const variantStyles = {
      primary: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-base rounded-lg min-w-[120px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loading
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm'}
              variant={variant === 'primary' ? 'white' : 'primary'}
              className="mr-2"
            />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
