'use client';

import { useEffect, useState } from 'react';

export const useIsMobile = (breakpointPx = 768) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
        setIsMobile(mq.matches);

        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        if (mq.addEventListener) {
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        } else {
            // Safari fallback
            mq.addListener(handler);
            return () => mq.removeListener(handler);
        }
    }, [breakpointPx]);

    return isMobile;
};
