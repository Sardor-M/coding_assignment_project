/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: '*.picsum.photos',
            },
        ],
    },
    transpilePackages: ['@repo/ui'],
    typescript: {
        ignoreBuildErrors: true,
    },
    // Silence workspace root warning when multiple lockfiles exist
    outputFileTracingRoot: path.join(process.cwd(), '../../'),
};

export default nextConfig;
