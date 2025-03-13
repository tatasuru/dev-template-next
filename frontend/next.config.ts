import type { NextConfig } from "next";
import Icons from "unplugin-icons/webpack";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      })
    );
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend-container:8000/:path*",
      },
    ];
  },
  images: {
    domains: ["profile.line-scdn.net"], // LINE のプロフィール画像ドメインを許可リストに追加
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

export default nextConfig;
