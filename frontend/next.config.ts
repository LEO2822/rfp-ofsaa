import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: [], // Add domains as needed
    unoptimized: false,
  },
};

export default nextConfig;
