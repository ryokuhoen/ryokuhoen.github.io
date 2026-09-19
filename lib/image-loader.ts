// next/image のカスタムローダー。scripts/build-variants.mjs が生成した幅別 WebP を返す。
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = src.match(/^\/images\/(.+)\.(jpe?g|png)$/i);
  if (!m) return src;
  return `/_img/${m[1]}-${width}.webp`;
}
