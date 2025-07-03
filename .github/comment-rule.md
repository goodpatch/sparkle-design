React コンポーネントには以下のルールに従ってコメントを記述してください。

コメントは **日本語のあとに `en:` を付けた英語を続ける** 形式で一行ずつ記述します。
JSDoc スタイルでパラメータや戻り値の説明も記載してください。

```tsx
/**
 * ボタンをクリックするとフォーム送信やダイアログ表示などの処理を実行します。
 * en: This button triggers actions like form submission or dialog open.
 *
 * @param props.children ボタンに表示する内容
 * en: @param props.children Contents shown inside the button
 */
const Button = () => {
  return <button>ボタン</button>;
};
```
