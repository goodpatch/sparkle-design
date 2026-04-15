# Slider

スライダーは任意の範囲の中からユーザーに特定の数値を選択してもらうために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Slider } from "sparkle-design/slider";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/slider.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Slider
  value={[50]}
  onValueChange={setValue}
  min={0}
  max={100}
  step={1}
/>
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/slider)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-slider--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/slider)
