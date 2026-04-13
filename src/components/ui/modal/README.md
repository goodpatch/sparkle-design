# Modal

モーダルはコンテンツに重ねられたウィンドウを介して、ユーザーの注意を特定の情報に集中させるために使用するコンポーネントです。

> **Client Component**: このコンポーネントは `"use client"` を含みます。Server Component から使う場合は個別 import を推奨します。
>
> ```tsx
> import { Modal } from "@goodpatch/sparkle-design/modal";
> ```

## インストール

```bash
npx shadcn@latest add https://sparkle-design.goodpatch.com/r/modal.json
```

または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。

## 使い方

```tsx
<Modal>
  <ModalTrigger>モーダルを開く</ModalTrigger>
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>タイトル</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <p>モーダルの内容</p>
    </ModalBody>
    <ModalFooter>
      <button>OK</button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

## 注意事項

- モーダルはコンテンツに重ねられたウィンドウを介して、ユーザーの注意を特定の情報に集中させるために使用するコンポーネントです。

## 関連リンク

- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/modal)
- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-modal--docs)
- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/modal)
