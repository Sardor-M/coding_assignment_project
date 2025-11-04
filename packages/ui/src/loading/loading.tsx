import React from 'react';

type LoadingProps = {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: 'primary' | 'secondary' | 'white';
};

export const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    className = '',
    variant = 'primary',
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-16 h-16 border-4',
    };

    const variantClasses = {
        primary: 'border-gray-800 border-t-transparent',
        secondary: 'border-gray-300 border-t-transparent',
        white: 'border-white border-t-transparent',
    };

    return (
        <div
            className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};
