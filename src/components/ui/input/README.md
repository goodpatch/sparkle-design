# Input

インプットはテキストフィールドの形式でユーザーからの入力を取得するために使用するコンポーネントです。

> **Server Component 互換**: このコンポーネントは Server Component からそのまま利用できます。

## インストール

```bash
npx shadcn@latest add https://sparkle-design.vercel.app/r/input.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Input
  size="md"
  placeholder="テキストを入力"
  isTrigger
  triggerIcon="search"
/>
```

## 注意事項

- 無効状態は `isDisabled` を優先して使ってください。HTML 標準の `disabled` も互換のため受け付けますが、Sparkle Design のコードでは `isDisabled` に統一します。

## 関連リンク

- [Storybook](https://sparkle-design.vercel.app/storybook/index.html?path=/docs/components-input--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/input)
