/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // assetPrefix: './',
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
