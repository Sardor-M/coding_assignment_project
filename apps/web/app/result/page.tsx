'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from '@/lib/store';
import { Button, InfoCard, LoadingWrapper } from '@repo/ui';
import Image from 'next/image';

export default function ResultPage() {
    const router = useRouter();
    const { photo, hasViewedPhoto, setHasViewedPhoto } = usePhotoStore();

    useEffect(() => {
        if (!hasViewedPhoto || !photo) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [hasViewedPhoto, photo, router]);

    if (!photo || !photo.download_url) {
        return <LoadingWrapper />;
    }

    const handleGoBack = () => {
        router.push('/');
        setHasViewedPhoto(false);
    };

    const infoFields = [
        { label: 'id', value: photo.id },
        { label: 'author', value: photo.author },
        { label: 'width', value: photo.width },
        { label: 'height', value: photo.height },
        { label: 'url', value: photo.url, isUrl: true, href: photo.url },
        { label: 'download_url', value: photo.download_url, isUrl: true, href: photo.download_url },
    ];

    return (
        <div className="w-full max-w-[375px] mx-auto md:max-w-none flex flex-col min-h-screen md:h-screen bg-neutral-50 md:bg-gray-100">
            {/* Background Image */}
            {photo && (
                <>
                    <div
                        className="fixed inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${photo.download_url})`,
                            zIndex: 1,
                        }}
                    />
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        style={{ zIndex: 2 }}
                    />
                </>
            )}
            {/* Content Container */}
            <div className="relative z-10 flex-1 flex flex-col md:justify-center px-1 pb-10 md:pb-8 md:px-8">
                {/* Mobile Layout */}
                <div className="flex flex-col gap-4 md:hidden pb-5 pt-10">
                    <div className="bg-white rounded-2xl overflow-hidden flex-shrink-0">
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

                    <InfoCard fields={infoFields} />
                </div>

                <div className="md:hidden relative bottom-0 left-0 right-0 z-20 mb-10">
                    <div className="max-w-[375px] mx-auto">
                        <Button variant="primary" onClick={handleGoBack} fullWidth={true}>
                            이전
                        </Button>
                    </div>
                </div>

                <div className="hidden md:flex lg:hidden flex-col items-center gap-6 max-w-3xl mx-auto w-full">
                    <div className="w-full">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
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
                    </div>

                    <div className="w-full">
                        <InfoCard fields={infoFields} />
                    </div>

                    <div className="flex justify-center w-full">
                        <Button
                            variant="primary"
                            onClick={handleGoBack}
                            size="md"
                            className="min-w-[120px]"
                        >
                            이전
                        </Button>
                    </div>
                </div>

                {/* Desktop Mode */}
                <div className="hidden lg:flex flex-row items-center gap-20 w-full">
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
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
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                        <InfoCard fields={infoFields} />
                        <div className="flex justify-center pt-4">
                            <Button variant="primary" onClick={handleGoBack} size="lg">
                                이전
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
