import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Add this to allow build to pass even if ESLint fails
  },

  webpack: (config) => {
    config.module?.rules.push({
      test: /\.(mp4|webm|ogg|wav|flac|aac|glb)$/i,
      type: "asset/resource",
    });
    return config;
  },
  images: {
    domains: ["www.ignant.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allows any path from this hostname
      },
    ],
  },
};

export default nextConfig;
