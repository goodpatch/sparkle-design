/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
// eslint-disable-next-line import/no-unresolved -- SonnerはESMのエクスポート構造によりLintの解決が失敗するため。 en: Sonner's ESM export map confuses the lint resolver.
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

export type { ExternalToast, ToastClassnames, ToastT } from "sonner";

type ReactToastProps = React.ComponentProps<typeof SonnerToaster>;
export interface ToastProps extends Omit<ReactToastProps, "id"> {
  /**
   * トーストの識別子
   * en: Identifier of the toast
   */
  id?: string | number;
  /**
   * トーストのタイトル
   * en: Title of the toast
   */
  title?: string;
  /**
   * トーストの説明
   * en: Description of the toast
   */
  description: string;
  /**
   * 閉じるボタンを表示するかどうか
   * en: Whether to show the close button
   */
  isCloseTrigger?: boolean;
  /**
   * トーストの表示時間（ミリ秒）
   * en: Duration of the toast (in milliseconds)
   */
  duration?: ReactToastProps["duration"];
}

/**
 * **概要 / Overview**
 *
 * - トーストはアクションの発生時にユーザーへフィードバックを行うために使用するコンポーネントです。
 * - en: Toasts are used to provide feedback to users when actions occur.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <>
 *   <Toaster />
 *   <Button onClick={() => toast({
 *     title: "保存しました",
 *     description: "1件の変更が反映されました",
 *   })}>
 *     トーストを表示
 *   </Button>
 * </>
 * ```
 *
 * **アンチパターン / Anti-patterns**
 *
 * - 画面のコードから `sonner` を直接 import しないでください。`Toaster` と `toast` はこの Toast のモジュール（npm パッケージなら `sparkle-design/toast`）から import します。
 *   en: Do not import `sonner` directly in your screens. Import `Toaster` and `toast` from this Toast module (`sparkle-design/toast` when using the npm package).
 *
 * ```tsx
 * // ✅ Correct
 * import { Toaster, toast } from "sparkle-design/toast";
 * toast({ description: "保存しました" });
 *
 * // ❌ Wrong - sonner を直接使わない
 * import { Toaster, toast } from "sonner";
 * toast("保存しました");
 * ```
 *
 * @param {ToastProps} props
 */
export function Toast({
  className,
  title,
  description,
  isCloseTrigger = true,
  id,
}: ToastProps) {
  return (
    <div
      role="status"
      className={cn(
        "shadow-float px-3 py-3 text-text-neutral-high flex w-[320px] rounded-notice gap-2 bg-surface-neutral-middle-enabled border border-border-neutral-middle",
        className
      )}
    >
      <div className="h-full flex flex-col justify-center gap-0 px-1 grow">
        {title && (
          <p className="character-3-bold-pro min-h-8 flex items-center">
            {title}
          </p>
        )}
        <p className="character-2-regular-pro min-h-8 flex items-center">
          {description}
        </p>
      </div>
      {isCloseTrigger && (
        <IconButton
          icon="close"
          size="sm"
          variant="ghost"
          theme="neutral"
          aria-label="閉じる"
          onClick={() => {
            sonnerToast.dismiss(id);
          }}
        />
      )}
    </div>
  );
}

/**
 * - トーストはアクションの発生時にユーザーへフィードバックを行うために使用するコンポーネントです。
 * - en: Toasts are used to provide feedback to users when actions occur.
 */
export function toast(props: Omit<ToastProps, "id" | "position">) {
  const { title, description, isCloseTrigger, ...rest } = props;
  return sonnerToast.custom(
    id => (
      <Toast
        title={title}
        description={description}
        isCloseTrigger={isCloseTrigger}
        id={id}
      />
    ),
    {
      ...rest,
      position: "top-center",
    }
  );
}

/**
 * sonner のトースト（li[data-sonner-toast]）のモーションを、モーショントークンに置き換えるクラス。
 * sonner の CSS はレイヤーの外に入るので、Tailwind のユーティリティは ! で上書きする
 * en: Classes replacing the motion of sonner's toasts (li[data-sonner-toast]) with the motion tokens.
 * sonner's CSS is unlayered, so the Tailwind utilities override it with !
 */
const TOAST_MOTION_CLASSNAME = [
  // 画面の上端の外（要素自身の高さの 140%）から入り、退場でそこへ戻る。reduced-motion では移動しない
  // en: Enters from above the screen edge (140% of its own height) and exits back there. No movement under reduced motion
  "data-[mounted=false]:[--y:translateY(-140%)]!",
  "data-[removed=true]:data-[front=true]:[--y:translateY(-140%)]!",
  "motion-reduce:data-[mounted=false]:[--y:translateY(0)]!",
  "motion-reduce:data-[removed=true]:data-[front=true]:[--y:translateY(0)]!",
  // 出現：移動は move、フェードは移動より長くしない
  // en: Enter: move for the slide, a fade no longer than the slide
  "[transition:transform_var(--motion-move-duration)_var(--motion-move-ease)_var(--motion-latency),opacity_var(--motion-toast-fade-duration)_var(--motion-fade-ease)_var(--motion-latency),height_var(--motion-settle-duration)_var(--motion-settle-ease)_var(--motion-latency)]!",
  // 新しいトーストが来たときの、後ろのトーストのずれは状態変化のスプリング
  // en: Toasts behind shift with the state-change spring when a new one arrives
  "data-[front=false]:[transition:transform_var(--motion-settle-duration)_var(--motion-settle-ease)_var(--motion-latency),opacity_var(--motion-toast-fade-duration)_var(--motion-fade-ease)_var(--motion-latency),height_var(--motion-settle-duration)_var(--motion-settle-ease)_var(--motion-latency)]!",
  // 退場は exit。sonner は閉じてから 200ms で要素を外す（変えられない）ので、途中で切れないよう 200ms までに抑える
  // （super-heavy の 240ms は 200ms になる）
  // en: Exit uses the exit tokens. sonner unmounts 200ms after closing (not configurable), so cap it at 200ms
  // to avoid a cut-off exit (super-heavy's 240ms becomes 200ms)
  "data-[removed=true]:data-[swiping=false]:[transition:transform_min(var(--motion-exit-duration),200ms)_var(--motion-exit-ease),opacity_min(var(--motion-exit-duration),200ms)_var(--motion-exit-ease)]!",
  // スワイプ中は指に追従させる
  // en: Follow the pointer while swiping
  "data-[mounted=true]:data-[swiping=true]:[transition:none]!",
].join(" ");

/**
 * **概要 / Overview**
 *
 * - トーストを表示する領域です。アプリに 1 つ置きます。sonner の Toaster に、モーショントークンで動くクラスを加えたものです。
 * - en: The region that shows toasts. Place one per app. sonner's Toaster with classes that move with the motion tokens.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Toaster />
 * ```
 *
 * @param {React.ComponentProps<typeof SonnerToaster>} props
 */
function Toaster({ toastOptions, ...props }: ReactToastProps) {
  return (
    <SonnerToaster
      {...props}
      toastOptions={{
        ...toastOptions,
        className: cn(TOAST_MOTION_CLASSNAME, toastOptions?.className),
      }}
    />
  );
}

export { Toaster };
