/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // 如果图片来自外部域名，需要在这里添加
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig