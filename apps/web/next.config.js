/** @type {import('next').NextConfig} */

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
};

export default nextConfig;
