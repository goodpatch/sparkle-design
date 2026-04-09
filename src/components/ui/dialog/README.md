# Dialog

ダイアログはユーザーにアクションの実行や中断を確認するために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Dialog } from "@goodpatch/sparkle-design/dialog";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/dialog.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Dialog>
  <DialogTrigger>ダイアログを開く</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>確認</DialogTitle>
      <DialogDescription>本当に削除しますか？</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogCancel>キャンセル</DialogCancel>
      <DialogAction>削除</DialogAction>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/dialog)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-dialog--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/dialog)
