import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PhotoInfoResponse } from '@/lib/api';

type PhotoState = {
    photo: PhotoInfoResponse | null;
    blobUrl: string | null;
    hasViewedPhoto: boolean;
    setPhoto: (photo: PhotoInfoResponse) => void;
    setBlobUrl: (url: string | null) => void;
    setHasViewedPhoto: (value: boolean) => void;
    clearPhoto: () => void;
};

/**
 * Photo store hook
 */
export const usePhotoStore = create<PhotoState>()(
    persist(
        (set) => ({
            photo: null,
            blobUrl: null,
            hasViewedPhoto: false,
            setPhoto: (photo) => set({ photo, hasViewedPhoto: true }),
            setBlobUrl: (url) => set({ blobUrl: url }),
            setHasViewedPhoto: (value) => set({ hasViewedPhoto: value }),
            clearPhoto: () => set({ photo: null, blobUrl: null, hasViewedPhoto: false }),
        }),
        {
            name: 'photo-storage',
        }
    )
);
