import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PhotoInfoResponse } from '@/lib/api';

type PhotoState = {
    photo: PhotoInfoResponse | null;
    hasViewedPhoto: boolean;
    setPhoto: (photo: PhotoInfoResponse) => void;
    clearPhoto: () => void;
};

/**
 * Photo store hook
 */
export const usePhotoStore = create<PhotoState>()(
    persist(
        set => ({
            photo: null,
            hasViewedPhoto: false,
            setPhoto: photo => set({ photo, hasViewedPhoto: true }),
            clearPhoto: () => set({ photo: null, hasViewedPhoto: false }),
        }),
        {
            name: 'photo-storage',
        }
    )
);
