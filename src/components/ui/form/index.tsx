/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
"use client";

import * as React from "react";
import { Label as LabelPrimitive, Slot } from "radix-ui";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/form/label";
import { Tag } from "@/components/ui/tag";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * **概要 / Overview**
 *
 * - フォームはフォームの入力要素・ラベル・ヘルパーテキストを包括して提供するために使用するコンポーネントです。
 * - en: The Form component is used to encapsulate form input elements, labels, and helper text.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Form {...form}>
 *   <FormField
 *     control={form.control}
 *     name="example"
 *     render={({ field, fieldState }) => (
 *       <FormItem>
 *         <FormHeader label="ラベル" />
 *         <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
 *         <FormControl>
 *           <Input
 *             placeholder="プレースホルダー"
 *             {...field}
 *             {...fieldState}
 *             isInvalid={fieldState.invalid}
 *           />
 *         </FormControl>
 *         <FormErrorMessage />
 *       </FormItem>
 *     )}
 *   />
 * </Form>
 * ```
 */
function Form(props: React.ComponentProps<typeof FormProvider>) {
  return <FormProvider {...props} />;
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

/**
 * **概要 / Overview**
 *
 * - フォームフィールドはフォームの各入力要素を管理するために使用するコンポーネントです。
 * - en: The FormField component is used to manage each input element of the form.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="example"
 *   render={({ field, fieldState }) => (
 *    <FormItem>
 *       <FormHeader label="ラベル" />
 *       <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
 *       <FormControl>
 *         <Input
 *           placeholder="プレースホルダー"
 *           {...field}
 *           {...fieldState}
 *           isInvalid={fieldState.invalid}
 *         />
 *       </FormControl>
 *       <FormErrorMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

/**
 * **概要 / Overview**
 *
 * - フォームアイテムはフォームフィールドのラベル、入力要素、ヘルパーテキストをグループ化するために使用するコンポーネントです。
 * - en: The FormItem component is used to group the label, input elements, and helper text of a form field.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <FormItem>
 *   <FormHeader label="ラベル" />
 *   <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
 *   <FormControl>
 *     <Input placeholder="プレースホルダー" {...field} {...fieldState} isInvalid={fieldState.invalid} />
 *   </FormControl>
 *   <FormErrorMessage />
 * </FormItem>
 * ```
 */
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid content-start", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={className}
      htmlFor={formItemId}
      {...props}
    />
  );
}

export interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * ラベルのテキスト
   * en: Text of the label
   */
  label: string;
  /**
   * 必須フィールドかどうか
   * en: Whether it is a required field
   */
  isRequired?: boolean;
  /**
   * ヘルプテキスト
   * en: Help text
   */
  helpText?: string;
}

/**
 * **概要 / Overview**
 *
 * - フォームヘッダーはフォームフィールドのラベル、必須マーク、ヘルプテキストを表示するために使用するコンポーネントです。
 * - en: The FormHeader component is used to display the label, required mark, and help text of a form field.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <FormHeader label="ラベル" isRequired helpText="ヘルプテキスト" />
 * ```
 */
function FormHeader({
  className,
  label,
  isRequired,
  helpText,
  ...props
}: FormHeaderProps) {
  return (
    <div className={cn("flex gap-2 h-fit items-center", className)} {...props}>
      <FormLabel>{label}</FormLabel>
      {isRequired && (
        <Tag status="negative" size="sm" variant="subtle">
          必須
        </Tag>
      )}
      {helpText && (
        <Tooltip>
          <TooltipTrigger className="flex items-center">
            <Icon icon="help" size={5} className="cursor-help text-text-low" />
          </TooltipTrigger>
          <TooltipContent>{helpText}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

/**
 * **概要 / Overview**
 *
 * - フォームコントロールはフォームフィールドの入力要素をラップするために使用するコンポーネントです。
 * - en: The FormControl component is used to wrap the input elements of a form field.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <FormControl>
 *   <Input placeholder="プレースホルダー" {...field} {...fieldState} isInvalid={fieldState.invalid} />
 * </FormControl>
 * ```
 */
function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <div className="py-1">
      <Slot.Root
        data-slot="form-control"
        id={formItemId}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />
    </div>
  );
}

/**
 * **概要 / Overview**
 *
 * - フォームヘルパーメッセージはフォームフィールドの補足説明やヒントを表示するために使用するコンポーネントです。
 * - en: The FormHelperMessage component is used to display supplementary explanations or hints for form fields.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
 * ```
 */
function FormHelperMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-text-low character-2-regular-pro", className)}
      {...props}
    />
  );
}

/**
 * **概要 / Overview**
 *
 * - フォームエラーメッセージはフォームフィールドのバリデーションエラーを表示するために使用するコンポーネントです。
 * - en: The FormErrorMessage component is used to display validation errors for form fields.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <FormErrorMessage />
 * ```
 */
function FormErrorMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        "flex gap-1 items-center text-negative-500 character-1-regular-pro",
        className
      )}
      {...props}
    >
      <Icon icon="error" size={3} />
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormHeader,
  FormControl,
  FormHelperMessage,
  FormErrorMessage,
  FormField,
};
