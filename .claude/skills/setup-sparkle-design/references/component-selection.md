# Sparkle Design コンポーネント選択ルール

## 優先順位

UI コンポーネントは以下の優先順位で選択する:

1. **Sparkle Design コンポーネント**（`@goodpatch/sparkle-design`）
2. **shadcn/ui コンポーネント**（Sparkle Design が提供していないもののみ）
3. **独自実装**（上記で対応できない場合のみ）

---

## 新規 UI を実装するとき

1. まず Sparkle Design のコンポーネント一覧を確認する（`references/component-catalog.md` や Storybook）
2. 該当コンポーネントがあればそれを使う
3. なければ shadcn/ui を確認し、使う場合は Sparkle Design トークンに統一する
4. shadcn/ui 由来の以下のトークンは使わない:
   - `text-muted-foreground` -> `text-text-low`
   - `bg-background` -> `bg-white` or `bg-neutral-50`
   - `font-medium` -> `character-*` utility
   - `hover:bg-accent` -> `hover:bg-neutral-50`

---

## 「Sparkle Design に統一したい」と言われたとき

既存コンポーネントを以下の手順で置き換える:

### Step 1: 置き換え対象の一覧化

プロジェクト内の `src/components/` を走査し、Sparkle Design で置き換え可能なコンポーネントを一覧化する。

```bash
# shadcn/ui コンポーネントの検出
ls src/components/ui/

# shadcn/ui 既定トークンの使用箇所を検出
npx --yes sparkle-design-cli check src --format json
```

### Step 2: 優先度順に置き換えを提案

基本コンポーネントから着手する:
1. Button, IconButton
2. Input, Select, Checkbox, Radio
3. Card, Dialog, Modal
4. Tag, Badge
5. その他

### Step 3: 各コンポーネントの置き換え

1. **import 元を変更**
   ```tsx
   // Before
   import { Button } from "@/components/ui/button";

   // After
   import { Button } from "@goodpatch/sparkle-design";
   ```

2. **shadcn/ui 既定トークンを Sparkle Design トークンに置き換え**
   ```tsx
   // Before
   <CardDescription className="text-sm text-muted-foreground">

   // After
   <CardDescription className="character-3-regular-pro text-text-low">
   ```

3. **Typography を `character-*` utility に統一**
   - 素の `text-sm` / `leading-*` / `tracking-*` 組み合わせを廃止
   - Sparkle Design の `character-*-pro` / `character-*-mono` に置き換え

4. **不要になった旧コンポーネントファイルを削除**
   - `src/components/ui/` 内の shadcn/ui ソースコピーを削除
   - ただし Sparkle Design にないコンポーネントは残す

### Step 4: 品質チェック

```bash
# アンチパターン検査
npx --yes sparkle-design-cli check src --format json

# ビルド確認
pnpm type-check && pnpm build
```

---

## shadcn/ui トークン -> Sparkle Design トークン対応表

| shadcn/ui | Sparkle Design | 用途 |
|-----------|---------------|------|
| `text-muted-foreground` | `text-text-low` | 補足テキスト |
| `bg-background` | `bg-white` | 背景 |
| `border-border` | `border-divider-middle` | 区切り線 |
| `hover:bg-accent` | `hover:bg-neutral-50` | ホバー背景 |
| `text-sm` | `character-2-regular-pro` | テキストサイズ |
| `font-medium` | `character-*-bold-pro` | テキストウェイト |
