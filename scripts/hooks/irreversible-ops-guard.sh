#!/usr/bin/env bash
# Claude Code PreToolUse hook のエントリポイント。
# 判定本体は irreversible-ops-guard.mjs (引用符とコマンド置換を正しく扱うため Node で書いてある)。
#
# node が無い環境では素通しする (exit 0)。ガードが効かなくなるが、
# 安全のための hook が開発そのものを止めてしまう方が害が大きいため。
#
# このファイルは Sparkle のリポジトリ間で同一内容を保つ (差分を作らない)。
# 更新するときは sparkle-design 側を先に直し、他リポジトリへコピーする。
set -uo pipefail

if ! command -v node >/dev/null 2>&1; then
  exit 0
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$script_dir/irreversible-ops-guard.mjs"
