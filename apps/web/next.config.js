/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  typescript: {
    strictNullChecks: true,
  },
};

module.exports = nextConfig;
