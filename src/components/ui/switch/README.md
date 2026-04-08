# Switch

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Switch } from "@goodpatch/sparkle-design/switch";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.vercel.app/r/switch.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Switch size="md" checked={isEnabled} onCheckedChange={setIsEnabled} />
```

## 関連リンク

- [Storybook](https://sparkle-design.vercel.app/storybook/index.html?path=/docs/components-switch--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/switch)
