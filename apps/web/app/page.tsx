'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button, LoadingWrapper } from '@repo/ui';
import { fetchPhotoInfo } from '@/lib/api';
import { usePhotoStore } from '@/lib/store';
import { useIsMobile } from '@/app/utils/isMobileView';

export default function HomePage() {
    const router = useRouter();
    const { photo: storedPhoto, setPhoto, setBlobUrl, hasViewedPhoto } = usePhotoStore();

    const [isNavigating, setIsNavigating] = useState(false);
    const [isDebouncing, setIsDebouncing] = useState(false);
    const [randomId] = useState(() => Math.floor(Math.random() * 100));
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isMobileView = useIsMobile(768);

    const { data: photo, isLoading } = useQuery({
        queryKey: ['photo', randomId],
        queryFn: () => fetchPhotoInfo(randomId),
        enabled: !storedPhoto,
    });

    useEffect(() => {
        if (hasViewedPhoto) {
            router.push('/result');
        }
    }, [hasViewedPhoto, router]);

    const bgPhoto = storedPhoto || photo;

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    const handleViewPhoto = useCallback(() => {
        if (isDebouncing || isNavigating) return;

        setIsDebouncing(true);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(async () => {
            setIsDebouncing(false);
            setIsNavigating(true);

            try {
                /* we always fetch  a new random photo when user clicks next button */
                const newRandomId = Math.floor(Math.random() * 100);
                const nextPhoto = await fetchPhotoInfo(newRandomId);

                if (nextPhoto) {
                    setPhoto(nextPhoto);
                    setBlobUrl(nextPhoto.blobUrl ?? null);

                    router.push('/result');
                } else {
                    console.error('No photo returned from API');
                    setIsNavigating(false);
                }
            } catch (error) {
                console.error('Failed to fetch next photo:', error);
                setIsNavigating(false);
            }
        }, 400);
    }, [setPhoto, setBlobUrl, router, isDebouncing, isNavigating]);

    // const handleViewPhoto = useCallback(() => {
    //     if (!bgPhoto || isDebouncing || isNavigating) return;

    //     // Start debounce loading animation
    //     setIsDebouncing(true);

    //     // Clear any existing timeout
    //     if (debounceTimeoutRef.current) {
    //         clearTimeout(debounceTimeoutRef.current);
    //     }

    //     // Debounce for 800ms to prevent rapid clicks
    //     debounceTimeoutRef.current = setTimeout(() => {
    //         setIsDebouncing(false);
    //         setIsNavigating(true);

    //         // Additional delay for navigation animation
    //         setTimeout(() => {
    //             setPhoto(bgPhoto);
    //             setBlobUrl(bgPhoto.blobUrl);
    //             router.push('/result');
    //         }, 500);
    //     }, 800);
    // }, [bgPhoto, setPhoto, router, isDebouncing, isNavigating]);

    if (isLoading) {
        return <LoadingWrapper />;
    }

    return (
        <>
            {/* Full background image */}
            {bgPhoto && (
                <>
                    <div
                        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${bgPhoto.download_url})`,
                            zIndex: 1,
                        }}
                    />
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        style={{ zIndex: 2 }}
                    />
                </>
            )}

            <div className="relative z-10 h-full flex flex-col pt-[52px] md:pt-[72px]">
                {/* Main content area */}
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="text-center w-full max-w-md px-4">
                        <h1 className="text-[28px] md:text-5xl font-bold text-white mb-8">
                            안녕하세요
                            <br />
                            {bgPhoto?.author || '지원자 이름'}입니다.
                        </h1>
                    </div>
                </div>

                <div className="flex justify-center pb-8 px-5 md:px-4">
                    {isMobileView ? (
                        <div className="w-full max-w-md">
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleViewPhoto}
                                isLoading={isDebouncing || isNavigating}
                                disabled={!bgPhoto}
                                fullWidth={true}
                            >
                                다음
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full max-w-md pr-10 pl-10">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleViewPhoto}
                                isLoading={isDebouncing || isNavigating}
                                disabled={!bgPhoto}
                                fullWidth={true}
                            >
                                다음
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
