import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  assetPrefix: isProd ? undefined : "/proxy/3000",
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
