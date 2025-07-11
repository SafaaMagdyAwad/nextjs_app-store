import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com',
      }
      ,
      {
        protocol:'https',
        hostname:'platform-lookaside.fbsbx.com',
      }
    ],
  },
};

export default nextConfig;
