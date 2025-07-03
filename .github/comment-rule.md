React コンポーネントには以下のルールに従ってコメントを記述してください。

## コメントの基本ルール

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
コンポーネントには以下の構造で JSDoc を記述します：

- **概要 / Overview**: コンポーネントの目的と使用場面を日本語と英語で説明
- **プロパティ / Props**: `@param` を使用してプロパティの説明を日本語と英語で記述
- **使用例 / Usage Example**: 実際の使用例をコードブロックで提示

```tsx
/**
 * ## 概要 / Overview
 *
 * - ボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。
 * - en: The Button component is used as a trigger for actions and events such as form submission, dialog expansion, action cancellation, and deletion execution.
 *
 * ## プロパティ / Props
 *
 * @param props.asChild 子要素として別のコンポーネントを使うかどうか /
 * en: Whether to render as a child component
 * @param props.prefixIcon 左側に表示するアイコン名 /
 * en: Icon name shown on the left side
 * @param props.suffixIcon 右側に表示するアイコン名 /
 * en: Icon name shown on the right side
 * @param props.isLoading ローディング状態かどうか /
 * en: Whether the button is in a loading state
 * @param props.isDisabled ボタンを無効化するかどうか /
 * en: Whether the button is disabled
 *
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Button variant="solid" size="md" theme="primary" prefixIcon="check">確定</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);
```

### 3. 注意点
- 英語訳では `@param` などを繰り返さず、直前の日本語行をそのまま英訳します
- プロパティの説明は `/` で日本語と英語を区切ります
- コンポーネントの使用例は実際に動作するコードを記述します
- 概要セクションの後に空行を1つ追加します
