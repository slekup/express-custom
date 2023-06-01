/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // assetPrefix: './',
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
};

module.exports = nextConfig;
