#!/bin/sh

# kebab-caseをPascalCaseに変換したものを変数に格納
# 例: button-group -> ButtonGroup
CAMEL_NAME=$(echo "$1" | awk -F '-' '{ for(i=1; i<=NF; i++) {printf toupper(substr($i,1,1)) substr($i,2)}} END {print ""}')

# Install by shadcn
npx shadcn@latest add $1
mkdir src/components/ui/$1
mv src/components/ui/$1.tsx src/components/ui/$1/index.tsx

# ファイル先頭に Copyright ヘッダーを挿入
HEADER_FILE="$(mktemp)"
printf '/**\n * Copyright 2026 Goodpatch Inc.\n * SPDX-License-Identifier: Apache-2.0\n */\n' > "$HEADER_FILE"
cat "src/components/ui/$1/index.tsx" >> "$HEADER_FILE"
mv "$HEADER_FILE" "src/components/ui/$1/index.tsx"

touch src/components/ui/$1/index.stories.tsx
echo "import type { Meta, StoryObj } from '@storybook/react';
import { $CAMEL_NAME } from './index';

const meta: Meta<typeof $CAMEL_NAME> = {
  title: 'Components/$CAMEL_NAME',
  component: $CAMEL_NAME,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // 引数の設定
  },
} satisfies Meta<typeof $CAMEL_NAME>;

export default meta;
type Story = StoryObj<typeof $CAMEL_NAME>;

export const Default: Story = {
  args: {
    // デフォルトの引数をここに設定
  },
};" > src/components/ui/$1/index.stories.tsx
touch src/components/ui/$1/item.json
echo "{
  \"\$schema\": \"https://ui.shadcn.com/schema/registry-item.json\",
  \"title\": \"$CAMEL_NAME\",
  \"name\": \"$1\",
  \"description\": \"\",
  \"type\": \"registry:component\",
  \"files\": [
    {
      \"path\": \"src/components/ui/$1/index.tsx\",
      \"type\": \"registry:component\"
    }
  ]
}" > src/components/ui/$1/item.json

# README.md
cat > "src/components/ui/$1/README.md" << ENDOFREADME
# $CAMEL_NAME

<!-- item.json の description をここに記載 -->

> **TODO**: \`"use client"\` の有無に応じて Client Component / Server Component 互換の記述を更新してください。

## インストール

\`\`\`bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/$1.json
\`\`\`

または npm パッケージとして \`sparkle-design\` をインストールしている場合はそのまま利用できます。

## 使い方

\`\`\`tsx
import { $CAMEL_NAME } from "sparkle-design";

<$CAMEL_NAME />
\`\`\`

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/$1)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-$1--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/$1)
ENDOFREADME

# src/index.ts にexportを追加（アルファベット順を維持）
EXPORT_LINE="export * from \"./components/ui/$1\";"
if ! grep -qF "$EXPORT_LINE" src/index.ts; then
  printf "%s\n" "$EXPORT_LINE" >> src/index.ts
  TEMP_FILE="$(mktemp)"
  grep -v '^export \* from "./components/ui/' src/index.ts > "$TEMP_FILE"
  grep '^export \* from "./components/ui/' src/index.ts | sort >> "$TEMP_FILE"
  mv "$TEMP_FILE" src/index.ts
  echo "Added export to src/index.ts"
fi
