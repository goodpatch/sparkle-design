# Switch

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Switch } from "sparkle-design/switch";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/switch.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Switch size="md" checked={isEnabled} onCheckedChange={setIsEnabled} />
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/switch)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-switch--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/switch)
