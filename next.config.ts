import type { NextConfig } from "next";
import withPayload from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "payload",
    "@payloadcms/db-postgres",
    "@payloadcms/next",
    "drizzle-kit",
    "@esbuild/darwin-arm64",
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react-image-crop/dist/ReactCrop.css": false,
      };
    }
    return config;
  },
};

export default withPayload(nextConfig);
