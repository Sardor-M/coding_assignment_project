'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from '@/lib/store';
import { Button } from '@repo/ui';
import Image from 'next/image';

export default function ResultPage() {
    const router = useRouter();
    const { photo, hasViewedPhoto } = usePhotoStore();

    useEffect(() => {
        if (!hasViewedPhoto || !photo) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [hasViewedPhoto, photo, router]);

    if (!photo || !photo.download_url) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>잠시만 기다려주세요...</p>
            </div>
        );
    }

    const handleGoBack = () => {
        router.push('/');
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header text */}
                <div className="mb-4 md:mb-6">
                    <p className="text-sm text-gray-500">지원자분 성함을 적어주세요</p>
                </div>

                {/* Responsive layout: stacked on mobile, side-by-side on tablet+ */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Photo Section */}
                        <div className="w-full md:w-1/2">
                            <div className="relative w-full aspect-video bg-gray-200">
                                <Image
                                    src={photo.download_url}
                                    alt="Selected photo"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">id</p>
                                        <p className="font-medium text-black">{photo.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">author</p>
                                        <p className="font-medium text-black">{photo.author}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">width</p>
                                        <p className="font-medium text-black">
                                            {photo.width.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">height</p>
                                        <p className="font-medium text-black">
                                            {photo.height.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">url</p>
                                    <a
                                        href={photo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all text-sm block"
                                    >
                                        {photo.url}
                                    </a>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">download_url</p>
                                    <a
                                        href={photo.download_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all text-sm block"
                                    >
                                        {photo.download_url}
                                    </a>
                                </div>
                            </div>

                            {/* Previous Button */}
                            <div className="flex justify-end">
                                <Button variant="secondary" onClick={handleGoBack}>
                                    이전
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}