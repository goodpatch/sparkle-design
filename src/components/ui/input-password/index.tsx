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
 * インプットパスワードはパスワードの情報をユーザーから取得するために使用するコンポーネントです。
 */
const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    // パスワードの表示状態を管理
    const [isVisibility, setIsVisibility] = React.useState(false);

    // パスワード表示切り替えハンドラー
    const handleTogglePasswordVisibility = React.useCallback(() => {
      setIsVisibility((prev) => !prev);
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
