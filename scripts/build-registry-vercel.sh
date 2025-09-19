#!/bin/bash

# Vercel用の安全なレジストリビルドスクリプト
# Safe registry build script for Vercel

set -e  # エラーが発生したら停止

echo "🤖 Starting Vercel registry build..."

# Step 1: cssを生成
echo "🎨 Generate sparkle-design.css..."
npx sparkle-design-cli

# Step 2: registryのjsonに変換
echo "🎨 Generate sparkle-design-theme.json..."
node scripts/build-sparkle-design-theme.mjs

# Step 3: レジストリをマージ
echo "📝 Merging registry..."
node scripts/merge-registry.mjs

# Step 4: shadcnビルド
echo "🏗️  Building with shadcn..."
pnpm build:registry

# Step 5: public/r/ ディレクトリを作成（存在しない場合）
echo "📁 Ensuring public/r/ directory exists..."
mkdir -p ./public/r/

# Step 6: ファイルを安全にコピー
echo "📋 Copying files safely..."

if [ -f registry.json ]; then
    cp registry.json ./public/r/registry.json
    echo "✅ Copied registry.json"
else
    echo "⚠️  registry.json not found, skipping"
fi

if [ -f src/components/sparkle-design-theme.json ]; then
    cp src/components/sparkle-design-theme.json ./public/r/
    echo "✅ Copied sparkle-design-theme.json"
else
    echo "⚠️  sparkle-design-theme.json not found, skipping"
fi

# Step 7: Lint and format
echo "🔧 Running lint and format..."
pnpm lint:fix || echo "⚠️  Lint failed, continuing..."
pnpm format || echo "⚠️  Format failed, continuing..."

echo "🎉 Vercel registry build completed!"
