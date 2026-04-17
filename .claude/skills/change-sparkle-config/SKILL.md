---
name: change-sparkle-config
description: >
  **導入済みの sparkle-design プロジェクト**で、ユーザーが目指したい「雰囲気」や「トーン」を
  自然言語で伝えたら、`sparkle.config.json` の primary / font-pro / font-mono / radius を
  書き換えて `sparkle-design-cli generate` まで実行するスキル。選択肢は Sparkle Design
  Theme Settings Figma プラグインが扱える範囲（primary 7 色 / radius 6 段階 / fonts 11 種）
  に揃えているので、Figma 側と CLI 側の見た目がずれません。**未導入プロジェクトの初期
  セットアップは `setup-sparkle-design` の役割なのでそちらを使うこと。**
  「雰囲気を変えたい」「もっとポップに」「ビジネスライクに」「高級感を出したい」
  「やさしい印象」「ミニマルに」「primary カラーを変えたい」「角丸をもっと丸く」
  「フォントを変えたい」「テーマを提案して」「sparkle.config.json を書き換えて」
  などで発動する。English: "change the vibe", "make it more playful",
  "make it more business-like", "adjust the theme", "change primary color",
  "change fonts", "update sparkle.config.json".
---

# Skill: change-sparkle-config

プロジェクトの `sparkle.config.json` を「言葉で伝えた雰囲気」から書き換え、`sparkle-design-cli generate` まで走らせて見た目を一発で更新するスキル。

**前提**:

- プロジェクトに既に `sparkle-design` / `sparkle-design-cli` が導入済み（未導入の場合は `setup-sparkle-design` スキルを先に使うよう案内する）
- 書き換え可能な項目は **Sparkle Design Theme Settings Figma プラグインが扱える範囲と同一**（後述の reference 参照）

---

<!-- ========== AI アシスタント向け指示 ========== -->

## AI アシスタントへの指示

### 実行方針

1. **前提チェック**
   - カレントディレクトリに `sparkle.config.json` があるか確認。無ければ setup が終わっていない合図なので `setup-sparkle-design` スキルの利用を案内して中断。
   - `package.json` の `dependencies` / `devDependencies` に `sparkle-design` が含まれるか確認（pnpm workspace 等で hoist されているケースに備え、`node_modules` のパスチェックは避ける）。未導入なら setup を案内して中断。
2. **現在値を読み取り**
   - `sparkle.config.json` を **`JSON.parse` で読み**、現在の `primary` / `font-pro` / `font-mono` / `radius` / `extend.*` とそれ以外のユーザー独自キーを把握。
   - ファイル末尾の改行・インデント幅（スペース 2 / 4 / タブ）も記録しておき、書き込み時に元の体裁を維持する。
   - JSONC（コメント付き）の場合はコメントを壊す可能性があるため、**中断してユーザーにマニュアル更新を促す**（勝手に剥がさない）。
3. **ユーザー要望の解釈**
   - 要望が曖昧なら **1 回だけ短く質問**。多段階問い合わせは禁止。質問例:「ポップ寄りと高級感寄りならどちらが近いですか？」
   - 要望を [references/vibe-mapping.md](references/vibe-mapping.md) の方針で解釈し、**下記「許可リスト」内の値だけ** で構成された案を作る。
4. **提案の提示（主案 1 本のみ）**
   - 現在値 → 提案値を 1 本の表で提示。`primary` / `font-pro` / `font-mono` / `radius` の 4 行のみ。
   - 理由を 1 行ずつ添える（「ポップさを出すため radius: md → xl」など）。
   - **主案は常に 1 本のみ。並列候補を並べない。** 必要に応じて「別案も出せます」と打診だけする（ユーザーから要求があったときだけ出す）。
5. **ユーザー確認**
   - 「この内容で書き換えて generate しますか？」と **1 回だけ** 尋ねる。OK なら 6 へ、調整要望なら 3 に戻る。
6. **書き込み前バリデーション（絶対実行）**
   - 提案する 4 値の各々について、**書き込み直前に** SKILL.md の「許可リスト」と照合する。
     - primary が許可リスト外 → 書き込み中断、別案を考え直す
     - font-pro / font-mono が許可リスト外、または pro/mono 可否に反する用途 → 書き込み中断
     - radius が許可リスト外 → 書き込み中断
   - このチェックをスキップしない。ステップ 3 のマッピングが保証にはならない。
7. **sparkle.config.json を書き換え（最小差分）**
   - 手順: 現在値を `JSON.parse` → `primary` / `font-pro` / `font-mono` / `radius` の **4 キーだけ** を上書き → 元のインデント幅で `JSON.stringify`。
   - `extend.*` は全てそのまま保持。知らないトップレベルキーも保持。ユーザー独自の記述は何ひとつ削らない・並べ替えない。
8. **generate 実行と検証**
   - `npx --yes sparkle-design-cli generate` を実行。
   - exit code が 0 であること、`src/app/sparkle-design.css` と `src/app/SparkleHead.tsx`（または config で指定した出力先）が更新された mtime を持つことを確認。
   - 失敗した場合は書き換え前の `sparkle.config.json` に戻すか、エラー全文をユーザーに共有して手動対応を促す。
9. **完了報告**
   - 更新した 4 項目を箇条書きで表示。
   - SparkleHead がルートレイアウトに設置されていることを**プロジェクト内検索で一度確認**し、未設置が疑われるときだけ「`<SparkleHead />` を `<head>` に配置してください」と添える（毎回出すのは冗長）。

### 許可リスト（書き換え可能な値）

**絶対にここに無い値を書き込まないこと。** 外れた値を書いてしまうと Figma 側の theme-settings プラグインと CLI 側でずれて、`sparkle-design.css` の生成が崩れる可能性がある。

#### primary（7 色）

`blue` / `red` / `orange` / `green` / `purple` / `pink` / `yellow`

#### radius（6 段階）

`none` / `sm` / `md` / `lg` / `xl` / `full`

#### font-pro / font-mono（11 種、用途制限あり）

| フォント名 | pro 可 | mono 可 | 傾向 |
|---|---|---|---|
| `BIZ UDPGothic` | ✅ | ❌ | 日本語標準・可読性 |
| `BIZ UDGothic` | ❌ | ✅ | 日本語 mono / 等幅 |
| `Noto Sans JP` | ✅ | ✅ | 日本語定番 |
| `IBM Plex Sans JP` | ✅ | ✅ | やや硬め・クリーン |
| `Inter` | ✅ | ✅ | 英字モダン・中立 |
| `Roboto` | ✅ | ❌ | 英字 Google 標準 |
| `Roboto Mono` | ❌ | ✅ | 英字 mono |
| `Lato` | ✅ | ✅ | 英字やわらかめ |
| `Open Sans` | ✅ | ✅ | 英字ニュートラル |
| `Montserrat` | ✅ | ✅ | 英字モダン・やや強め |
| `Hiragino Sans` | ✅ | ✅ | 日本語 Apple 系 |

> `pro` 欄が ❌ のフォントを `font-pro` に、`mono` 欄が ❌ のフォントを `font-mono` に書かないこと。

### 雰囲気 → 値のマッピング（スピード判定用）

以下はよく出る要望の即答向け。ここに無い / 複数の雰囲気に跨る要望は **必ず [references/vibe-mapping.md](references/vibe-mapping.md) を読み**（8 パターン + 選定理由を含む）、最も近いものに寄せてから提案する。

| 雰囲気 | primary | radius | font-pro | font-mono |
|---|---|---|---|---|
| ポップ / 元気 | yellow / pink / orange | xl | Montserrat | Roboto Mono |
| ビジネスライク | blue | sm / md | Inter | Roboto Mono |
| 高級感 / フォーマル | purple | none / sm | IBM Plex Sans JP | Roboto Mono |

### やってはいけない

- **許可リストの外の値を書かない**（例: `primary: "teal"` や `font-pro: "Comic Sans"`）。ステップ 6 のバリデーションを必ず通す
- **主案を 2 本以上並べない**。ユーザーの意思決定コストが上がる。主案は 1 本のみ、別案は打診だけして求められたときに出す
- `sparkle.config.json` の `extend.*` や未知のトップレベルキーを勝手に消さない。書き換え対象は `primary` / `font-pro` / `font-mono` / `radius` の 4 キーだけ
- JSONC（コメント付き config）のコメントを破壊しない。コメントが検出できたら中断してユーザーに判断を仰ぐ
- `sparkle-design-cli generate` の実行をスキップしない。書き換えただけでは `sparkle-design.css` / `SparkleHead.tsx` は更新されない
- generate の exit code / 成果物 mtime の確認をスキップしない。失敗時は rollback またはユーザーに明示的にエスカレーション

---

## ユーザー向け説明

このスキルは、目指したい「雰囲気」や「トーン」を自然言語で伝えるだけで、`sparkle.config.json` の **primary カラー / フォント / 角丸** を書き換えて `sparkle-design.css` を再生成します。

使い方の例:

- 「もっとポップな雰囲気にして」
- 「ビジネスっぽく落ち着かせたい」
- 「primary を purple にして角丸も強めに」
- 「日本語が読みやすいフォント構成に切り替えたい」

書き換え前に必ず提案を出すので、内容を確認してから反映できます。選択肢は Figma の Sparkle Design Theme Settings プラグインと同じ集合なので、Figma / 実装の両方が同じテーマで揃います。
