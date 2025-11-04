/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  // Silence workspace root warning when multiple lockfiles exist (Next 16)
  turbopack: {
    root: path.join(process.cwd(), '../../')
  }
};

export default nextConfig;
