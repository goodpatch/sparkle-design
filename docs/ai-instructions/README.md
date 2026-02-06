# AI Instructions

このディレクトリには、各種AIツール（GitHub Copilot、OpenAI Codex、Claude Code、Cursor）向けの
共通指示ファイルのソースが含まれています。

## ディレクトリ構造

```
docs/ai-instructions/
├── README.md           # このファイル
├── context.md          # プロジェクト概要
├── development.md      # 開発パターン
├── testing.md          # テストガイドライン
├── comment-style.md    # コメント規約
└── new-component.md    # コンポーネント作成ガイド
```

## 生成されるファイル

`make ai-instructions` を実行すると、以下のファイルが生成されます：

| ツール | 生成ファイル | 説明 |
|--------|-------------|------|
| OpenAI Codex | `AGENTS.md` | ルートレベルの指示ファイル |
| Claude Code | `CLAUDE.md` | AGENTS.mdへのシンボリックリンク |
| GitHub Copilot | `.github/copilot-instructions.md` | メイン指示ファイル |
| GitHub Copilot | `.github/instructions/*.instructions.md` | スコープ付き指示ファイル |
| Cursor | `.cursor/rules/*.mdc` | スコープ付きルールファイル |
| Cursor | `.cursorrules` | レガシー形式（互換性用） |

## 編集方法

1. このディレクトリ内のソースファイルを編集
2. `make ai-instructions` を実行して各ツール用ファイルを生成
3. 変更をコミット

## ファイル形式

### ソースファイル（このディレクトリ）
- 純粋なMarkdown（frontmatterなし）
- 日本語と英語の両方を含む

### 生成ファイル
- 各ツール固有のfrontmatterが自動追加される
- GitHub Copilot: `applyTo` フィールド
- Cursor: `description`, `globs`, `alwaysApply` フィールド

## 参考リンク

- [GitHub Copilot Custom Instructions](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [OpenAI Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md/)
- [Cursor Rules](https://docs.cursor.com/context/rules)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
