import React from 'react';
import { Loading } from './loading/loading';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading,
            fullWidth = false,
            children,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

        const variantStyles = {
            primary: 'bg-[#111111] text-white hover:bg-gray-800 active:bg-black',
            secondary: 'bg-white text-[#111111] hover:bg-gray-50 active:bg-gray-100',
        };

        const sizeStyles = {
            sm: 'px-4 py-2 text-[14px] rounded-xl',
            md: 'px-5 py-[17px] text-[15px] rounded-xl h-[46px]',
            lg: 'px-12 py-8 text-[24px] rounded-xxl h-[56px] min-w-[120px]',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
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
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
