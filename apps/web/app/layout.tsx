/// <reference types="react" />
/// <reference types="react-dom" />
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Frontend Assignment',
    description: 'Photo viewer application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactNode {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
