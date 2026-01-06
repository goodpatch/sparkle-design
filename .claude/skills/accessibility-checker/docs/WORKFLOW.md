# Workflow (accessibility-checker)

このドキュメントは `accessibility-checker` の運用手順（レビュー→修正→検証→ステータス更新）を、段階的開示できる形でまとめたものです。

関連:

- スキル本体: `../SKILL.md`
- プロジェクト方針: `./PROJECT_POLICY.md`
- チェックリスト: `../assets/checklist.csv`

---

## 1. スコープの確定

最初に「何をもって完了とするか」を確定します。

- 対象: コンポーネント単体 / ストーリー / ページ / PR
- 対象状態: default / hover / active / disabled / loading / error 等
- 証跡ソース:
  - Storybook（推奨）
  - unit test
  - 実装コード
  - PR差分

---

## 2. チェックリストの読み替え（このプロジェクトの方針を反映）

`checklist.csv` の各行を **Pass / Fail / N/A / Needs review** で評価します。

### デザインシステム（Figma）保証の扱い

このプロジェクトでは、色/コントラスト関連（例: 1.4.1 / 1.4.3 / 1.4.11）は **原則としてFigma側で保証**します。

- レポート上は Pass としてよい
- Evidence には以下のように書く
  - "Design-system guaranteed (Figma). No code-level action required unless token deviation exists."
- ただし、以下の場合は Needs review（またはFail）
  - デザイントークンから逸脱している（独自色指定、強い上書き、外部ライブラリ由来のスタイルなど）
  - 状態（disabled/hover/active/loading 等）を独自に構築しており保証範囲外に見える

---

## 3. レビュー（Evidenceを残す）

チェック項目ごとに、次のどれで確認したかを記録します。

- 実装コード: どのファイル/どの条件分岐/どの属性で担保しているか
- Storybook: story名 + 再現手順
- テスト: どのテストで何を担保しているか

### Evidence の最低要件（推奨）

- ファイルパス（例: `src/components/ui/button/index.tsx`）
- 状態（例: loading/disabled）
- 何が担保されているか（例: aria-busy、アクセシブルネーム維持）

---

## 4. 修正（最小変更 + 非破壊的改善）

- 互換性を壊さずに直せるものを優先
- 「事故りやすいAPI」は削除よりも **段階的deprecation** を優先（詳細は `PROJECT_POLICY.md`）

例: WCAG 2.5.2 Pointer Cancellation

- `onMouseDown` / `onPointerDown` / `onTouchStart` の常用を避ける
- `@deprecated` + dev warning + docs で誘導する（段階的開示）

---

## 5. 検証

- 追加/更新したテストが通ること
- Storybookで想定状態が確認できること（可能なら）
- 検証できない項目は Needs review として残す

---

## 6. ステータス更新（READMEなど）

### 対象

`sparkle-design/README.md` の「コンポーネント対応状況」表（`A11y チェック`列）を更新します。

### ✅ にしてよい条件（推奨）

- チェックリストのうち、そのコンポーネントに適用される項目が **Fail なし**
- Needs review が残る場合は、以下のどちらか
  - それが **プロジェクト方針上の設計保証**（Figma保証など）として説明できる
  - もしくは、そのコンポーネント単体では検証できず、別スコープで追うべきだと明確にできる

### ❌ のままにする条件（例）

- 主要な操作（キーボード操作/アクセシブルネーム/disabled/loading 等）に Fail がある
- Evidence が不足しており、確認が終わっていない（= Needs review が実質的に未完了）

### ステータス更新の証跡（最低限）

READMEのステータスを変えるPRには、以下のどれかを添付（またはリンク）します。

- PR貼り付け用のレビューまとめMarkdown（例: `docs/pr/*.md`）
- 実行したテスト（例: `vitest run --project unit ...`）
- 参照したStory一覧

---

## 7. 変更点の共有（短いまとめ）

- 何を直したか（アクセシブルネーム、状態通知、deprecated誘導など）
- 何を確認したか（テスト/Story）
- 何が未確認か（Needs review）
