import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/media/**', // Allow all paths under /media
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**', // Allow all paths
      },
    ],
  },
};

export default nextConfig;
