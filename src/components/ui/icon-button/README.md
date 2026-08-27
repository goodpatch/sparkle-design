# IconButton

アイコンボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { IconButton } from "sparkle-design/icon-button";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/icon-button.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<IconButton variant="solid" size="md" theme="primary" icon="edit" />
```

## 注意事項

- `asChild` を使う場合、差し込んだ要素の中身を保ったまま、その内側にアイコンが描画されます。無効化については、`aria-disabled` の付与と click / auxclick / Enter・Space の抑止をコンポーネント側で行います（差し込み先が native の `<button>` なら `disabled` 属性を渡します）。
- `asChild` 使用時、`type` / `form` / `value` など button 専用の props は、差し込み先が native の `<button>` のときだけ転送されます（`<a>` 等では不正な属性になるため落とし、dev ビルドで警告します）。差し込み先が内部で `<button>` を描画するコンポーネントの場合は、その要素側に直接指定してください。

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/icon-button)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-icon-button--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/icon-button)
