# Card

カードはコンテンツをグルーピングして表示するために使用するコンポーネントです。

> **Server Component 互換**: このコンポーネントは Server Component からそのまま利用できます。

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/card.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<ClickableCard onClick={() => console.log('Clicked')}>
  クリック可能なカードです
</ClickableCard>
```

## 注意事項

- ClickableCard は `<button>` を描画するため、内側では `<div>` / `<p>` / 見出し要素は使わないでください（phrasing content のみ許可）。`CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` で構成してください。ClickableCard の JSX 内に直接書いたものには自動で `as="span"` が付与されます。独自コンポーネントで包む場合は `as="span"` を明示してください。
- ClickableCard の内側では Button / IconButton / リンクなどの対話型要素（`CardControl` を含む）を使わないでください。ネストされた interactive 要素になり、アクセシビリティ違反になります。カード内に個別の操作が必要な場合は `Card` を使ってください。
- CardHeader 内で手動の flex レイアウト（`<div className="flex justify-between">`）を使わないでください。CardHeader は内部で flex レイアウトを適用済みです。アクションボタンは `CardControl` で囲んでください。

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/card)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-card--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/card)
