#!/bin/bash
# AI指示ファイル同期スクリプト
# docs/ai-instructions/ の共通コンテンツから各ツール用ファイルを生成
#
# 使用方法: ./scripts/sync-ai-instructions.sh
# または: make ai-instructions

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$PROJECT_ROOT/docs/ai-instructions"
GITHUB_INSTRUCTIONS_DIR="$PROJECT_ROOT/.github/instructions"
CURSOR_RULES_DIR="$PROJECT_ROOT/.cursor/rules"

echo "🔄 AI指示ファイルを同期中..."

# ディレクトリの作成
mkdir -p "$GITHUB_INSTRUCTIONS_DIR"
mkdir -p "$CURSOR_RULES_DIR"

# =============================================================================
# GitHub Copilot用ファイル生成
# =============================================================================
generate_github_copilot() {
    local source_file="$1"
    local target_name="$2"
    local apply_to="$3"
    local target_file="$GITHUB_INSTRUCTIONS_DIR/${target_name}.instructions.md"

    echo "  📝 GitHub Copilot: $target_name"

    # frontmatterを追加してコピー
    cat > "$target_file" << EOF
---
applyTo: "$apply_to"
---

EOF
    cat "$source_file" >> "$target_file"
}

# =============================================================================
# Cursor用ファイル生成 (.mdc形式)
# =============================================================================
generate_cursor() {
    local source_file="$1"
    local target_name="$2"
    local description="$3"
    local globs="$4"
    local always_apply="$5"
    local target_file="$CURSOR_RULES_DIR/${target_name}.mdc"

    echo "  📝 Cursor: $target_name"

    # MDC frontmatterを追加してコピー
    cat > "$target_file" << EOF
---
description: $description
globs: $globs
alwaysApply: $always_apply
---

EOF
    cat "$source_file" >> "$target_file"
}

# =============================================================================
# OpenAI Codex / Claude Code用ファイル生成
# =============================================================================
generate_agents_md() {
    local target_file="$PROJECT_ROOT/AGENTS.md"

    echo "  📝 OpenAI Codex / Claude Code: AGENTS.md"

    # AGENTS.mdを生成（複数ファイルを結合）
    cat > "$target_file" << 'EOF'
# Repo guidelines

This project is a Next.js + TypeScript component library using TailwindCSS, Storybook, and shadcn/ui patterns.

## AI Instructions

This repository uses a unified AI instruction system. Source files are in `docs/ai-instructions/`.

**Primary References** (follow in order):
1. `docs/ai-instructions/context.md` – Project context and overview
2. `docs/ai-instructions/development.md` – Development patterns and practices
3. `docs/ai-instructions/testing.md` – Comprehensive testing guidelines
4. `docs/ai-instructions/comment-style.md` – Code comment standards
5. `docs/ai-instructions/new-component.md` – Component creation process

EOF

    # 各コンテンツファイルの要約を追加
    echo "" >> "$target_file"
    echo "---" >> "$target_file"
    echo "" >> "$target_file"

    # context.mdの内容を追加
    if [ -f "$SOURCE_DIR/context.md" ]; then
        cat "$SOURCE_DIR/context.md" >> "$target_file"
        echo "" >> "$target_file"
        echo "---" >> "$target_file"
        echo "" >> "$target_file"
    fi
}

# =============================================================================
# メイン処理
# =============================================================================

# GitHub Copilot用ファイル生成
if [ -f "$SOURCE_DIR/context.md" ]; then
    generate_github_copilot "$SOURCE_DIR/context.md" "ai-context" "**"
fi

if [ -f "$SOURCE_DIR/development.md" ]; then
    generate_github_copilot "$SOURCE_DIR/development.md" "ai-development" "**"
fi

if [ -f "$SOURCE_DIR/testing.md" ]; then
    generate_github_copilot "$SOURCE_DIR/testing.md" "testing" "**/*.test.tsx"
fi

if [ -f "$SOURCE_DIR/comment-style.md" ]; then
    generate_github_copilot "$SOURCE_DIR/comment-style.md" "comment-style" "**"
fi

if [ -f "$SOURCE_DIR/new-component.md" ]; then
    generate_github_copilot "$SOURCE_DIR/new-component.md" "new-component" "**"
fi

# Cursor用ファイル生成
if [ -f "$SOURCE_DIR/context.md" ]; then
    generate_cursor "$SOURCE_DIR/context.md" "context" "Project context and overview" "**" "true"
fi

if [ -f "$SOURCE_DIR/development.md" ]; then
    generate_cursor "$SOURCE_DIR/development.md" "development" "Development patterns for Sparkle Design" "**/*.tsx,**/*.ts" "false"
fi

if [ -f "$SOURCE_DIR/testing.md" ]; then
    generate_cursor "$SOURCE_DIR/testing.md" "testing" "Testing guidelines following t_wada best practices" "**/*.test.tsx" "false"
fi

if [ -f "$SOURCE_DIR/comment-style.md" ]; then
    generate_cursor "$SOURCE_DIR/comment-style.md" "comment-style" "Code comment style guidelines" "**/*.tsx,**/*.ts" "false"
fi

# OpenAI Codex / Claude Code用ファイル生成
generate_agents_md

# CLAUDE.mdがシンボリックリンクでない場合は作成
if [ ! -L "$PROJECT_ROOT/CLAUDE.md" ]; then
    echo "  🔗 CLAUDE.md -> AGENTS.md シンボリックリンクを作成"
    rm -f "$PROJECT_ROOT/CLAUDE.md"
    ln -s AGENTS.md "$PROJECT_ROOT/CLAUDE.md"
fi

# .cursorrules（レガシー形式）を生成
echo "  📝 Cursor: .cursorrules (legacy)"
cat > "$PROJECT_ROOT/.cursorrules" << 'EOF'
# Sparkle Design - Cursor Rules (Legacy Format)
#
# NOTE: This is the legacy format for backward compatibility.
# New rules should be added to .cursor/rules/*.mdc
#
# For detailed instructions, see: docs/ai-instructions/

## Project Overview
This is a React component library built with Next.js, TypeScript, TailwindCSS, and CVA.

## Key Rules
1. Follow t_wada's testing best practices
2. Use shared test helpers (TestContainer, EventHelpers, etc.)
3. Write comments in Japanese first, then English with `en:` prefix
4. Use CVA for component variants
5. Run `pnpm lint && pnpm format` before commits

## References
- docs/ai-instructions/context.md - Project context
- docs/ai-instructions/development.md - Development patterns
- docs/ai-instructions/testing.md - Testing guidelines
- docs/ai-instructions/comment-style.md - Comment standards
EOF

echo ""
echo "✅ AI指示ファイルの同期が完了しました"
echo ""
echo "生成されたファイル:"
echo "  - .github/instructions/*.instructions.md (GitHub Copilot)"
echo "  - .cursor/rules/*.mdc (Cursor)"
echo "  - AGENTS.md (OpenAI Codex)"
echo "  - CLAUDE.md -> AGENTS.md (Claude Code)"
echo "  - .cursorrules (Cursor legacy)"
