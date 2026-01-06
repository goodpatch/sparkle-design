# Button a11yレビュー（今回の対応まとめ / PR貼り付け用）

## 対象

- Component: `Button`
- 関連ファイル
  - `src/components/ui/button/index.tsx`
  - `src/components/ui/button/index.test.tsx`
  - `src/components/ui/button/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Skill: `.claude/skills/accessibility-checker/SKILL.md`
- Workflow: `.claude/skills/accessibility-checker/docs/WORKFLOW.md`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（例: 1.4.1 / 1.4.3 / 1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`

---

## チェック結果（抜粋）

> Result は `Pass / Fail / N/A / Needs review`。
> 本プロジェクトでは「Figma保証」の項目は、トークン逸脱が無い前提で Pass とし、Evidence に方針を記載します。

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | ネイティブ `<button>` を基本にレンダリング | `asChild` 利用時は子要素側のセマンティクスに依存（注意喚起あり） |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `focus-visible:ring-2 ... ring-offset-2` を付与 | — |
| 2.5.2 | ポインタ取消 | A | Downで確定しない/取消できる | Pass → 強化 | `onClick` ベース（releaseで確定） | `onMouseDown/onPointerDown/onTouchStart` を `@deprecated` + dev warn で段階的に抑止 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをnameに含む | Pass | 通常は `children` がアクセシブルネーム | loadingでもラベルを維持（後述） |
| 4.1.2 | 名前・役割・値 | A | name/role/状態が適切、状態変化でnameが落ちない | Fail → Fixed | loading時にnameが落ち得る問題を修正 | loading時も `children` をDOMに残し（`opacity-0`）、`aria-busy` を付与 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | `Spinner` が `role="status"` + `aria-label="読み込み中"` | 状態に応じてテキスト通知が必要なら別途検討 |
| 1.4.1 | 色の使用 | A | 色だけで情報を伝えない | Pass (Figma) | Design-system guaranteed (Figma) | トークン逸脱があれば `Needs review` |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラスト | Pass (Figma) | Design-system guaranteed (Figma) | トークン逸脱があれば `Needs review` |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスリング等 | Pass (Figma) | Design-system guaranteed (Figma) | トークン逸脱があれば `Needs review` |

---

## 対応内容（実装した変更）

### 1) loading時のアクセシブルネーム維持 + 状態明示

- `isLoading` の場合でも、ボタンのアクセシブルネームが落ちないように調整
  - 視覚的には `opacity-0` でラベルを隠すが、DOMには残す
- `aria-busy` を付与し、処理中状態を明示
- Spinnerはボタン中央に表示

該当: `src/components/ui/button/index.tsx`

### 2) `asChild` + disabled/loading のガード

- `asChild` 時に `disabled` 属性が使えないため、`aria-disabled` / `data-disabled` を付与
- disabled/loading中の activation を抑止するため、`onClick` / `onKeyDown` をラップして `preventDefault/stopPropagation`
- dev時に注意喚起（子要素がボタン相当のセマンティクスを担う必要がある）

該当: `src/components/ui/button/index.tsx`

### 3) a11yリスクの高いAPIを段階的に deprecated 化（WCAG 2.5.2）

- `onMouseDown` / `onPointerDown` / `onTouchStart` を `ButtonProps` に `@deprecated` として明示
- dev時に `console.warn` で `onClick`（release確定）への移行を促す

該当: `src/components/ui/button/index.tsx`

---

## テスト / 検証

- Unit test:
  - `vitest run --project unit src/components/ui/button/index.test.tsx`
  - 結果: PASS（`38 tests | 1 skipped`）
- 追加した担保（例）
  - `isLoading` で `aria-busy="true"`
  - children無しは dev warn
  - deprecatedなDown系ハンドラが渡されたら dev warn

---

## 補足（今後のフォローアップ候補）

- Storybook上での a11y addon（`@storybook/addon-a11y`）の自動検査をCIに組み込むなど、継続的な回帰検知の仕組み化
- `asChild` の利用ガイドラインをドキュメント化（許容する子要素/要件の明記）
