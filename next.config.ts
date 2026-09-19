import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages で公開するため静的書き出し（出力先 out/）
  output: "export",
  trailingSlash: true,
  // 別プレビューと並行ビルドする場合のみ NEXT_DIST_DIR で出力先を切替（既定は .next）
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // 幅別 WebP は scripts/build-variants.mjs がビルド前に生成する
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes: [256, 384],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
  },
  poweredByHeader: false,
};

export default nextConfig;
