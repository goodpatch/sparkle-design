---
applyTo: "**"
---

# 新規コンポーネントの作成

新規コンポーネントは以下の手順で作成してください。

1. ターミナルで`./scripts/setup.sh <コンポーネント名>`を実行します。
   - `<コンポーネント名>`は、作成するコンポーネントの名前に置き換えてください。
   - 例: `./scripts/setup.sh my-new-component`
   - このスクリプトは、必要なファイルとディレクトリを自動的に生成し、`src/index.ts` への export 追加も自動で行います。
   - ただし、使えるコンポーネント名は shadcn/ui に存在するもののみになります。
2. 生成されたディレクトリに移動します。
   - 例: `cd src/components/ui/my-new-component`
3. コンポーネントの説明を入力します。
4. コンポーネントフォルダの `README.md` を更新します。
   - `item.json` の description を記載する
   - `"use client"` の有無に応じて Client Component / Server Component 互換の記述を更新する
   - Client Component の場合は個別 import パス（`sparkle-design/<component-name>`）を記載する
   - 実装完了後に `node scripts/generate-readmes.mjs` で再生成することもできます
5. ルートの `README.md` の「コンポーネント公開状況」を最新の状態に更新します。

# 生成のルール

コメントに関するルールは `docs/ai-instructions/comment-style.md` を参照してください。
