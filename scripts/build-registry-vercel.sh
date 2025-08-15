#!/bin/bash

# Vercel用の安全なレジストリビルドスクリプト
# Safe registry build script for Vercel

set -e  # エラーが発生したら停止

echo "🤖 Starting Vercel registry build..."

# Step 1: レジストリをマージ
echo "📝 Merging registry..."
node scripts/merge-registry.mjs

# Step 2: shadcnビルド
echo "🏗️  Building with shadcn..."
pnpm build:registry

# Step 3: public/r/ ディレクトリを作成（存在しない場合）
echo "📁 Ensuring public/r/ directory exists..."
mkdir -p ./public/r/

# Step 4: ファイルを安全にコピー
echo "📋 Copying files safely..."

if [ -f registry.json ]; then
    cp registry.json ./public/r/registry.json
    echo "✅ Copied registry.json"
else
    echo "⚠️  registry.json not found, skipping"
fi

if [ -f src/components/sparkle-color.json ]; then
    cp src/components/sparkle-color.json ./public/r/
    echo "✅ Copied sparkle-color.json"
else
    echo "⚠️  sparkle-color.json not found, skipping"
fi

if [ -f src/components/sparkle-font.json ]; then
    cp src/components/sparkle-font.json ./public/r/
    echo "✅ Copied sparkle-font.json"
else
    echo "⚠️  sparkle-font.json not found, skipping"
fi

if [ -f src/components/sparkle-style.json ]; then
    cp src/components/sparkle-style.json ./public/r/
    echo "✅ Copied sparkle-style.json"
else
    echo "⚠️  sparkle-style.json not found, skipping"
fi

# Step 5: Lint and format
echo "🔧 Running lint and format..."
pnpm lint:fix || echo "⚠️  Lint failed, continuing..."
pnpm format || echo "⚠️  Format failed, continuing..."

echo "🎉 Vercel registry build completed!"
