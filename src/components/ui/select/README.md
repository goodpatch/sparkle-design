# Select

セレクトはオプショングループの中から値を選択する形式でユーザーからの入力を取得するために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Select } from "@goodpatch/sparkle-design/select";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/select.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Select>
  <SelectTrigger size="md">
    <SelectValue placeholder="選択してください" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">オプション1</SelectItem>
    <SelectItem value="option2">オプション2</SelectItem>
  </SelectContent>
</Select>
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/select)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-select--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/select)
