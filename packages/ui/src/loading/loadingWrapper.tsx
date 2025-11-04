import React from 'react';
import { Loading } from './loading';

type FullPageLoadingProps = {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
};

export const LoadingWrapper: React.FC<FullPageLoadingProps> = ({
    message = '잠시만 기다려주세요...',
    size = 'lg',
}) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="text-center">
                <Loading size={size} variant="primary" className="mx-auto mb-4" />
                <p className="text-lg text-gray-700">{message}</p>
            </div>
        </div>
    );
};
