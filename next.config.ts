import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig, { dev, isServer }) {
    // 只在开发环境和客户端启用 wdyr
    if (dev && !isServer) {
      const originalEntry = config.entry as () => Promise<{ [key: string]: string[] }>;
      config.entry = async () => {
        const entries = await originalEntry();
        // 在应用入口之前注入 wdyr
        if (
          entries['main-app'] && 
          !entries['main-app'].includes('./src/wdyr.ts')
        ) {
          entries['main-app'].unshift('./src/wdyr.ts');
        }
        return entries;
      };
    }

    return config;
  },
  // 其他配置项...
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
