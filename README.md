# ryokuhoen-corporate

株式会社 緑歩園 コーポレートサイト（本番ドメイン ryokuhoen.co.jp は取得手続き中。現在はプレビュー段階・noindex）

- Next.js 16（App Router / webpack モード）+ TypeScript + Tailwind v4
- 起動: `npm run build` → `npm run start`（http://localhost:3100）／開発: `npm run dev`
- 画像再生成: `npm run images`（元写真は読み取りのみ。public/images に web 用コピーを書き出す）
- スクリーンショット: サーバー起動中に `npm run shots <prefix>` → `_review/`（端末の Edge を使用）

## OneDrive 対策（重要）
`node_modules` と `.next` は OneDrive 外の `C:\Users\user\.local-build\ryokuhoen-corporate\` へのジャンクション。
`npm install` を実行するとジャンクションが実フォルダに置き換わることがあるので、その場合は
中身を上記フォルダへ移し、ジャンクションを張り直す。Turbopack はプロジェクト外を指すリンクを拒否するため、dev/build は `--webpack`。

## 公開（GitHub Pages）— 2026-09-19 追記

- 静的書き出し（`output: "export"`）。`npm run build` → `out/` が公開物。`npm run start` は `out/` を 3100 で配信するだけ。
- 画像は `scripts/build-variants.mjs` がビルド前に幅別 WebP（`public/_img/`、git管理外）を生成し、`lib/image-loader.ts` が参照する。
- ユーザー提供の原画像は `assets-src/`（チャット添付の一時フォルダから退避済み）。
- `.github/workflows/deploy.yml` が main への push で Pages へ公開。リポジトリの Variables で切替:
  - `SITE_URL`（既定 https://ryokuhoen.co.jp）
  - `ALLOW_INDEX` … 本番公開の承認後に `true`（それまで noindex）
  - `FORM_ENABLED` … info@ryokuhoen.co.jp の転送（ImprovMX）が動いてから `true`。formsubmit.co は初回送信が有効化メールになるので、公開前に一度テスト送信する。
- 予定: GitHub 組織 `ryokuhoen` にリポジトリを作成 → ドメイン ryokuhoen.co.jp（Xserver）を apex で設定。Xserver DNS は CAA 非対応なので証明書が進まなければ CLAUDE.md の手順どおりに対処。
