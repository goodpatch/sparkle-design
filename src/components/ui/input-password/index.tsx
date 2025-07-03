import * as React from "react";
import { Input, type InputProps } from "@/components/ui/input";

export interface InputPasswordProps
  extends Omit<
    InputProps,
    | "type"
    | "iconButtonIcon"
    | "isIconButtonEnable"
    | "onIconButtonClick"
    | "iconButtonAriaLabel"
  > {}

/**
 * ## 概要 / Overview
 *
 * - インプットパスワードは、パスワードの情報をユーザーから取得するために使用するコンポーネントです。
 * - en: The InputPassword component is used to obtain password information from users.
 *
 * ## プロパティ / Props
 *
 * @param props.size 入力フィールドのサイズ（sm、md、lg） /
 * en: Input field size (sm, md, lg)
 * @param props.isInvalid フィールドが無効かどうか /
 * en: Whether the field is invalid
 * @param props.isDisabled フィールドが無効化されているかどうか /
 * en: Whether the field is disabled
 * @param props.placeholder プレースホルダーテキスト /
 * en: Placeholder text
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <InputPassword
 *   size="md"
 *   placeholder="パスワードを入力してください"
 * />
 * ```
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
        iconButtonIcon={isVisibility ? "visibility_off" : "visibility"}
        iconButtonAriaLabel={
          isVisibility ? "パスワードを隠す" : "パスワードを表示する"
        }
        isIconButtonEnable={true}
        onIconButtonClick={handleTogglePasswordVisibility}
        {...props}
      />
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
