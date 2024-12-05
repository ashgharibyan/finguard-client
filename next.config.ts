/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Disable static page generation
  // staticPageGenerationTimeout: 0,
  // Make all pages dynamic
  experimental: {
    // This prevents Next.js from attempting to fetch data during build time
    workerThreads: false,
    cpus: 1,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add these new configurations
  typescript: {
    // Skip type checking during build
    ignoreBuildErrors: true,
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Increase build timeout
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
