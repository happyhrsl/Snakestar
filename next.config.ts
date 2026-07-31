import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  allowedDevOrigins: ['.space-z.ai', '.z.ai', '21.0.21.28', 'preview-chat-40ff170d-15a6-422c-9a29-334372d4abc1.space-z.ai'],
};

export default nextConfig;
