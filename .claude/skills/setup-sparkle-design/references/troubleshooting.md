# Install Troubleshooting

`sparkle-design` を npm package として導入したときに起きやすい問題と、その回避策をまとめます。

## Next.js で `createContext is not a function`

### 原因

barrel export 経由の import では、各 component file の `"use client"` が効かず、Server Component から client component を読んだときに `createContext is not a function` が起きることがあります。

### 回避策

導入先 project に `"use client"` 付きの re-export file を作り、client component はそこから import します。

```tsx
"use client";

export { Button, Dialog, Input } from "sparkle-design";
```

Server Component ではこの wrapper をまたいで import せず、必要な箇所で client boundary を明示してください。

## TailwindCSS v4 でスタイルが適用されない

### 原因

TailwindCSS v4 は `node_modules` 内のクラスを自動スキャンしません。npm パッケージとして利用する場合、`@source` ディレクティブが必要です。

### 回避策

`sparkle-design-cli generate` で CSS を生成すると、`globals.css` に `@source` ディレクティブが自動挿入されます。`sparkle-design` はデフォルトで含まれるため、通常は追加設定不要です。

```bash
npx --yes sparkle-design-cli generate
```

生成後、`globals.css` に `@source` ディレクティブが含まれていることを確認してください。

## CSS が反映されない

### 原因

`globals.css` がルートレイアウトで import されていない。

### 回避策

ルートレイアウト（`src/app/layout.tsx` や `_app.tsx`）で `import "./globals.css"` を確認する。

## フォントウェイトが足りない

### 原因

デフォルトでは `[400, 700]` の 2 ウェイトのみ生成される。

### 回避策

`sparkle.config.json` の `extend.fonts` でフォントごとにウェイトを指定する。

```json
{
  "extend": {
    "fonts": {
      "pro": [
        { "family": "Montserrat", "weights": [400, 500, 600, 700] }
      ]
    }
  }
}
```

CSS を再生成: `npx --yes sparkle-design-cli generate`
