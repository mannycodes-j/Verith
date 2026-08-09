import type { NextConfig } from "next";

const configuredBackendUrl =
  process.env.BACKEND_API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "http://localhost:4000";
const parsedBackendUrl = new URL(configuredBackendUrl);
if (!["http:", "https:"].includes(parsedBackendUrl.protocol)) {
  throw new Error("BACKEND_API_URL must use http or https.");
}
parsedBackendUrl.pathname = parsedBackendUrl.pathname
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/+$/, "");
parsedBackendUrl.search = "";
parsedBackendUrl.hash = "";
const backendOrigin = parsedBackendUrl.toString().replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendOrigin}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
