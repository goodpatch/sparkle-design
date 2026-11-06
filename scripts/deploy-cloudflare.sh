#!/bin/bash
# Storybook と shadcn レジストリをビルドし、Cloudflare Workers の静的アセットとしてデプロイする。
# Vercel のビルド（vercel.json の buildCommand）と同じものを作り、Next.js は使わない。
#
#   ./scripts/deploy-cloudflare.sh            # ビルドしてデプロイ
#   ./scripts/deploy-cloudflare.sh --dry-run  # ビルドして中身を確かめるだけ
#
# wrangler は Cloudflare の会社アカウントでログインしたものを使う（devDependencies には入れない）。
# en: Build Storybook + registry and deploy them as Workers static assets.
set -euo pipefail

case "${1:-}" in
  "") DRY_RUN=0 ;;
  --dry-run) DRY_RUN=1 ;;
  *)
    echo "使い方: $0 [--dry-run]" >&2
    exit 2
    ;;
esac
if [ "$#" -gt 1 ]; then
  echo "使い方: $0 [--dry-run]" >&2
  exit 2
fi

cd "$(dirname "$0")/.."
WRANGLER="npx --yes wrangler@4.158.0"
OUT=.cloudflare-assets

# scripts/build-registry-vercel.sh と同じ手順（最後の lint:fix / format は手元の作業ツリーを書き換えるので外す）
pnpm build:css
node scripts/build-sparkle-design-theme.mjs
node scripts/merge-registry.mjs
# shadcn build は public/r を空にしないので、消したコンポーネントが残らないよう先に消す
rm -rf public/r
pnpm build:registry
mkdir -p public/r
cp registry.json public/r/registry.json
cp src/components/sparkle-design-theme.json public/r/
pnpm run build-storybook

rm -rf "$OUT"
mkdir -p "$OUT"
cp -R public/storybook "$OUT/storybook"
cp -R public/r "$OUT/r"
cp cloudflare/_headers cloudflare/_redirects "$OUT/"

if [ ! -f "$OUT/storybook/index.html" ] || [ ! -f "$OUT/r/registry.json" ]; then
  echo "❌ storybook/index.html か r/registry.json がありません" >&2
  exit 1
fi

if [ "$DRY_RUN" = 1 ]; then
  $WRANGLER deploy --config cloudflare/wrangler.jsonc --dry-run
else
  $WRANGLER deploy --config cloudflare/wrangler.jsonc
fi
