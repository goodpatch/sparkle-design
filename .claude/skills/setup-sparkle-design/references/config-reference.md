# sparkle.config.json リファレンス

## 基本設定（Figma プラグインで出力可能）

| フィールド | 説明 | 選択肢 |
|---|---|---|
| `primary` | プライマリカラー（必須・型検証あり） | `blue`, `red`, `orange`, `yellow`, `purple`, `green`, `pink` |
| `font-pro` | プロポーショナルフォント | Google Fonts の名前 |
| `font-mono` | モノスペースフォント | Google Fonts の名前 |
| `radius` | 角丸設定（必須・型検証あり） | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` |

`primary` / `radius` は上記以外の値、または未指定だと `generate` がエラーで停止する（型強制のため。壊れた CSS が silent に出力されるのを防ぐ）。

設定ファイルは [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364) Figma プラグインからも書き出せる。

## 複数テーマ運用したい場合

役割・テナントごとに複数の固定配色バリアントを 1 デプロイで切り替えたい場合は、単一の `sparkle.config.json` では対応できない。sparkle-design-cli の README「複数のテーマ配色を 1 デプロイでサポートしたい場合」（config を分割して複数回 `generate` する方式）を参照。
