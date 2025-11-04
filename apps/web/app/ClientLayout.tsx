'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Providers } from './providers';
import { Header } from '@repo/ui';
import { useIsMobile } from '@/app/utils/isMobileView';

export default function ClientLayout({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile(768);
    const pathname = usePathname();
    const isRoot = pathname === '/';

    const containerClass = !isMobile
        ? 'flex flex-col h-screen'
        : isRoot
            ? 'flex flex-col h-screen overflow-hidden'
            : 'flex flex-col min-h-screen overflow-auto';

    const headerClass = isMobile && !isRoot ? 'sticky' : 'absolute';
    const wrapperInnerClass = !isMobile ? 'h-full' : isRoot ? 'h-full' : 'flex-1';
    const mainClass = !isMobile
        ? 'w-full flex flex-col bg-white relative h-full overflow-hidden'
        : isRoot
            ? 'w-full flex flex-col bg-white relative h-full overflow-hidden'
            : 'w-full flex flex-col bg-white relative min-h-full overflow-auto';

    return (
        <Providers>
            <div className={containerClass}>
                <Header className={`${headerClass} top-0 left-0 right-0 z-50`} />
                <div className={wrapperInnerClass}>
                    <main className={mainClass}>{children}</main>
                </div>
            </div>
        </Providers>
    );
}
