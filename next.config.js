/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // 如果图片来自外部域名，需要在这里添加
  },
  // 移除 redirects 配置，我们已经在 [id]/page.tsx 中处理了 404 路由
}

module.exports = nextConfig