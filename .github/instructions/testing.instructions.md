---
applyTo: "**/*.test.tsx"
---

# Sparkle Design Component Testing Instructions

## Overview
このプロジェクトは Next.js + TypeScript + Vitest + Testing Library を使用した React コンポーネントライブラリです。すべてのコンポーネントに対して **t_wada さんのベストプラクティス**に従った堅牢なテストを作成・維持します。

## Testing Philosophy (t_wada Best Practices)
このプロジェクトでは、t_wada さんが提唱するテスト駆動開発とテスト設計のベストプラクティスを厳密に遵守します：

- **Intention-revealing**: テストの意図が明確に分かるテスト名と構造
- **Granular**: 細かい粒度でのテスト分割
- **Property-based**: コンポーネントのプロパティベースのテスト
- **Accessibility**: アクセシビリティの確認
- **Error/Edge cases**: エラーケースとエッジケースのカバレッジ
- **Maintainable**: 保守しやすく、リファクタリングに強いテスト
- **Reliable**: フレーキーでない、安定したテスト

## AI/Agent Testing Workflow
AI/エージェントがテスト結果を分析・修正する際は、以下のワークフローに従います：

### 1. 中間ログファイルへの出力
テスト実行結果は必ず中間ログファイルに出力してからAIが分析します：

```bash
# テスト実行結果をログファイルに出力
pnpm test > test-output.log 2>&1

# AI分析用の現在のテスト状況確認
pnpm test 2>&1 | tee current-test-status.log

# 特定の失敗したテストのみ抽出
grep -A 5 -B 5 "FAIL\|✗\|Error" test-output.log > test-failures.log
```

### 2. ログファイル分析パターン
AIは以下のパターンでログファイルを分析します：

```bash
# 失敗テスト数の確認
tail -20 test-output.log | grep -E "failed|passed|total"

# エラー詳細の抽出
grep -E "expect|received|AssertionError" test-output.log

# TypeScriptエラーの確認
grep -A 3 "TS[0-9]" test-output.log
```

### 3. ログファイルクリーンアップ
分析完了後は中間ログファイルを削除：

```bash
rm -f test-output.log current-test-status.log test-failures.log test-final.log
```

## Project Structure
```
src/
├── components/ui/
│   ├── [component]/
│   │   ├── index.tsx          # Component implementation
│   │   └── index.test.tsx     # Component tests
├── test/
│   └── helpers.ts             # Shared test helpers
```

## Test File Structure
各コンポーネントのテストファイルは以下の構造に従う：

```tsx
/**
 * @jest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TestContainer, EventHelpers, A11yHelpers, StyleHelpers } from '@/test/helpers'
import { ComponentName } from './index'

describe('ComponentName', () => {
  let testContainer: TestContainer

  beforeEach(() => {
    testContainer = new TestContainer()
    testContainer.setup()
  })

  afterEach(() => {
    testContainer.cleanup()
  })

  describe('Basic Rendering', () => {
    // 基本的なレンダリングテスト
  })

  describe('Variant Styling', () => {
    // バリアントスタイリングテスト
  })

  describe('User Interaction', () => {
    // ユーザーインタラクションテスト
  })

  describe('Accessibility', () => {
    // アクセシビリティテスト
  })

  describe('Edge Cases', () => {
    // エッジケーステスト
  })
})
```

### Required Test Environment Setup
各テストファイルで必須の設定：

1. **JSDoc environment directive**: `/** @jest-environment jsdom */`
2. **TestContainer setup/cleanup**: `beforeEach`/`afterEach`でのライフサイクル管理
3. **Helper imports**: 必要に応じて`StyleHelpers`, `EventHelpers`, `A11yHelpers`をimport

## Shared Test Helpers

### TestContainer
レンダリングとDOMクエリ用のヘルパークラス：
```tsx
testContainer.render(<Component />)
testContainer.queryInput()    // input要素を取得
testContainer.queryButton()   // button要素を取得
testContainer.getContainer()  // container要素を取得
```

### EventHelpers
イベント発火用のヘルパー：
```tsx
EventHelpers.click(element)        // クリックイベント
EventHelpers.change(input, value)  // 入力変更イベント
EventHelpers.keyDown(element, key) // キーダウンイベント
EventHelpers.focus(element)        // フォーカスイベント
```

### A11yHelpers
アクセシビリティチェック用のヘルパー：
```tsx
A11yHelpers.hasAriaLabel(element, label)
A11yHelpers.hasRole(element, role)
A11yHelpers.isDisabled(element)
```

### StyleHelpers
CSSクラステスト用のヘルパー：
```tsx
StyleHelpers.hasClass(element, className)           // 単一クラスの確認
StyleHelpers.hasClasses(element, classNames)        // 複数クラスの確認
StyleHelpers.getComputedStyleProperty(element, prop) // 計算済みスタイルの取得
```

## Component-Specific Guidelines

### Regular Components (Button, Input, Badge, etc.)
- 基本レンダリング
- バリアント（size, variant, status等）
- ユーザーインタラクション
- アクセシビリティ
- エラーハンドリング
- エッジケース

### Portal-based Components (Dialog, Modal, Select)
Portal コンポーネントは jsdom での直接テストが困難のため、`it.todo` を使用：
```tsx
describe('DialogComponent', () => {
  // Portal-based components are challenging to test with jsdom
  // due to portal rendering behavior and DOM limitations.

  it.todo('should render dialog with trigger button')
  it.todo('should open dialog when trigger is clicked')
  // ... その他のtodo
})
```

### Controlled Components
```tsx
it('supports controlled mode', () => {
  const handleChange = vi.fn()
  testContainer.render(<Component value="test" onChange={handleChange} />)
  const input = testContainer.queryInput()

  EventHelpers.change(input, 'new value')

  expect(handleChange).toHaveBeenCalled()
})
```

## CVA (Class Variance Authority) Testing
このプロジェクトは CVA + TailwindCSS を使用しているため、実際のクラス名をテストする：

❌ **Wrong** - 存在しないクラス名
```tsx
expect(element.className).toContain('invalid')
```

✅ **Correct** - 実際のCVAクラス名
```tsx
expect(element.className).toContain('border-negative-500')
```

### CVA Testing Best Practices
CVAで定義されたvariantsの実際のクラス名を確認してテストすること：

```tsx
// CVA定義例
const buttonVariants = cva("base-classes", {
  variants: {
    size: {
      sm: "h-8 px-2.5 py-1",
      md: "h-10 px-3 py-2",
      lg: "h-12 px-3.5 py-2.5",
    }
  }
})

// テスト例
describe('Size Variants', () => {
  it('applies small size classes', () => {
    testContainer.render(<Button size="sm">Small</Button>)
    const button = testContainer.queryButton()

    // CVAで定義された実際のクラス名をテスト
    expect(StyleHelpers.hasClass(button, 'h-8')).toBe(true)
    expect(StyleHelpers.hasClass(button, 'px-2.5')).toBe(true)
  })
})
```

## Common Patterns

### Size Variants
```tsx
describe('Size Variants', () => {
  it('applies medium size by default', () => {
    testContainer.render(<Component />)
    const element = testContainer.getContainer().firstElementChild
    expect(element?.className).toContain('h-6') // 実際のサイズクラス
  })

  it('applies small size correctly', () => {
    testContainer.render(<Component size="sm" />)
    const element = testContainer.getContainer().firstElementChild
    expect(element?.className).toContain('h-5')
  })
})
```

### Event Handling
```tsx
describe('Event Handling', () => {
  it('handles click events properly', () => {
    const handleClick = vi.fn()
    testContainer.render(<Component onClick={handleClick} />)
    const element = testContainer.queryButton()

    EventHelpers.click(element)

    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Error States
```tsx
describe('Error Handling', () => {
  it('handles invalid input gracefully', () => {
    testContainer.render(<Component isInvalid />)
    const element = testContainer.getContainer().firstElementChild

    expect(element?.className).toContain('border-negative-500')
  })
})
```

## Debugging Failed Tests

### 1. ログファイル出力でテスト結果を確認（AI向け推奨プロセス）
AIがテスト結果を確認する際は、必ず中間ファイルに出力して詳細分析を行う：

```bash
# 全テスト結果を中間ファイルに出力
pnpm test > test-results.log 2>&1

# 特定コンポーネントのテスト結果を分析
pnpm test src/components/ui/button/index.test.tsx > button-test.log 2>&1

# 失敗したテストの詳細を抽出
grep -A 10 -B 5 "FAIL\|AssertionError" test-results.log

# テスト結果のサマリーを確認
tail -20 test-results.log
```

**重要**: コンソール出力は不安定なため、AIは必ずファイル出力を使用してテスト結果を分析する。

### 2. 実際のDOM構造を確認
```tsx
console.log(testContainer.getContainer().innerHTML)
console.log(element.className)
```

### 3. CVA出力の確認
実際に適用されるクラス名を確認してテスト期待値を調整

### 4. イベントハンドリングの確認
- キーボードイベント vs クリックイベント
- React合成イベント vs ネイティブイベント
- Controlled vs Uncontrolled コンポーネント

### 5. AI向けデバッグワークフロー
1. `pnpm test > results.log 2>&1` でテスト結果をファイル出力
2. ログファイルを読み取って失敗テストを特定
3. 失敗原因を分析（CVAクラス名、イベントハンドリング、DOM構造等）
4. テストまたは実装を修正
5. 再度テスト実行して改善を確認
6. 中間ログファイルをクリーンアップ

## Common Issues & Solutions

### act() Warnings
```
Warning: The current testing environment is not configured to support act(...)
```
→ EventHelpersがact()でラップしているため動作に問題なし

### Portal Component Testing
Portal系コンポーネントは`it.todo`で説明付きスキップ

### Japanese Text in Tests
日本語のaria-labelや表示テキストに対応：
```tsx
expect(button.getAttribute('aria-label')).toContain('パスワード')
```

### Disabled Element Behavior
Disabledな要素でもプログラマティックな値設定は可能なため、disabled属性自体をテスト：
```tsx
expect(input.disabled).toBe(true)
```

### Keyboard Navigation in jsdom
jsdomではブラウザの標準的なキーボードナビゲーション（Enter/Spaceキーからのclickイベントトリガー）が動作しない。以下のようにテストする：

❌ **Wrong** - jsdomで動作しないパターン
```tsx
EventHelpers.keyDown(button, 'Enter')
expect(handleClick).toHaveBeenCalled() // 失敗する
```

✅ **Correct** - キーボードイベント自体をテスト
```tsx
EventHelpers.keyDown(button, 'Enter')
expect(handleKeyDown).toHaveBeenCalled()
```

### Icon Component Testing
Iconコンポーネントには`data-icon`属性は存在しない。実際の構造でテストする：

❌ **Wrong** - 存在しない属性
```tsx
const icon = container.querySelector('[data-icon="plus"]')
```

✅ **Correct** - 実際のDOM構造
```tsx
const icon = container.querySelector('span[aria-hidden="true"]')
expect(icon?.textContent).toBe('plus')
```

### Empty Test Files
空のテストファイルはVitest実行時にエラーとなる。最低限のテスト構造を含める：
```tsx
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('should be implemented', () => {
    expect(true).toBe(true)
  })
})
```

## Test Execution
```bash
# 全テスト実行
pnpm test

# 特定ファイルのテスト
pnpm test src/components/ui/button/index.test.tsx

# ウォッチモード
pnpm test --watch
```

## Quality Goals
- **高いテストカバレッジ**: 主要機能の90%以上
- **堅牢性**: 実装変更に強いテスト
- **保守性**: 理解しやすく修正しやすいテスト
- **実用性**: 実際のバグを捕捉できるテスト
