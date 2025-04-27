import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hitech-hh.com",
        pathname: "/**",
      },
    ],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  },
};

export default nextConfig;
