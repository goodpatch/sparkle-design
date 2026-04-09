# Toast

トーストはアクションの発生時にユーザーへフィードバックを行うために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Toast } from "@goodpatch/sparkle-design/toast";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/toast.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<>
  <Toaster />
  <Button onClick={() => toast({
    title: "保存しました",
    description: "1件の変更が反映されました",
  })}>
    トーストを表示
  </Button>
</>
```

## 関連リンク

- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-toast--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/toast)
