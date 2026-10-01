/**
 * `htmlFor` が指定 id を指す `<label>` のうち、id を持つものの id を空白区切りで返す。
 * `label[for]` は labelable 要素（input / button など）にしか名前を与えないため、
 * `span[role="slider"]` や `div[role="radiogroup"]` には aria-labelledby で関連付け直す必要がある。
 * en: Returns space-separated ids of `<label>` elements (that have an id) whose
 *     `htmlFor` points to the given id. `label[for]` only names labelable elements
 *     (input, button, ...), so role-based controls such as `span[role="slider"]` or
 *     `div[role="radiogroup"]` must be re-associated via aria-labelledby.
 */
export function findLabelIdsFor(
  target: HTMLElement,
  id: string
): string | undefined {
  const root = target.getRootNode() as Document | ShadowRoot;
  // NOTE: useId 由来の id は CSS セレクタで特殊文字を含むため、属性セレクタではなく htmlFor で比較する
  // en: useId-generated ids contain selector-special characters, so compare htmlFor instead of using an attribute selector
  const ids = Array.from(root.querySelectorAll<HTMLLabelElement>("label[for]"))
    .filter(label => label.htmlFor === id && label.id)
    .map(label => label.id);
  return ids.length > 0 ? ids.join(" ") : undefined;
}
