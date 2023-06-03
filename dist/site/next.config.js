/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  swcMinify: true,
  // assetPrefix: '/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
