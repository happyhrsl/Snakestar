import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  allowedDevOrigins: [
    // Exact preview domain from the error log
    "preview-chat-40ff170d-15a6-422c-9a29-334372d4abc1.space-z.ai",
    // Wildcard for any space-z.ai subdomain
    ".space-z.ai",
    ".z.ai",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
