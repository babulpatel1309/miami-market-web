import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this app so Turbopack never guesses it from
    // sibling lockfiles elsewhere in the monorepo (e.g. other submodules).
    root: path.join(__dirname),
  },
};

export default nextConfig;
