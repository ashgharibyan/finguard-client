/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Disable static page generation
  staticPageGenerationTimeout: 0,
  // Make all pages dynamic
  experimental: {
    // This prevents Next.js from attempting to fetch data during build time
    workerThreads: false,
    cpus: 1,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
