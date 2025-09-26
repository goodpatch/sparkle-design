/**
 * 数値の桁数を算出（符号・小数点は除外）
 * en: Count digits of a number (exclude sign and decimal part)
 */
export function getDigitCount(max?: number): number {
  const maxVal = max ?? 100;
  const digits = Math.abs(Math.trunc(maxVal))
    .toString()
    .replace(/\D/g, "").length;
  return Math.max(1, digits);
}

/**
 * 単位の見かけ幅(ch)を概算
 * 全角/CJKや絵文字は 2ch、それ以外は 1ch として加算
 * en: Approximate visual width of unit in ch. Count full-width/CJK and emoji as 2ch, others as 1ch
 */
export function getUnitChWidth(unit?: string): number {
  if (!unit) return 0;

  const isFullwidth = (codePoint: number) => {
    if (
      codePoint >= 0x1100 &&
      (codePoint <= 0x115f ||
        codePoint === 0x2329 ||
        codePoint === 0x232a ||
        (codePoint >= 0x2e80 && codePoint <= 0xa4cf && codePoint !== 0x303f) ||
        (codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
        (codePoint >= 0xf900 && codePoint <= 0xfaff) ||
        (codePoint >= 0xfe10 && codePoint <= 0xfe19) ||
        (codePoint >= 0xfe30 && codePoint <= 0xfe6f) ||
        (codePoint >= 0xff00 && codePoint <= 0xff60) ||
        (codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
        (codePoint >= 0x1b000 && codePoint <= 0x1b001) ||
        (codePoint >= 0x1f200 && codePoint <= 0x1f251) ||
        (codePoint >= 0x20000 && codePoint <= 0x3fffd))
    ) {
      return true;
    }
    return false;
  };

  const isEmoji = (codePoint: number) =>
    (codePoint >= 0x1f000 && codePoint <= 0x1fbff) ||
    (codePoint >= 0x1f900 && codePoint <= 0x1f9ff);

  let width = 0;
  for (const ch of [...unit]) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    width += isFullwidth(cp) || isEmoji(cp) ? 2 : 1;
  }
  return width;
}

/**
 * 値インディケーターの最小幅(ch)を算出
 * en: Calculate the min ch width for the value indicator
 */
export function getIndicatorMinCh(max?: number, unit?: string): number {
  return getDigitCount(max) + getUnitChWidth(unit);
}
