# 雰囲気 → sparkle.config.json マッピング

`change-sparkle-config` スキルが参照する拡張マッピング。`SKILL.md` 本体の 3 行代表例で足りないときに、ここを参照して近い雰囲気に当てはめる。

## 許可リスト（必ずここから選ぶ）

**SKILL.md の許可リストと同一**。reference 単独参照でも自己完結できるよう再掲する:

- **primary**: `blue` / `red` / `orange` / `green` / `purple` / `pink` / `yellow`
- **radius**: `none` / `xs` / `sm` / `md` / `lg` / `xl` / `2xl` / `3xl`
- **font-pro**（proportional 用途 OK なもの）: `BIZ UDPGothic` / `Noto Sans JP` / `IBM Plex Sans JP` / `Inter` / `Roboto` / `Lato` / `Open Sans` / `Montserrat` / `Hiragino Sans`
- **font-mono**（monospace 用途 OK なもの）: `BIZ UDGothic` / `Noto Sans JP` / `IBM Plex Sans JP` / `Inter` / `Roboto Mono` / `Lato` / `Open Sans` / `Montserrat` / `Hiragino Sans`

> ❌ `BIZ UDPGothic` / `Roboto` を `font-mono` に使わない。❌ `BIZ UDGothic` / `Roboto Mono` を `font-pro` に使わない。
>
> ❌ `radius: "full"` は入力キーとして存在しない（`sparkle-variables/radius.csv` の `name` 列に無く、`round` 列の semantic 出力にのみ現れる）。使わない。最大の丸みが欲しいときは `3xl`。

## Source of Truth

この reference 内の許可リストは以下のファイルを権威ソースとしている。Figma プラグイン側で追加があった場合はこの reference と SKILL.md の許可リストを手動更新すること（現状 CI による同期機構は無い）:

- **radius**: `sparkle-variables/radius.csv` の `name` 列
- **fonts**: `sparkle-variables/fontdata.csv`（`proportion` 列が `pro` / `mono` / `both` の区分）
- **colors**: `sparkle-variables/colors.json` の primary 系キー

## マッピング表

### 1. ポップ / 元気 / カジュアル

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `yellow` / `pink` / `orange` | 明度・彩度が高く陽気な印象 |
| radius | `xl` / `2xl` | 丸みを強めると遊び心が出る（最大まで寄せたいなら `3xl`） |
| font-pro | `Montserrat` / `Noto Sans JP` | 太さのコントラストがはっきりして明朗 |
| font-mono | `Roboto Mono` | 中立でポップさを邪魔しない |

**発動しそうな要望**: 「ポップに」「元気な感じ」「楽しげ」「カジュアルに」「SNS 向け」

### 2. ビジネスライク / 信頼感

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `blue` | 金融・SaaS の定番色。信頼感 |
| radius | `sm` / `md` | 四角すぎず丸すぎない安心感 |
| font-pro | `Inter` / `IBM Plex Sans JP` | クリーンで読みやすい |
| font-mono | `Roboto Mono` | コード・数値の視認性 |

**発動しそうな要望**: 「ビジネスっぽく」「落ち着いた感じ」「社内ツールに合う」「B2B 向け」「真面目に」

### 3. 高級感 / フォーマル / 上質

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `purple` | 格式高さを示す伝統色 |
| radius | `none` / `sm` | シャープで凛とした印象 |
| font-pro | `IBM Plex Sans JP` | 落ち着いた骨格 |
| font-mono | `Roboto Mono` | フォーマル文脈を崩さない |

**発動しそうな要望**: 「高級感」「フォーマル」「上品に」「ラグジュアリー」「プレミアム」

### 4. やさしい / 親しみ / 温かみ

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `green` / `pink` | 柔らかさ・共感 |
| radius | `lg` | 角の丸みで優しさが出る |
| font-pro | `BIZ UDPGothic` / `Lato` | 日本語も親しみやすい字形 |
| font-mono | `BIZ UDGothic` / `Roboto Mono` | proportional と統一感 |

**発動しそうな要望**: 「やさしく」「親しみやすい」「あたたかい」「教育系」「ヘルスケア」「キッズ向け」

### 5. ミニマル / クリーン

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `blue` / `green` | 主張控えめで中立 |
| radius | `none` / `sm` | 装飾を抑える |
| font-pro | `Inter` | もっとも中立なサンセリフ |
| font-mono | `Roboto Mono` | ミニマルと親和性 |

**発動しそうな要望**: 「ミニマル」「クリーン」「シンプルに」「余計な装飾を減らして」

### 6. 日本語読みやすさ重視

| 項目 | 値 | 理由 |
|---|---|---|
| primary | （現状維持） | — |
| radius | （現状維持） | — |
| font-pro | `BIZ UDPGothic` | UD フォントで可読性最高 |
| font-mono | `BIZ UDGothic` | pro と統一 |

**発動しそうな要望**: 「日本語を読みやすく」「アクセシビリティ重視」「高齢者向け」「UD フォントで」

### 7. Apple 的洗練 / モダン

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `blue` / `purple` | iOS / macOS の標準色文脈 |
| radius | `lg` / `xl` | iOS の丸み |
| font-pro | `Hiragino Sans` | Apple 標準フォント |
| font-mono | `Roboto Mono` | 中立な mono |

**発動しそうな要望**: 「Apple っぽく」「iOS 風」「モダン」「洗練された」

### 8. エネルギッシュ / 行動喚起

| 項目 | 値 | 理由 |
|---|---|---|
| primary | `red` / `orange` | アクション色 |
| radius | `md` | 強さと使いやすさの折衷 |
| font-pro | `Montserrat` | 力強いサンセリフ |
| font-mono | `Roboto Mono` | — |

**発動しそうな要望**: 「エネルギッシュ」「行動喚起」「CTA が目立つ」「スポーツ系」「赤系で」

## 使い方

ユーザーの要望が複数の雰囲気に跨る場合は、**主な意図**を汲んで 1 つを主案とし、他は「別案あり」の注記に留める。多選択肢提示はユーザーの意思決定コストを上げるため避ける。

要望が「primary だけ赤に変えて」のように軸を絞っている場合は、要望どおりに **その軸だけ** 変更し、他は現状維持。無関係な軸まで勝手に触らない。
