#!/usr/bin/env bash
# irreversible-ops-guard.sh のテスト。
#
#   bash scripts/hooks/irreversible-ops-guard.test.sh
#
# ブロックすべきコマンド (exit 2) と、素通しすべきコマンド (exit 0) を両方検証する。
# 誤検知 (安全なコマンドを止めてしまう) は開発体験を著しく損ねるため、
# PASS 側のケースを増やすことを特に重視している。
set -uo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
hook="$script_dir/irreversible-ops-guard.sh"

pass=0
fail=0

run_case() {
  local expected="$1" # block | pass
  local command="$2"
  local payload actual_exit

  payload="$(jq -nc --arg c "$command" '{tool_input: {command: $c}, cwd: "/tmp"}')"
  env -u SPARKLE_CONFIRM bash "$hook" >/dev/null 2>&1 <<<"$payload"
  actual_exit=$?

  local actual="pass"
  [ "$actual_exit" -eq 2 ] && actual="block"

  if [ "$actual" = "$expected" ]; then
    pass=$((pass + 1))
  else
    fail=$((fail + 1))
    echo "  ✗ expected=$expected actual=$actual  :: $command"
  fi
}

echo "== ブロックされるべきコマンド =="
run_case block 'npm publish'
run_case block 'npm publish --access public'
run_case block 'pnpm publish --no-git-checks'
# 値を取るオプションを挟んでも検知できること (値をサブコマンドと誤認しない)
run_case block 'pnpm -F @goodpatch/sparkle-design publish'
run_case block 'pnpm --filter ui publish'
run_case block 'pnpm --filter=ui publish'
run_case block 'npm -w packages/ui publish'
run_case block 'npm --workspace pkg publish'
run_case block 'npm --silent publish'
# --dry-run=false は実際に publish されるので素通ししない (Codex レビュー指摘)
run_case block 'npm publish --dry-run=false'
run_case block 'pnpm publish --dry-run=0'
# コマンド置換の中の実行を取りこぼさない (Codex レビュー指摘)
run_case block 'result=$(npm publish)'
run_case block 'URL=$(gh release create v1.0.8 --notes x)'
run_case block 'echo "published to $(npm publish)"'
# env のオプション付き呼び出しでバイパスできない (Copilot レビュー指摘)
run_case block 'env -i npm publish'
run_case block 'env -u SPARKLE_CONFIRM npm publish'
# シェル経由の実行も中身を見る
run_case block 'bash -c "npm publish"'
run_case block 'sh -c "gh pr merge 297 --merge"'
# refspec 先頭の + は force と同じ (Codex レビュー指摘)
run_case block 'git push origin +main:main'
run_case block 'git push origin +refs/heads/main:refs/heads/main'
run_case block 'npm unpublish sparkle-design@1.0.8'
run_case block 'npm deprecate sparkle-design@1.0.8 "use 1.0.9"'
run_case block 'gh pr merge 297 --merge --admin'
run_case block 'gh pr merge --squash 12'
run_case block 'gh -R goodpatch/sparkle-design pr merge 297 --merge'
run_case block 'gh release create v1.0.8 --notes-file /tmp/notes.md'
run_case block 'gh release delete v1.0.8'
run_case block 'gh repo create goodpatch/acme-design --private --clone'
run_case block 'gh repo delete goodpatch/acme-design'
run_case block 'gh repo archive goodpatch/acme-design'
run_case block 'gh workflow run "Publish to npm" --ref v1.0.8'
run_case block 'gh workflow run "Publish Skills"'
run_case block 'git push origin v1.0.8'
run_case block 'git push origin refs/tags/v1.0.8'
run_case block 'git -C /tmp/repo push origin v1.0.8'
run_case block 'git push --tags'
run_case block 'git push --force origin main'
run_case block 'git push -f origin feature/foo'
run_case block 'git push --force-with-lease origin main'
run_case block 'git push origin --delete feature/foo'
run_case block 'git push origin :refs/heads/feature-foo'
run_case block 'git add -A && npm publish'
run_case block 'pnpm build && gh workflow run "Publish to npm" --ref v1.0.8'

echo "== 素通しされるべきコマンド (誤検知の検出) =="
run_case pass 'npm publish --dry-run'
run_case pass 'pnpm publish --dry-run --no-git-checks'
run_case pass 'npm run publish-docs'
run_case pass 'pnpm -F ui run publish-docs'
run_case pass 'npm -w packages/ui run build'
run_case pass 'pnpm --filter ui test'
run_case pass 'npm run build'
run_case pass 'pnpm test'
run_case pass 'gh pr create --draft --title "リリース v1.0.8"'
run_case pass 'gh pr view 297 --json state'
run_case pass 'gh pr checks 297'
run_case pass 'gh release list --limit 10'
run_case pass 'gh repo view goodpatch/sparkle-design --json permissions'
run_case pass 'gh repo clone goodpatch/prj-template /tmp/x -- --depth 1'
run_case pass 'gh api repos/goodpatch/prj-template --jq .permissions'
run_case pass 'gh release view v1.0.8'
run_case pass 'gh workflow run "CI" --ref main'
run_case pass 'gh run list --branch main --limit 5'
run_case pass 'git push -u origin harden/skill-guards'
run_case pass 'git push origin main'
run_case pass 'git push'
run_case pass 'git tag v1.0.8 abc1234'
run_case pass 'git commit -m "push 前に直す"'
# 引用符の中の区切り文字で誤分割しない (Codex レビュー指摘)
run_case pass 'git commit -m "docs: explain x; npm publish requires approval"'
run_case pass 'git commit -m "a && npm publish && b"'
run_case pass 'echo "gh pr merge は AI が押さない | npm publish も同様"'
# --dry-run の有効な指定は素通し
run_case pass 'npm publish --dry-run=true'
run_case pass 'npm publish --dry-run=1'
run_case pass 'git push origin main:main'
run_case pass 'bash -c "pnpm build && pnpm test"'
run_case pass 'bash scripts/hooks/irreversible-ops-guard.test.sh'
run_case pass 'git commit -m "chore: npm publish の手順を追記"'
run_case pass 'git commit -m "🔖 chore: release v1.0.8"'
run_case pass 'echo "gh pr merge は AI が自発的に実行しない"'
run_case pass 'grep -rn "npm publish" .claude/skills/'
run_case pass 'git log --oneline | grep release'
# ユーザーの明示指示を受けたあとの再実行 (エスケープハッチ)
run_case pass 'SPARKLE_CONFIRM=1 npm publish'
run_case pass 'SPARKLE_CONFIRM=1 gh workflow run "Publish to npm" --ref v1.0.8'
run_case pass 'SPARKLE_CONFIRM=1 gh pr merge 297 --merge --admin'

echo ""
echo "pass=$pass fail=$fail"
[ "$fail" -eq 0 ] || exit 1
echo "すべてのケースが期待どおりでした。"
