# Card

カードはコンテンツをグルーピングして表示するために使用するコンポーネントです。

> **Server Component 互換**: このコンポーネントは Server Component からそのまま利用できます。

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/card.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<ClickableCard onClick={() => console.log('Clicked')}>
  クリック可能なカードです
</ClickableCard>
```

## 注意事項

- CardHeader 内で手動の flex レイアウト（`<div className="flex justify-between">`）を使わないでください。CardHeader は内部で flex レイアウトを適用済みです。アクションボタンは `CardControl` で囲んでください。

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/card)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-card--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/card)
