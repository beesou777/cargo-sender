import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    domains:['cdn.sanity.io','i.postimg.cc'],
  },
};

export default nextConfig;
