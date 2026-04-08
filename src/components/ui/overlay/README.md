# Overlay

オーバーレイはシステムのモードが切り替わったことを伝えるために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Overlay } from "@goodpatch/sparkle-design/overlay";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.vercel.app/r/overlay.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Overlay />
```

## 関連リンク

- [Storybook](https://sparkle-design.vercel.app/storybook/index.html?path=/docs/components-overlay--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/overlay)
