# InlineMessage

インラインメッセージはユーザーにシステムやサービスの状態を伝えるために使用するコンポーネントです。

> **Server Component 互換**: このコンポーネントは Server Component からそのまま利用できます。

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/inline-message.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<InlineMessage status="info" onClose={() => console.log('closed')}>
  <InlineMessageTitle>情報</InlineMessageTitle>
  <InlineMessageDescription>
    これは情報メッセージです。
  </InlineMessageDescription>
</InlineMessage>
```

## 関連リンク

- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-inline-message--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/inline-message)
