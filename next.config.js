/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // 如果图片来自外部域名，需要在这里添加
  },
  async redirects() {
    return [
      {
        source: '/projects/:path*',
        destination: '/404',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'path',
            // 更新已定义的项目路由列表
            not: '^(web-ide|tum-sysprog)$'
          }
        ]
      },
    ];
  },
}

module.exports = nextConfig