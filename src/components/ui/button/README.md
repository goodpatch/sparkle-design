# Button

ボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Button } from "@goodpatch/sparkle-design/button";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/button.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Button variant="solid" size="md" theme="primary" prefixIcon="check">確定</Button>
```

## 注意事項

- `asChild` 使用時は `prefixIcon` / `suffixIcon` / `isLoading` が反映されません。必要ならスロット先でアイコンやローディング表現を構成してください。
- `asChild` を使う場合、子要素がボタン相当のセマンティクス（role/disabled/キーボード操作）を満たすようにしてください。

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/button)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-button--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/button)
