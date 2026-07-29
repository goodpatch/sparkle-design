#!/usr/bin/env node
// Claude Code PreToolUse hook の本体。
// 取り消せない操作 (npm publish / PR マージ / タグ push / GitHub Release 作成 /
// リポジトリ作成 / force push など) を検知したら、実行前にブロックする (exit 2)。
//
// 目的は「AI が手順リストを最後まで走り切って、人が見ないまま公開してしまう」
// のを止めること。リリース手順のスキルにも同じ趣旨のゲートを書いてあるが、
// 散文の指示はそのスキルを読んでいないセッションには効かない。
// このフックはスキルの読み込み有無に関係なく効く。
//
// このファイルは Sparkle のリポジトリ間で同一内容を保つ (差分を作らない)。
// 更新するときは sparkle-design 側を先に直し、他リポジトリへコピーする。
//
// ブロックを解除するには、ユーザーから明示的な指示を得たうえで、
// コマンドの先頭に SPARKLE_CONFIRM=1 を付けて実行する:
//   SPARKLE_CONFIRM=1 gh workflow run "Publish to npm" --ref v1.2.3
//
// SPARKLE_CONFIRM=1 は「ユーザーがこの操作を名指しで指示した」ことの表明であり、
// AI が自分の判断で付け足してよいものではない。
//
// シェルではなく Node で書いてあるのは、引用符とコマンド置換を正しく扱うため。
// bash の文字列分割だと `git commit -m "...; npm publish ..."` を誤検知したり、
// 逆に `result=$(npm publish)` を取りこぼしたりする。

import { pathToFileURL } from "node:url";

/** 値を取るオプション。値ごと読み飛ばさないと値をサブコマンドと誤認する。 */
const OPTIONS_WITH_VALUE = new Set([
  // git
  "-C", "-c", "--git-dir", "--work-tree", "--namespace", "--exec-path",
  // gh
  "-R", "--repo", "--hostname",
  // パッケージマネージャ
  "-w", "--workspace", "-F", "--filter", "--dir", "--prefix", "--registry",
]);

/** `env` 自身のオプションのうち値を取るもの。 */
const ENV_OPTIONS_WITH_VALUE = new Set(["-u", "--unset", "-C", "--chdir", "-S", "--split-string"]);

/**
 * コマンド文字列を「実際に実行される単位」へ割る。
 * 引用符の外にある `;` `&` `|` `&&` `||` 改行で分割し、
 * コマンド置換 `$( )` / バッククォートの中身も独立した単位として取り出す。
 */
export function splitSegments(command) {
  const segments = [];
  const substitutionStack = []; // コマンド置換に入る直前の引用状態を積む
  let current = "";
  let quote = null;

  const flush = () => {
    if (current.trim() !== "") segments.push(current);
    current = "";
  };

  for (let i = 0; i < command.length; i++) {
    const c = command[i];

    // シングルクォート内は展開されないので完全にリテラル。
    // 引用符そのものは落とさずに残す (単語のグルーピングは tokenize 側で解く)。
    if (quote === "'") {
      if (c === "'") quote = null;
      current += c;
      continue;
    }

    if (c === "\\") {
      current += command[++i] ?? "";
      continue;
    }

    // コマンド置換はダブルクォートの中でも実行される。
    // 中に入る間は引用状態を退避し、`)` で元に戻す。
    if (c === "$" && command[i + 1] === "(") {
      flush();
      substitutionStack.push(quote);
      quote = null;
      i++;
      continue;
    }
    if (c === ")") {
      if (substitutionStack.length > 0) {
        flush();
        quote = substitutionStack.pop();
        continue;
      }
      if (quote === null) {
        flush(); // サブシェルの終わり
        continue;
      }
      current += c;
      continue;
    }
    // バッククォートはネストしないので、開始・終了とも区切りとして扱えば足りる
    if (c === "`") {
      flush();
      continue;
    }

    if (quote === '"') {
      if (c === '"') quote = null;
      current += c;
      continue;
    }

    if (c === "'" || c === '"') {
      quote = c;
      current += c;
      continue;
    }
    if (c === "(" || c === "\n") {
      flush();
      continue;
    }
    if (c === ";" || c === "&" || c === "|") {
      if ((c === "&" && command[i + 1] === "&") || (c === "|" && command[i + 1] === "|")) i++;
      flush();
      continue;
    }
    current += c;
  }
  flush();
  return segments;
}

/** セグメントを単語へ割る。引用符は取り除く (`"Publish to npm"` → `Publish to npm`)。 */
export function tokenize(segment) {
  const tokens = [];
  let current = "";
  let quoted = false;
  let quote = null;

  const flush = () => {
    if (current !== "" || quoted) tokens.push(current);
    current = "";
    quoted = false;
  };

  for (let i = 0; i < segment.length; i++) {
    const c = segment[i];
    if (quote) {
      if (c === quote) {
        quote = null;
        continue;
      }
      if (c === "\\" && quote === '"') {
        current += segment[++i] ?? "";
        continue;
      }
      current += c;
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      quoted = true;
      continue;
    }
    if (c === "\\") {
      current += segment[++i] ?? "";
      continue;
    }
    if (/\s/.test(c)) {
      flush();
      continue;
    }
    current += c;
  }
  flush();
  return tokens;
}

/** `--dry-run` が「有効」として指定されているか。`--dry-run=false` は publish するので無効扱い。 */
function hasEnabledDryRun(tokens) {
  return tokens.some(
    (t) => t === "--dry-run" || t === "--dry-run=true" || t === "--dry-run=1"
  );
}

/**
 * 1 セグメントを判定する。
 * @returns {{op: string} | {confirmed: true} | null}
 */
export function inspectSegment(segment) {
  const tokens = tokenize(segment);
  let index = 0;
  let confirmed = false;

  // 先頭の env / インラインの VAR=value 代入を剥がす
  for (; index < tokens.length; ) {
    const token = tokens[index];
    if (token === "env") {
      index++;
      while (index < tokens.length && tokens[index].startsWith("-")) {
        const option = tokens[index];
        index++;
        if (ENV_OPTIONS_WITH_VALUE.has(option) && !option.includes("=")) index++;
      }
      continue;
    }
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(token)) {
      if (token === "SPARKLE_CONFIRM=1") confirmed = true;
      index++;
      continue;
    }
    break;
  }

  if (confirmed) return { confirmed: true };

  const cmd = tokens[index];
  if (!cmd) return null;
  index++;

  // `bash -c "npm publish"` のように、シェル経由で実行される中身も判定する。
  // 下のオプション読み飛ばしより先に見ないと、`-c` が値ごと捨てられてしまう。
  if (["bash", "sh", "zsh", "dash", "ksh"].includes(cmd)) {
    const args = tokens.slice(index);
    const cIndex = args.indexOf("-c");
    const script = cIndex >= 0 ? args[cIndex + 1] : undefined;
    if (script) return { nested: script };
    return null;
  }

  // サブコマンドの前に来るオプションを読み飛ばす (値を取るものは値ごと)
  while (index < tokens.length) {
    const token = tokens[index];
    if (!token.startsWith("-")) break;
    index++;
    if (OPTIONS_WITH_VALUE.has(token)) index++;
  }

  const rest = tokens.slice(index);
  const sub = rest[0] ?? "";
  const sub2 = rest[1] ?? "";


  if (["npm", "pnpm", "yarn", "bun"].includes(cmd)) {
    if (sub === "publish") {
      if (hasEnabledDryRun(tokens)) return null;
      return { op: `${cmd} publish (パッケージの公開)` };
    }
    if (sub === "unpublish") return { op: `${cmd} unpublish (公開済みバージョンの削除)` };
    if (sub === "deprecate") return { op: `${cmd} deprecate (公開済みバージョンの非推奨化)` };
    return null;
  }

  if (cmd === "gh") {
    const pair = `${sub} ${sub2}`;
    if (pair === "pr merge") return { op: "gh pr merge (PR のマージ)" };
    if (pair === "release create") return { op: "gh release create (GitHub Release の作成)" };
    if (pair === "release delete") return { op: "gh release delete (GitHub Release の削除)" };
    if (pair === "repo create") return { op: "gh repo create (GitHub リポジトリの作成)" };
    if (pair === "repo delete") return { op: "gh repo delete (GitHub リポジトリの削除)" };
    if (pair === "repo archive") return { op: "gh repo archive (GitHub リポジトリのアーカイブ)" };
    if (pair === "workflow run") {
      // publish 系ワークフローだけを対象にする (CI の再実行などは素通し)
      if (rest.some((t) => /publish/i.test(t))) {
        return { op: "gh workflow run (publish ワークフローの実行)" };
      }
    }
    return null;
  }

  if (cmd === "git" && sub === "push") {
    let remoteSeen = false;
    for (const token of rest.slice(1)) {
      if (token === "--force" || token === "-f" || token.startsWith("--force-with-lease")) {
        return { op: "git push --force 系 (リモート履歴の上書き)" };
      }
      if (token === "--delete" || token === "-d") {
        return { op: "git push --delete (リモート ref の削除)" };
      }
      if (token === "--tags" || token === "--follow-tags") {
        return { op: "git push --tags (タグの push)" };
      }
      if (token.startsWith("-")) continue;
      if (!remoteSeen) {
        remoteSeen = true;
        continue;
      }
      // refspec 先頭の `+` は「拒否される更新も強制する」= force と同じ
      if (token.startsWith("+")) {
        return { op: "git push +<refspec> (強制更新の refspec)" };
      }
      if (token.startsWith(":")) {
        return { op: "git push :<ref> (リモート ref の削除)" };
      }
      const dst = token.includes(":") ? token.slice(token.lastIndexOf(":") + 1) : token;
      if (/^(refs\/tags\/)?v\d+\.\d+\.\d+/.test(dst)) {
        return { op: "git push <tag> (リリースタグの push)" };
      }
    }
  }

  return null;
}

/**
 * 承認は **そのコマンドの先頭に書かれた `SPARKLE_CONFIRM=1`** だけを見る。
 * 継承されたプロセス環境変数は意図的に無視する。`export SPARKLE_CONFIRM=1` を
 * 一度実行するとセッション中ずっとガードが外れてしまい、
 * 「1 操作ごとにユーザーの指示を得る」という設計が崩れるため。
 * @returns {{op: string, segment: string} | null}
 */
export function inspectCommand(command, depth = 0) {
  if (depth > 3) return null; // `bash -c` の入れ子が病的に深い入力への保険
  for (const segment of splitSegments(command)) {
    const result = inspectSegment(segment);
    if (!result) continue;
    if ("confirmed" in result) continue;
    if ("nested" in result) {
      const nested = inspectCommand(result.nested, depth + 1);
      if (nested) return nested;
      continue;
    }
    return { op: result.op, segment: segment.trim() };
  }
  return null;
}

function main() {
  let raw = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => (raw += chunk));
  process.stdin.on("end", () => {
    let command = "";
    try {
      command = JSON.parse(raw)?.tool_input?.command ?? "";
    } catch {
      // 解釈できない入力では素通しする (フックが開発を止めない方に倒す)
      process.exit(0);
    }
    if (!command) process.exit(0);

    const hit = inspectCommand(command);
    if (!hit) process.exit(0);

    process.stderr.write(
      [
        "取り消せない操作を検知したため、実行前にブロックしました。",
        "",
        `  検知した操作: ${hit.op}`,
        `  コマンド    : ${hit.segment}`,
        "",
        "この操作はユーザーが名指しで指示したときだけ実行してよい。",
        "「リリースして」「進めて」といった包括的な依頼は、この操作の承認ではない。",
        "",
        "次にやること:",
        "  1. 実行しようとした操作と、その影響 (何が公開・変更されるか) をユーザーに報告する",
        "  2. ユーザーから明示的な指示を得る",
        "  3. 指示を得たら、コマンドの先頭に SPARKLE_CONFIRM=1 を付けて再実行する",
        `     例: SPARKLE_CONFIRM=1 ${hit.segment}`,
        "",
        "SPARKLE_CONFIRM=1 は「ユーザーが指示した」ことの表明。指示が無いまま付けてはならない。",
        "",
      ].join("\n")
    );
    process.exit(2);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
