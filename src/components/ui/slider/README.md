# Slider

スライダーは任意の範囲の中からユーザーに特定の数値を選択してもらうために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Slider } from "sparkle-design/slider";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/slider.json
```

または npm パッケージとして `sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Slider
  aria-label="音量"
  value={[50]}
  onValueChange={setValue}
  min={0}
  max={100}
  step={1}
/>
```

## アクセシビリティ

名前や状態を持つのは `role="slider"` のつまみ（Thumb）です。`id` / `aria-label` / `aria-labelledby` / `aria-describedby` / `aria-invalid` は Root ではなくつまみに付与され、無効時は `aria-disabled` もつまみに付きます。

- 可視ラベルがない場合は `aria-label` で名前を付けてください。

  ```tsx
  <Slider aria-label="音量" defaultValue={[50]} />
  ```

- 可視ラベルがある場合は `aria-labelledby` でその要素を参照してください。

  ```tsx
  <span id="volume-label">音量</span>
  <Slider aria-labelledby="volume-label" defaultValue={[50]} />
  ```

- `FormHeader` + `FormControl` で包むと、ラベル（名前）・ヘルパーメッセージ / エラーメッセージ（説明）・`aria-invalid` が自動でつまみに関連付きます。

  ```tsx
  <FormItem>
    <FormHeader label="満足度" />
    <FormControl>
      <Slider
        value={[field.value]}
        onValueChange={([v]) => field.onChange(v)}
      />
    </FormControl>
    <FormHelperMessage>0〜100で選択してください</FormHelperMessage>
    <FormErrorMessage />
  </FormItem>
  ```

> **Note**: HTML の仕様上、`<label for>` は input / button などの labelable 要素にしか名前を与えず、`span[role="slider"]` のつまみには効きません。そのため Slider は `id` を受け取り `aria-label` / `aria-labelledby` が未指定のとき、その id を `htmlFor` で指す **id 付きの** `<label>` をマウント時に探して `aria-labelledby` に設定します。自前の `<label htmlFor>` を使う場合はラベルにも `id` を付けるか、`aria-labelledby` を明示してください。

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/slider)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-slider--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/slider)
