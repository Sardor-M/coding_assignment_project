import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PhotoInfoResponse } from '@/lib/api';

type PhotoState = {
    photo: PhotoInfoResponse | null;
    blobUrl: string | null;
    hasViewedPhoto: boolean;
    setPhoto: (photo: PhotoInfoResponse) => void;
    clearPhoto: () => void;
    setHasViewedPhoto: (v: boolean) => void;
    setBlobUrl: (blobUrl: string | null) => void;
};

/**
 * Photo store hook
 */
export const usePhotoStore = create<PhotoState>()(
    persist(
        set => ({
            photo: null,
            blobUrl: null,
            hasViewedPhoto: false,
            setPhoto: photo => set({ photo, hasViewedPhoto: true }),
            clearPhoto: () => set({ photo: null, hasViewedPhoto: false }),
            setHasViewedPhoto: (v: boolean) => set({ hasViewedPhoto: v }),
            setBlobUrl: (blobUrl: string | null) => set({ blobUrl }),
        }),
        {
            name: 'photo-storage',
        }
    )
);
