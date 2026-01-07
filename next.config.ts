import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "delicious-indian-kitchen.sumupstore.com",
      },
      {
        protocol: "https",
        hostname: "sumupstore.com",
      }
    ],
  },
};

export default nextConfig;
