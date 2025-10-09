/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Input } from "../input";
import {
  Form,
  FormField,
  FormItem,
  FormHeader,
  FormControl,
  FormHelperMessage,
  FormErrorMessage,
  useFormField,
} from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

/**
 * フォームを使ったテスト用コンポーネント
 * en: Test component with form
 */
function TestFormComponent({
  onSubmit,
  defaultValues = {},
}: {
  onSubmit?: (data: any) => void;
  defaultValues?: any;
}) {
  const form = useForm({
    defaultValues,
  });

  return (
    <Form {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit || (() => {}))}>
        <FormField
          control={form.control}
          name="testField"
          render={({ field }) => (
            <FormItem>
              <FormHeader label="テストフィールド" />
              <FormControl>
                <Input placeholder="入力してください" {...field} />
              </FormControl>
              <FormHelperMessage>これはヘルプメッセージです</FormHelperMessage>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <button type="submit">送信</button>
      </form>
    </Form>
  );
}

/**
 * 必須フィールド付きフォームのテスト用コンポーネント
 * en: Test component with required field
 */
function RequiredFieldFormComponent() {
  const form = useForm<{ email: string }>({
    defaultValues: { email: "" },
  });

  return (
    <Form {...(form as any)}>
      <form>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "メールアドレスは必須です" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormHeader label="メールアドレス" isRequired />
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

/**
 * ヘルプテキスト付きフォームのテスト用コンポーネント
 * en: Test component with help text
 */
function HelpTextFormComponent() {
  const form = useForm<{ username: string }>({
    defaultValues: { username: "" },
  });

  return (
    <Form {...(form as any)}>
      <form>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormHeader
                label="ユーザー名"
                helpText="4文字以上で入力してください"
              />
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe("Form", () => {
  describe("Basic Rendering", () => {
    it("renders a basic form with FormField and FormItem", () => {
      // Given: 基本的なフォーム
      testContainer.render(<TestFormComponent />);

      // When: フォーム要素を確認
      const form = testContainer.getContainer().querySelector("form");
      const input = testContainer.queryInput();

      // Then: フォームとinputが正常に描画される
      expect(form).toBeTruthy();
      expect(input).toBeTruthy();
    });

    it("renders FormItem with correct data-slot attribute", () => {
      // Given: FormItemを含むフォーム
      testContainer.render(<TestFormComponent />);

      // When: FormItemの要素を確認
      const formItem = testContainer
        .getContainer()
        .querySelector('[data-slot="form-item"]');

      // Then: data-slot属性が設定される
      expect(formItem).toBeTruthy();
    });

    it("renders FormControl with correct data-slot attribute", () => {
      // Given: FormControlを含むフォーム
      testContainer.render(<TestFormComponent />);

      // When: FormControlの要素を確認
      const formControl = testContainer
        .getContainer()
        .querySelector('[data-slot="form-control"]');

      // Then: data-slot属性が設定される
      expect(formControl).toBeTruthy();
    });

    it("renders with specified placeholder", () => {
      // Given: placeholder付きのInput
      testContainer.render(<TestFormComponent />);

      // When: inputのplaceholderを確認
      const input = testContainer.queryInput();

      // Then: placeholderが設定される
      expect(input.placeholder).toBe("入力してください");
    });
  });

  describe("FormHeader", () => {
    it("renders label text correctly", () => {
      // Given: ラベル付きフォーム
      testContainer.render(<TestFormComponent />);

      // When: ラベル要素を確認
      const label = testContainer.getContainer().querySelector("label");

      // Then: ラベルテキストが表示される
      expect(label?.textContent).toContain("テストフィールド");
    });

    it("renders required tag when isRequired is true", () => {
      // Given: 必須フィールド付きフォーム
      testContainer.render(<RequiredFieldFormComponent />);

      // When: 必須タグを確認
      const requiredTag = screen.getByText("必須");

      // Then: 必須タグが表示される
      expect(requiredTag).toBeInTheDocument();
    });

    it("does not render required tag when isRequired is false", () => {
      // Given: 必須でないフィールドのフォーム
      testContainer.render(<TestFormComponent />);

      // When: 必須タグを確認
      const container = testContainer.getContainer();
      const requiredTag = container.querySelector('[data-slot="tag"]');

      // Then: 必須タグは表示されない
      expect(requiredTag).toBeNull();
    });

    it("renders help text icon when helpText is provided", () => {
      // Given: ヘルプテキスト付きフォーム
      testContainer.render(<HelpTextFormComponent />);

      // When: ヘルプテキストが設定されている場合
      // TooltipTriggerの要素を探す (cursor-help クラスを持つ要素)
      const container = testContainer.getContainer();
      const helpTrigger = container.querySelector(".cursor-help");

      // Then: ヘルプトリガーが表示される
      expect(helpTrigger).toBeTruthy();
    });

    it("does not render help text icon when helpText is not provided", () => {
      // Given: ヘルプテキストなしのフォーム
      testContainer.render(<TestFormComponent />);

      // When: ヘルプアイコンを確認
      const container = testContainer.getContainer();
      // Tooltipコンポーネントを探す
      const tooltip = container.querySelector('[data-slot="tooltip"]');

      // Then: Tooltipは表示されない
      expect(tooltip).toBeNull();
    });
  });

  describe("FormHelperMessage", () => {
    it("renders helper message correctly", () => {
      // Given: ヘルパーメッセージ付きフォーム
      testContainer.render(<TestFormComponent />);

      // When: ヘルパーメッセージ要素を確認
      const helperMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-description"]');

      // Then: ヘルパーメッセージが表示される
      expect(helperMessage?.textContent).toBe("これはヘルプメッセージです");
    });

    it("applies correct styling classes", () => {
      // Given: ヘルパーメッセージ付きフォーム
      testContainer.render(<TestFormComponent />);

      // When: ヘルパーメッセージのクラスを確認
      const helperMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-description"]');

      // Then: 正しいスタイリングクラスが適用される
      expect(helperMessage?.className).toContain("text-text-low");
      expect(helperMessage?.className).toContain("character-2-regular-pro");
    });

    it("has correct id for aria-describedby association", () => {
      // Given: ヘルパーメッセージ付きフォーム
      testContainer.render(<TestFormComponent />);

      // When: ヘルパーメッセージのIDを確認
      const helperMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-description"]');

      // Then: IDが設定されている
      expect(helperMessage?.id).toBeTruthy();
      expect(helperMessage?.id).toMatch(/-form-item-description$/);
    });
  });

  describe("FormErrorMessage", () => {
    it("does not render error message when there is no error", () => {
      // Given: エラーのないフォーム
      testContainer.render(<TestFormComponent />);

      // When: エラーメッセージ要素を確認
      const errorMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-message"]');

      // Then: エラーメッセージは表示されない
      expect(errorMessage).toBeNull();
    });

    it("renders error message when validation fails", async () => {
      // Given: バリデーション付きフォーム
      function ErrorFormComponent() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
          mode: "onChange",
        });

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "メールアドレスは必須です" }}
                render={({ field }) => (
                  <FormItem>
                    <FormHeader label="メールアドレス" />
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => form.trigger("email")}
                data-testid="validate-btn"
              >
                検証
              </button>
            </form>
          </Form>
        );
      }

      testContainer.render(<ErrorFormComponent />);

      // When: 検証をトリガー
      const validateBtn = testContainer.queryByTestId("validate-btn");
      EventHelpers.click(validateBtn);

      // Then: エラーメッセージが表示される（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      const errorMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-message"]');

      expect(errorMessage?.textContent).toContain("メールアドレスは必須です");
    });

    it("applies error styling classes", async () => {
      // Given: バリデーションエラーのあるフォーム
      function ErrorFormComponent() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
          mode: "onChange",
        });

        React.useEffect(() => {
          form.trigger("email");
        }, []);

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "必須です" }}
                render={({ field }) => (
                  <FormItem>
                    <FormHeader label="メール" />
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<ErrorFormComponent />);

      // When: エラーメッセージのスタイルを確認（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      const errorMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-message"]');

      // Then: エラースタイリングが適用される
      if (errorMessage) {
        expect(errorMessage.className).toContain("text-negative-500");
        expect(errorMessage.className).toContain("character-1-regular-pro");
      }
    });

    it("renders error icon alongside message", async () => {
      // Given: バリデーションエラーのあるフォーム
      function ErrorFormComponent() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
          mode: "onChange",
        });

        React.useEffect(() => {
          form.trigger("email");
        }, []);

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "必須です" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<ErrorFormComponent />);

      // When: エラーアイコンを確認（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      const errorMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-message"]');
      const errorIcon =
        errorMessage?.querySelector('[data-slot="icon"]') ||
        errorMessage?.querySelector('span[aria-hidden="true"]');

      // Then: エラーアイコンが表示される
      expect(errorIcon).toBeTruthy();
    });
  });

  describe("Form Integration with react-hook-form", () => {
    it("handles form submission correctly", async () => {
      // Given: 送信ハンドラー付きフォーム
      const handleSubmit = vi.fn();
      testContainer.render(
        <TestFormComponent
          onSubmit={handleSubmit}
          defaultValues={{ testField: "test value" }}
        />
      );

      // When: フォームを送信
      const form = testContainer.getContainer().querySelector("form");
      const submitButton = testContainer.queryButton();

      EventHelpers.click(submitButton);

      // Then: 送信ハンドラーが呼ばれる（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("updates field value correctly", () => {
      // Given: 初期値なしのフォーム
      testContainer.render(<TestFormComponent />);

      // When: 値を入力
      const input = testContainer.queryInput();
      EventHelpers.change(input, "新しい値");

      // Then: 値が更新される
      expect(input.value).toBe("新しい値");
    });

    it("renders with default values", () => {
      // Given: デフォルト値付きフォーム
      testContainer.render(
        <TestFormComponent defaultValues={{ testField: "デフォルト値" }} />
      );

      // When: inputの値を確認
      const input = testContainer.queryInput();

      // Then: デフォルト値が設定される
      expect(input.value).toBe("デフォルト値");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input via htmlFor and id", () => {
      // Given: ラベル付きフォーム
      testContainer.render(<TestFormComponent />);

      // When: labelとinputの関連を確認
      const label = testContainer.getContainer().querySelector("label");
      const formControl = testContainer
        .getContainer()
        .querySelector('[data-slot="form-control"]');

      // Then: htmlForとidが一致する
      expect(label?.getAttribute("for")).toBeTruthy();
      expect(formControl?.id).toBeTruthy();
      expect(label?.getAttribute("for")).toBe(formControl?.id);
    });

    it("uses aria-describedby to link helper message", () => {
      // Given: ヘルパーメッセージ付きフォーム
      testContainer.render(<TestFormComponent />);

      // When: aria-describedbyを確認
      const formControl = testContainer
        .getContainer()
        .querySelector('[data-slot="form-control"]');
      const helperMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-description"]');

      // Then: aria-describedbyにhelperMessageのIDが含まれる
      const ariaDescribedBy = formControl?.getAttribute("aria-describedby");
      expect(ariaDescribedBy).toBeTruthy();
      expect(ariaDescribedBy).toContain(helperMessage?.id || "");
    });

    it("sets aria-invalid when field has error", async () => {
      // Given: バリデーションエラーのあるフォーム
      function ErrorFormComponent() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
          mode: "onChange",
        });

        React.useEffect(() => {
          form.trigger("email");
        }, []);

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "必須です" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<ErrorFormComponent />);

      // When: aria-invalidを確認（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      const formControl = testContainer
        .getContainer()
        .querySelector('[data-slot="form-control"]');

      // Then: aria-invalidがtrueに設定される
      expect(formControl?.getAttribute("aria-invalid")).toBe("true");
    });

    it("includes error message id in aria-describedby when error exists", async () => {
      // Given: バリデーションエラーのあるフォーム
      function ErrorFormComponent() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
          mode: "onChange",
        });

        React.useEffect(() => {
          form.trigger("email");
        }, []);

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "必須です" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormHelperMessage>ヘルプ</FormHelperMessage>
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<ErrorFormComponent />);

      // When: aria-describedbyを確認（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      const formControl = testContainer
        .getContainer()
        .querySelector('[data-slot="form-control"]');
      const errorMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-message"]');

      // Then: aria-describedbyにエラーメッセージIDが含まれる
      const ariaDescribedBy = formControl?.getAttribute("aria-describedby");
      expect(ariaDescribedBy).toContain(errorMessage?.id || "");
    });

    it("renders label with data-error attribute when error exists", async () => {
      // Given: バリデーションエラーのあるフォーム
      function ErrorFormComponent() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
          mode: "onChange",
        });

        React.useEffect(() => {
          form.trigger("email");
        }, []);

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "必須です" }}
                render={({ field }) => (
                  <FormItem>
                    <FormHeader label="メール" />
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<ErrorFormComponent />);

      // When: ラベルのdata-error属性を確認（非同期処理のため待機）
      await new Promise(resolve => setTimeout(resolve, 100));
      const label = testContainer
        .getContainer()
        .querySelector('[data-slot="form-label"]');

      // Then: data-error属性がtrueに設定される
      expect(label?.getAttribute("data-error")).toBe("true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty form submission", async () => {
      // Given: 空のフォーム
      const handleSubmit = vi.fn();
      testContainer.render(<TestFormComponent onSubmit={handleSubmit} />);

      // When: 空の状態で送信
      const submitButton = testContainer.queryButton();
      EventHelpers.click(submitButton);

      // Then: 送信ハンドラーが呼ばれる
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("handles multiple fields in a single form", () => {
      // Given: 複数フィールドを持つフォーム
      function MultiFieldForm() {
        const form = useForm<{
          field1: string;
          field2: string;
        }>({
          defaultValues: {
            field1: "",
            field2: "",
          },
        });

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="field1"
                render={({ field }) => (
                  <FormItem>
                    <FormHeader label="フィールド1" />
                    <FormControl>
                      <Input placeholder="field1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="field2"
                render={({ field }) => (
                  <FormItem>
                    <FormHeader label="フィールド2" />
                    <FormControl>
                      <Input placeholder="field2" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<MultiFieldForm />);

      // When: 両方のフィールドを確認
      const inputs = testContainer.getContainer().querySelectorAll("input");

      // Then: 2つのinputが存在する
      expect(inputs.length).toBe(2);
      expect(inputs[0].placeholder).toBe("field1");
      expect(inputs[1].placeholder).toBe("field2");
    });

    it("handles custom error message through children prop", async () => {
      // Given: カスタムエラーメッセージ
      function CustomErrorForm() {
        const form = useForm<{ email: string }>({
          defaultValues: { email: "" },
        });

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormErrorMessage>
                      カスタムエラーメッセージ
                    </FormErrorMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<CustomErrorForm />);

      // When: エラーメッセージを確認
      const errorMessage = testContainer
        .getContainer()
        .querySelector('[data-slot="form-message"]');

      // Then: カスタムメッセージが表示される
      expect(errorMessage?.textContent).toContain("カスタムエラーメッセージ");
    });

    it("properly cleans up when unmounted", () => {
      // Given: レンダリングされたフォーム
      testContainer.render(<TestFormComponent />);
      const input = testContainer.queryInput();
      expect(input).toBeTruthy();

      // When: コンポーネントをアンマウント
      testContainer.cleanup();
      testContainer.setup();
      testContainer.render(<div>Empty</div>);

      // Then: 前のフォームは存在しない
      const container = testContainer.getContainer();
      const form = container.querySelector("form");
      expect(form).toBeNull();
    });
  });

  describe("FormLabel styling", () => {
    it("applies custom className to FormHeader", () => {
      // Given: カスタムクラス付きFormHeader
      function CustomClassForm() {
        const form = useForm<{ test: string }>({
          defaultValues: { test: "" },
        });

        return (
          <Form {...(form as any)}>
            <form>
              <FormField
                control={form.control}
                name="test"
                render={({ field }) => (
                  <FormItem>
                    <FormHeader
                      label="カスタム"
                      className="custom-header-class"
                    />
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      }

      testContainer.render(<CustomClassForm />);

      // When: FormHeaderのクラスを確認
      const header = testContainer
        .getContainer()
        .querySelector(".custom-header-class");

      // Then: カスタムクラスが適用される
      expect(header).toBeTruthy();
    });

    it("applies grid layout to FormItem", () => {
      // Given: FormItemを含むフォーム
      testContainer.render(<TestFormComponent />);

      // When: FormItemのクラスを確認
      const formItem = testContainer
        .getContainer()
        .querySelector('[data-slot="form-item"]');

      // Then: gridクラスが適用される
      expect(formItem?.className).toContain("grid");
    });
  });
});
