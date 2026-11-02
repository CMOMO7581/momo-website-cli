import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes the whole site to out/.
  output: "export",
  // /zh/ is served as out/zh/index.html.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
