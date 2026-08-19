import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const proxyMode = process.env.NEXT_PROXY_MODE; // "absproxy" | "proxy" | undefined

const devPrefix = (() => {
  if (isProd || !proxyMode) return undefined;
  return proxyMode === "absproxy" ? "/absproxy/3000" : "/proxy/3000";
})();

// `absproxy` sets basePath, and Next prefixes next/link hrefs with basePath
// automatically. `proxy` only sets assetPrefix, covering /_next/*
// HREF links must be prefixed manually in dev mode
const routePrefix = !isProd && proxyMode === "proxy" ? devPrefix : undefined;

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // Inlined at build time so components can resolve internal hrefs.
  env: {
    NEXT_PUBLIC_ROUTE_PREFIX: routePrefix ?? "",
  },
  // basePath only needed for absproxy, which keeps the prefix in the URL
  basePath: proxyMode === "absproxy" ? devPrefix : undefined,
  assetPrefix: devPrefix,
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