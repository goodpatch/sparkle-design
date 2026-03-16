/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";
import { Input, type InputProps } from "@/components/ui/input";

export interface InputPasswordProps
  extends Omit<
    InputProps,
    | "type"
    | "triggerIcon"
    | "triggerAriaLabel"
    | "isTrigger"
    | "onIconButtonClick"
  > {}

/**
 * **概要 / Overview**
 *
 * - インプットパスワードはパスワードの情報をユーザーから取得するために使用するコンポーネントです。
 * - en: The InputPassword component is used to capture password information from users.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <InputPassword
 *   size="md"
 *   placeholder="パスワードを入力してください"
 * />
 * ```
 *
 * @param {InputPasswordProps} props
 */
const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    // パスワードの表示状態を管理
    const [isVisibility, setIsVisibility] = React.useState(false);

    // パスワード表示切り替えハンドラー
    const handleTogglePasswordVisibility = React.useCallback(() => {
      setIsVisibility(prev => !prev);
    }, []);

    return (
      <Input
        ref={ref}
        type={isVisibility ? "text" : "password"}
        triggerIcon={isVisibility ? "visibility_off" : "visibility"}
        triggerAriaLabel={
          isVisibility ? "パスワードを隠す" : "パスワードを表示する"
        }
        isTrigger={true}
        onIconButtonClick={handleTogglePasswordVisibility}
        {...props}
      />
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
