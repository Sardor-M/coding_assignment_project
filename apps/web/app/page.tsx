'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button, Loading } from '@repo/ui';
import { fetchPhotoInfo } from '@/lib/api';
import { usePhotoStore } from '@/lib/store';

export default function HomePage(): JSX.Element {
  const router = useRouter();
  const { setPhoto, hasViewedPhoto } = usePhotoStore();
  const [isNavigating, setIsNavigating] = useState(false);
  const [randomId] = useState(() => Math.floor(Math.random() * 100));

  const { data: photo, isLoading } = useQuery({
    queryKey: ['photo', randomId],
    queryFn: () => fetchPhotoInfo(randomId),
  });

  useEffect(() => {
    if (hasViewedPhoto) {
      router.push('/result');
    }
  }, [hasViewedPhoto, router]);

  const handleViewPhoto = useCallback(() => {
    if (!photo) return;

    setIsNavigating(true);

    setTimeout(() => {
      setPhoto(photo);
      router.push('/result');
    }, 500);
  }, [photo, setPhoto, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loading size="lg" variant="primary" className="mx-auto mb-4" />
          <p className="text-gray-600">지원자분 성함을 적어주세요</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-gray-100">
      {/* Header text */}
      <div className="absolute top-6 left-0 right-0 px-4">
        <p className="text-sm text-gray-500 text-center">지원자분 성함을 적어주세요</p>
      </div>

      {/* Background image with overlay */}
      {photo && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${photo.download_url})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center w-full max-w-md px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
          안녕하세요<br />
          {'{지원자 이름}'}입니다.
        </h1>

        <Button
          variant="primary"
          size="lg"
          onClick={handleViewPhoto}
          isLoading={isNavigating}
          disabled={!photo}
        >
          다음
        </Button>
      </div>
    </main>
  );
}