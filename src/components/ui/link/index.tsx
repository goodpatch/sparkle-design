import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * 外部リンクかどうか
   * en: Whether the link points to an external site
   */
  isExternalLink?: boolean;
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
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Link href="https://example.com" isExternalLink>
 *   外部サイトへのリンク
 * </Link>
 * ```
 *
 * @param {LinkProps} props
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ isExternalLink = false, children, className = "", ...props }, ref) => {
    // character-*-*-* クラスがあるかチェック
    const hasCharacterClass = className?.includes("character-");

    // character-X-*-* のXの部分（サイズ）を取得
    const characterSizeMatch = className?.match(/character-(\d+)-/);

    const characterSize = characterSizeMatch
      ? parseInt(characterSizeMatch[1], 10)
      : 3; // デフォルトは3

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
