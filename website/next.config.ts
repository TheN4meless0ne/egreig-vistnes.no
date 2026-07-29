import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? undefined : "/absproxy/3000",
  assetPrefix: isProd ? undefined : "/absproxy/3000",
  allowedDevOrigins: ["code.egreig-vistnes.no"],
  
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL || "http://localhost:5001"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;