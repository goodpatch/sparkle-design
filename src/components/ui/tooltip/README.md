# Tooltip

ツールチップは情報を一時的に補足するために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Tooltip } from "@goodpatch/sparkle-design/tooltip";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.vercel.app/r/tooltip.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Tooltip>
  <TooltipTrigger>Tooltip Trigger</TooltipTrigger>
  <TooltipContent>Tooltip Content</TooltipContent>
</Tooltip>
```

## 関連リンク

- [Storybook](https://sparkle-design.vercel.app/storybook/index.html?path=/docs/components-tooltip--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/tooltip)
