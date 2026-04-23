# コメントスタイルガイドライン

React コンポーネントには以下のルールに従ってコメントを記述してください。

## コメントの基本ルール

### 0. コンポーネントファイルのヘッダー（必須）
`src/components/ui/**/index.tsx` には、ファイル先頭に以下のヘッダーコメントを追加してください。ライセンスの機械可読性を優先し、`SPDX-License-Identifier` を使用します。

```tsx
/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
```

補足:

- ルートの `LICENSE` と `NOTICE` を正本とします
- 旧来の `This file is part of Sparkle Design.` / `Modifications` ノートは新規追加しません
- ファイル固有の補足説明は、このヘッダーではなく通常の JSDoc やコードコメントで管理します

### 1. インターフェイスのプロパティ
各プロパティには **日本語のあとに `en:` を付けた英語を続ける** 形式で記述します。

```tsx
export interface ButtonProps {
  /**
   * ボタンを無効化するかどうか
   * en: Disables the button when set to true
   */
  isDisabled?: boolean;
}
```

### 2. コンポーネントの JSDoc
コンポーネントには以下のセクションを順序固定で使います。`概要` と `使用例` 以外は **書く価値があるときだけ** 書きます（既存 10 コンポーネント実測でアンチパターンは 7/10、アクセシビリティは 1/10 のみ）。**書くことが無いのに節だけ立てない** こと。

1. **概要 / Overview**（必須）— コンポーネントの目的と使用場面を日本語と英語で説明
2. **使用例 / Usage Example**（必須）— 実際の使用例をコードブロックで提示
3. **アンチパターン / Anti-patterns**（書く価値があるときだけ）— やってはいけない使い方とその理由。誤用が起きやすい場合のみ。`✅ Correct` / `❌ Wrong` のコード例を併記すると分かりやすい
4. **アクセシビリティ / Accessibility**（特殊な事情があるときだけ）— Radix primitive 等で a11y がデフォルト保証されている場合は **書かない**。`asChild` の制約や caller 側の責任で守る必要がある事項など、コンポーネント固有の a11y 注意点があるときだけ書く

最後に `@param {Props} props` を 1 行だけ書きます。

```tsx
/**
 * **概要 / Overview**
 *
 * - ボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。
 * - en: The Button component is used as a trigger for actions and events such as form submission, dialog expansion, action cancellation, and deletion execution.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Button variant="solid" size="md" theme="primary" prefixIcon="check">確定</Button>
 * ```
 *
 * **アンチパターン / Anti-patterns**
 *
 * - `<Icon>` を children として渡さないでください。`prefixIcon` / `suffixIcon` props を使用してください。
 *   en: Do not pass `<Icon>` as children. Use `prefixIcon` / `suffixIcon` props instead.
 *
 * **アクセシビリティ / Accessibility**
 *
 * - ボタンにはアクセシブルネームが必要です（通常は `children` のテキスト）。
 *
 * @param {ButtonProps} props
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);
```

### 3. JSDoc に書かないこと

以下はコンポーネント JSDoc には **書きません**。利用者にとって必要な情報ではないからです:

- **実装メモ / Implementation Note**: 「Radix を使っている」「内部で setTimeout している」など、内部実装の説明
- **依存ライブラリの説明**: 「@radix-ui/react-radio-group をベースにしている」等
- **代替候補 / 検討メモ**: 「将来 Tabs に置き換える可能性がある」等
- **コミット履歴やバージョン記述**: 「v1.5 で追加」等

これらは必要なら以下に分けて書きます:

- 内部実装の説明 → 該当コードの **インラインコメント**（`// ...` または `/* ... */`）
- 設計判断の経緯 → **PR 説明** や **CHANGELOG**
- 依存関係 → `package.json` や `item.json`

### 4. インラインコメント

コンポーネント本体の中にあるコード固有のコメントは JSDoc とは別に通常のコメントで書きます。日本語のあと `en:` プレフィックスで英語を続ける形式は維持します。

```tsx
// Radix RadioGroup は矢印キーでフォーカスのみ移動し選択は変わらない仕様。
// SegmentedControl は native HTML radiogroup と同じく「矢印キーで選択も
// 追従」させたいので、setTimeout 越しに active element の value を拾う。
// en: Radix moves focus on arrow keys but does not auto-select.
// Defer to next macrotask so we can read the new focus's value.
const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => { ... };
```

### 5. 注意点
- コンポーネントの使用例は実際に動作するコードを記述します
- 概要セクションの後に空行を1つ追加します
- コンポーネントの `@param` では型のみを記述し、詳細な説明は各プロパティのインターフェイスで行います
