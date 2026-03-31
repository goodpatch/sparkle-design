# IconButton

アイコンボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { IconButton } from "@goodpatch/sparkle-design/icon-button";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.vercel.app/r/icon-button.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<IconButton variant="solid" size="md" theme="primary" icon="edit" />
```

## 関連リンク

- [Storybook](https://sparkle-design.vercel.app/storybook/index.html?path=/docs/components-icon-button--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/icon-button)
