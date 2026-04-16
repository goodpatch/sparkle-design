# Radio

ラジオボタンは単一選択の形式でユーザーからの入力を取得するために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Radio } from "sparkle-design/radio";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/radio.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Radio value="option1" onValueChange={setValue}>
  <RadioItem value="option1" label="オプション1" />
  <RadioItem value="option2" label="オプション2" />
</Radio>
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/radio)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-radio--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/radio)
