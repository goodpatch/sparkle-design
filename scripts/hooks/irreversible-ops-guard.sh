#!/usr/bin/env bash
# Claude Code PreToolUse hook:
# 取り消せない操作 (npm publish / PR マージ / タグ push / GitHub Release 作成 /
# force push など) を検知したら、実行前にブロックする (exit 2)。
#
# 目的は「AI が手順リストを最後まで走り切って、人が見ないまま公開してしまう」
# のを止めること。スキル本文 (.claude/skills/release-sparkle-design/SKILL.md) にも
# 同じ趣旨のゲートを書いてあるが、散文の指示はスキルを読んでいないセッションには
# 効かない。このフックはスキルの読み込み有無に関係なく効く。
#
# ブロックを解除するには、ユーザーから明示的な指示を得たうえで、
# コマンドの先頭に SPARKLE_CONFIRM=1 を付けて実行する:
#   SPARKLE_CONFIRM=1 gh workflow run "Publish to npm" --ref v1.2.3
#
# SPARKLE_CONFIRM=1 は「ユーザーがこの操作を名指しで指示した」ことの表明であり、
# AI が自分の判断で付け足してよいものではない。
set -uo pipefail

input="$(cat)"

# 全 Bash 呼び出しで起動されるため、jq を起動する前に生 JSON で安価に足切りする。
# ここに挙げたキーワードを含まないコマンドは以降の判定対象になりえない。
# ワークフロー名は `"Publish to npm"` のように大文字を含むため大小文字を無視する。
shopt -s nocasematch
case "$input" in
  *publish* | *merge* | *push* | *release* | *deprecate*) ;;
  *)
    shopt -u nocasematch
    exit 0
    ;;
esac
shopt -u nocasematch

command="$(jq -r '.tool_input.command // ""' <<<"$input")"
[ -n "$command" ] || exit 0

# ---- コマンドをセグメントに割る ----
# `;` `&` `|` `&&` `||` と改行で分割し、各セグメントの「先頭に来るコマンド」だけを
# 判定対象にする。こうするとコミットメッセージ等に "npm publish" の文字列が
# 含まれるだけのケースを弾ける (先頭が git commit になるため)。
segments="$(printf '%s' "$command" | sed -E 's/(\|\||&&|[;&|])/\n/g')"

blocked_op=""
blocked_segment=""

while IFS= read -r segment; do
  [ -n "$segment" ] || continue

  # 先頭の空白 / env / インラインの VAR=value 代入を剥がして、実際のコマンド名を露出させる。
  # 剥がした代入の中に SPARKLE_CONFIRM=1 があればそのセグメントは承認済みとみなす。
  confirmed=0
  seg="${segment#"${segment%%[![:space:]]*}"}"
  while true; do
    case "$seg" in
      env[[:space:]]*)
        seg="${seg#env}"
        seg="${seg#"${seg%%[![:space:]]*}"}"
        ;;
      SPARKLE_CONFIRM=1[[:space:]]*)
        confirmed=1
        seg="${seg#SPARKLE_CONFIRM=1}"
        seg="${seg#"${seg%%[![:space:]]*}"}"
        ;;
      [A-Za-z_]*=*)
        # 変数代入は「=」より前に空白を含まない。それ以外は通常のコマンドとして扱う
        head="${seg%%[[:space:]]*}"
        case "$head" in
          *=*)
            seg="${seg#"$head"}"
            seg="${seg#"${seg%%[![:space:]]*}"}"
            ;;
          *) break ;;
        esac
        ;;
      *) break ;;
    esac
  done

  [ -n "$seg" ] || continue
  [ "${SPARKLE_CONFIRM:-0}" = "1" ] && confirmed=1
  [ "$confirmed" -eq 1 ] && continue

  # ---- 単語に分割して「コマンド名 + サブコマンド」で判定する ----
  # 部分一致 (*publish*) だと `npm run publish-docs` や
  # `git commit -m "push 前に直す"` まで拾ってしまうため、位置を見て判定する。
  set -f # 展開時の glob を無効化
  # shellcheck disable=SC2086
  set -- $seg
  set +f
  [ "$#" -gt 0 ] || continue

  cmd="$1"
  shift
  # `git -C <path> push` のように、サブコマンドの前に来るオプションを読み飛ばす
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -C | -c | --git-dir | --work-tree | -R | --repo)
        shift
        [ "$#" -gt 0 ] && shift
        ;;
      -*) shift ;;
      *) break ;;
    esac
  done
  sub="${1:-}"
  sub2="${2:-}"

  op=""
  case "$cmd" in
    # --- パッケージの公開系 ---
    npm | pnpm | yarn | bun)
      case "$sub" in
        publish)
          # --dry-run は公開しないので素通しする
          case " $seg " in
            *" --dry-run "* | *" --dry-run="*) ;;
            *) op="$cmd publish (パッケージの公開)" ;;
          esac
          ;;
        unpublish) op="$cmd unpublish (公開済みバージョンの削除)" ;;
        deprecate) op="$cmd deprecate (公開済みバージョンの非推奨化)" ;;
      esac
      ;;

    # --- GitHub 側の不可逆操作 ---
    gh)
      case "$sub $sub2" in
        "pr merge") op="gh pr merge (PR のマージ)" ;;
        "release create") op="gh release create (GitHub Release の作成)" ;;
        "release delete") op="gh release delete (GitHub Release の削除)" ;;
        "workflow run")
          # publish 系ワークフローだけを対象にする (CI の再実行などは素通し)
          shopt -s nocasematch
          [[ "$seg" == *publish* ]] && op="gh workflow run (publish ワークフローの実行)"
          shopt -u nocasematch
          ;;
      esac
      ;;

    # --- git の巻き戻しにくい操作 ---
    git)
      if [ "$sub" = "push" ]; then
        shift # サブコマンド (push) を除いた引数を走査する
        remote_seen=0
        for tok in "$@"; do
          case "$tok" in
            --force | -f | --force-with-lease | --force-with-lease=*)
              op="git push --force 系 (リモート履歴の上書き)"
              break
              ;;
            --delete | -d)
              op="git push --delete (リモート ref の削除)"
              break
              ;;
            --tags | --follow-tags)
              op="git push --tags (タグの push)"
              break
              ;;
            -*) ;;
            *)
              if [ "$remote_seen" -eq 0 ]; then
                remote_seen=1
              else
                # refspec の dst 側を見る。タグ (vX.Y.Z) の push だけを対象にする
                dst="${tok##*:}"
                if [[ "$dst" =~ ^(refs/tags/)?v[0-9]+\.[0-9]+\.[0-9]+ ]]; then
                  op="git push <tag> (リリースタグの push)"
                  break
                fi
                # "git push origin :refs/heads/foo" 形式の削除
                case "$tok" in
                  :*) op="git push :<ref> (リモート ref の削除)" && break ;;
                esac
              fi
              ;;
          esac
        done
      fi
      ;;
  esac

  if [ -n "$op" ]; then
    blocked_op="$op"
    blocked_segment="$seg"
    break
  fi
done <<<"$segments"

[ -n "$blocked_op" ] || exit 0

{
  echo "取り消せない操作を検知したため、実行前にブロックしました。"
  echo ""
  echo "  検知した操作: $blocked_op"
  echo "  コマンド    : $blocked_segment"
  echo ""
  echo "この操作はユーザーが名指しで指示したときだけ実行してよい。"
  echo "「リリースして」「進めて」といった包括的な依頼は、この操作の承認ではない。"
  echo ""
  echo "次にやること:"
  echo "  1. 実行しようとした操作と、その影響 (何が公開・変更されるか) をユーザーに報告する"
  echo "  2. ユーザーから明示的な指示を得る"
  echo "  3. 指示を得たら、コマンドの先頭に SPARKLE_CONFIRM=1 を付けて再実行する"
  echo "     例: SPARKLE_CONFIRM=1 $blocked_segment"
  echo ""
  echo "SPARKLE_CONFIRM=1 は「ユーザーが指示した」ことの表明。指示が無いまま付けてはならない。"
} >&2

exit 2
