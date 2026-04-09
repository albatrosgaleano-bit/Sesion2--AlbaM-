import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  allowedDevOrigins: ['192.168.1.15', 'localhost:3000'],
};

export default nextConfig;
