import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
    authInterrupts: true,
    browserDebugInfoInTerminal: true,
    devtoolSegmentExplorer: true,
  },
};

export default nextConfig;
