import React from 'react';

export type SkeletonProps = {
    className?: string;
    width?: string;
    height?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    width = 'w-full',
    height = 'h-4',
}) => {
    return <div className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`} />;
};

export const PhotoInfoSkeleton: React.FC = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Skeleton width="w-8" height="h-3" className="mb-2" />
                    <Skeleton width="w-16" height="h-4" />
                </div>
                <div>
                    <Skeleton width="w-12" height="h-3" className="mb-2" />
                    <Skeleton width="w-24" height="h-4" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Skeleton width="w-10" height="h-3" className="mb-2" />
                    <Skeleton width="w-20" height="h-4" />
                </div>
                <div>
                    <Skeleton width="w-12" height="h-3" className="mb-2" />
                    <Skeleton width="w-20" height="h-4" />
                </div>
            </div>

            <div>
                <Skeleton width="w-8" height="h-3" className="mb-2" />
                <Skeleton width="w-full" height="h-4" />
            </div>

            <div>
                <Skeleton width="w-24" height="h-3" className="mb-2" />
                <Skeleton width="w-full" height="h-4" />
            </div>
        </div>
    );
};
