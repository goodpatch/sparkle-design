#!/usr/bin/env bash
# npm の stage 専用トークン（read-write-stage-only）を発行し、GitHub Actions の
# secret に登録する。期限切れのたびに手で npmjs.com を操作しなくて済むようにする。
#
# 使い方:
#   scripts/rotate-npm-token.sh                     # sparkle-design 用（既定）
#   scripts/rotate-npm-token.sh --expires 90
#   scripts/rotate-npm-token.sh --package sparkle-design-cli --repo goodpatch/sparkle-design-cli
#
# 前提:
#   - `npm login` 済み（npm の 2FA が有効なアカウント）
#   - `gh auth login` 済みで、対象リポジトリの secret を書き換える権限がある
#
# トークンの発行には npm のパスワードと 2FA コード（OTP）が必須（npm の仕様で自動化できない）。
# どちらもプロンプトで受け取り、コマンドライン引数には載せない。発行したトークンは
# 画面にもファイルにも出さず、そのまま `gh secret set` の標準入力に渡す。
#
# en: Create an npm stage-only granular access token (read-write-stage-only) and store it
# as a GitHub Actions secret, so rotating an expired token doesn't need the npmjs.com UI.
# npm requires your password and a 2FA code to create tokens (this can't be automated);
# both are prompted for and never put on the command line. The new token is never printed
# or written to disk; it is piped straight into `gh secret set`.
set -euo pipefail

PACKAGE="sparkle-design"
REPO="goodpatch/sparkle-design"
SECRET="NPM_TOKEN"
EXPIRES=""
NPM_VERSION="^11.21.0" # read-write-stage-only は npm 11.20.0 以降 / needs npm >= 11.20.0

usage() {
  sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
}

while [ $# -gt 0 ]; do
  case "$1" in
    --package) PACKAGE="$2"; shift 2 ;;
    --repo) REPO="$2"; shift 2 ;;
    --secret) SECRET="$2"; shift 2 ;;
    --expires) EXPIRES="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "不明なオプション: $1" >&2; usage >&2; exit 1 ;;
  esac
done

for bin in npx gh node; do
  command -v "$bin" >/dev/null 2>&1 || { echo "$bin が見つかりません" >&2; exit 1; }
done

NPM_USER=$(npx -y "npm@${NPM_VERSION}" whoami 2>/dev/null) || {
  echo "npm にログインしていません。先に \`npm login\` を実行してください" >&2
  exit 1
}
gh auth status >/dev/null 2>&1 || {
  echo "gh にログインしていません。先に \`gh auth login\` を実行してください" >&2
  exit 1
}

NAME="${PACKAGE}-ci-stage-$(date +%Y%m%d)"
echo "npm ユーザー: ${NPM_USER}"
echo "発行するトークン: ${NAME}（${PACKAGE} への stage のみ${EXPIRES:+、${EXPIRES} 日で失効}）"
echo "登録先: ${REPO} の secret ${SECRET}"
echo

read -r -s -p "npm のパスワード: " NPM_PASSWORD; echo
read -r -p "npm の 2FA コード（OTP）: " NPM_OTP

ARGS=(token create --json
  --name "$NAME"
  --token-description "GitHub Actions (${REPO}) から npm stage publish する専用トークン"
  --packages "$PACKAGE"
  --packages-and-scopes-permission read-write-stage-only)
if [ -n "$EXPIRES" ]; then
  ARGS+=(--expires "$EXPIRES")
fi

# パスワードと OTP は引数ではなく環境変数で渡す（ps に出さない）
# en: Pass the password and OTP via environment variables, not argv (keeps them out of ps)
RESULT=$(npm_config_password="$NPM_PASSWORD" npm_config_otp="$NPM_OTP" \
  npx -y "npm@${NPM_VERSION}" "${ARGS[@]}")
unset NPM_PASSWORD NPM_OTP

# 応答（トークンを含む）は引数ではなく標準入力で渡す。printf はシェル組み込みなので ps に出ない
# en: Feed the response (which contains the token) via stdin, not argv. printf is a builtin,
#     so it never shows up in ps
json_field() {
  printf '%s' "$RESULT" | node -e '
    let s = ""; process.stdin.on("data", d => (s += d)).on("end", () => {
      const r = JSON.parse(s); const v = r[process.argv[1]];
      process.stdout.write(v == null ? "" : String(v));
    });' "$1"
}
TOKEN_ID=$(json_field id)
EXPIRES_AT=$(json_field expires)

# 空の値で secret を上書きしないよう、取り出せたことを確かめてから登録する
# en: Make sure a token was extracted before writing, so the secret is never blanked
NEW_TOKEN=$(json_field token)
unset RESULT
if [ -z "$NEW_TOKEN" ]; then
  echo "トークンが応答に含まれていません。secret は変更していません" >&2
  exit 1
fi
printf '%s' "$NEW_TOKEN" | gh secret set "$SECRET" --repo "$REPO"
unset NEW_TOKEN

echo
echo "✅ ${REPO} の ${SECRET} を更新しました"
[ -n "$TOKEN_ID" ] && echo "   新しいトークンの id: ${TOKEN_ID}"
[ -n "$EXPIRES_AT" ] && echo "   失効日: ${EXPIRES_AT}"
echo
echo "古いトークンは \`npm token list\` で確認し、不要なら \`npm token revoke <id>\` で失効させてください。"
