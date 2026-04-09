# Breadcrumb

パンくずはユーザーが現在のページ階層を理解し、親の階層へ戻るためのナビゲーションとして機能するコンポーネントです。

> **Server Component 互換**: このコンポーネントは Server Component からそのまま利用できます。

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/breadcrumb.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Link</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/breadcrumb)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-breadcrumb--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/breadcrumb)
