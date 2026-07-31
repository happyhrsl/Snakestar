import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow preview panel and any external host to load dev resources
  allowedDevOrigins: [
    "preview-chat-40ff170d-15a6-422c-9a29-334372d4abc1.space-z.ai",
    ".space-z.ai",
    ".z.ai",
  ],
};

export default nextConfig;
