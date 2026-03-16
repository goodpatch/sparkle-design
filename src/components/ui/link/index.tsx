/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconSize } from "@/components/ui/icon";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * 新しいウィンドウやタブで開くかどうか
   * en: Whether to open the link in a new window or tab
   */
  isOpenInNew?: boolean;
  /**
   * 表示するテキスト
   * en: Text to display inside the link
   */
  children: React.ReactNode;
  /**
   * 追加のクラス名
   * en: Additional CSS classes for the link
   */
  className?: string;
}

/**
 * **概要 / Overview**
 *
 * - リンクはコンテンツがナビゲーションできることをユーザーに提示するために使用するコンポーネントです。
 * - en: The Link component is used to indicate to users that content is navigable.
 *
 * **アンチパターン / Anti-patterns**
 *
 * - 外部リンクアイコンを手動で追加しないでください。`isOpenInNew` prop が自動で `open_in_new` アイコンを表示します。
 * - en: Do not manually add external link icons. The `isOpenInNew` prop automatically displays the `open_in_new` icon.
 *
 * ```tsx
 * // ✅ Correct
 * <Link href="https://example.com" isOpenInNew>外部リンク</Link>
 *
 * // ❌ Wrong - 手動アイコン
 * <Link href="https://example.com">外部リンク <Icon icon="open_in_new" /></Link>
 * ```
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Link href="https://example.com" isOpenInNew>
 *   外部サイトへのリンク
 * </Link>
 * ```
 *
 * @param {LinkProps} props
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { isOpenInNew: isExternalLink = false, children, className = "", ...props },
    ref
  ) => {
    // character-*-*-* クラスがあるかチェック
    const hasCharacterClass = className?.includes("character-");

    // character-X-*-* のXの部分（サイズ）を取得
    const characterSizeMatch = className?.match(/character-(\d+)-/);

    const parsed = characterSizeMatch
      ? parseInt(characterSizeMatch[1], 10)
      : 3;
    const characterSize = (
      parsed >= 1 && parsed <= 12 ? parsed : 3
    ) as IconSize;

    // character クラスの生成
    const characterSizeClass = hasCharacterClass
      ? "" // 外部で指定されている場合は付与しない
      : `character-${characterSize}-regular-pro`;

    return (
      <a
        ref={ref}
        className={cn("inline group", characterSizeClass, className)}
        {...props}
      >
        <span className="transition-colors text-info-500 group-hover:text-info-600 underline decoration-current underline-offset-2">
          {children}
        </span>
        {isExternalLink && (
          <Icon
            icon="open_in_new"
            size={characterSize}
            className="ml-1 align-middle inline-block text-info-500 group-hover:text-info-600"
          />
        )}
      </a>
    );
  }
);

Link.displayName = "Link";
