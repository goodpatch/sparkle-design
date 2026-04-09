# Form

フォームはフォームの入力要素・ラベル・ヘルパーテキストを包括して提供するために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Form } from "@goodpatch/sparkle-design/form";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/form.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Form {...form}>
  <FormField
    control={form.control}
    name="example"
    render={({ field, fieldState }) => (
      <FormItem>
        <FormHeader label="ラベル" />
        <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
        <FormControl>
          <Input
            placeholder="プレースホルダー"
            {...field}
            {...fieldState}
            isInvalid={fieldState.invalid}
          />
        </FormControl>
        <FormErrorMessage />
      </FormItem>
    )}
  />
</Form>
```

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/form)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-form--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/form)
