# Overlay

オーバーレイはシステムのモードが切り替わったことを伝えるために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Overlay } from "sparkle-design/overlay";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/overlay.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Overlay />
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/overlay)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-overlay--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/overlay)
