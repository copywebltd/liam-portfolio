import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    // retired design explorations — anyone holding an old link lands on the real site
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v3/:path*", destination: "/", permanent: true },
      { source: "/v4", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
