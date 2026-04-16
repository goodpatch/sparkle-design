# Checkbox

チェックボックスは複数のオプショングループから複数の項目を選択する形式でユーザーからの入力を取得するために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Checkbox } from "sparkle-design/checkbox";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/checkbox.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Checkbox size="md" label="利用規約に同意する" />
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/checkbox)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-checkbox--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/checkbox)
