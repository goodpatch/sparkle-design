# Tabs

タブはユーザーが扱う情報をシンプルに保つためのディスクロージャーとして使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Tabs } from "@goodpatch/sparkle-design/tabs";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/tabs.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Tabs defaultValue="account">
  <TabsList variant="solid">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account Content</TabsContent>
  <TabsContent value="password">Password Content</TabsContent>
</Tabs>
```

## 関連リンク

- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-tabs--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/tabs)
