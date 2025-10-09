import type { Meta, StoryObj } from "@storybook/react";
import { FieldError, useForm } from "react-hook-form";
import { Input } from "../input";
import {
  Form,
  FormControl,
  FormHelperMessage,
  FormField,
  FormItem,
  FormHeader,
  FormErrorMessage,
} from "./index";

const meta: Meta<typeof Form> = {
  title: "Form/Form",
  component: Form,
  subcomponents: {
    FormItem,
    FormHeader,
    FormControl,
    FormHelperMessage,
    FormErrorMessage,
    FormField,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // 引数の設定
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    const form = useForm();
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="example"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormHeader label="ラベル" />
              <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
              <FormControl>
                <Input
                  placeholder="入力してください"
                  {...field}
                  {...fieldState}
                  isInvalid={fieldState.invalid}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};

export const WithHeaderItem: Story = {
  render: () => {
    const form = useForm();
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="example"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormHeader label="ラベル" isRequired helpText="ヘルプテキスト" />
              <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
              <FormControl>
                <Input
                  placeholder="入力してください"
                  {...field}
                  {...fieldState}
                  isInvalid={fieldState.invalid}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};

export const Error: Story = {
  render: () => {
    const form = useForm({
      errors: { example: { message: "エラーメッセージ" } as FieldError },
    });
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="example"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormHeader label="ラベル" isRequired />
              <FormHelperMessage>ヘルプメッセージ</FormHelperMessage>
              <FormControl>
                <Input
                  placeholder="入力してください"
                  {...field}
                  {...fieldState}
                  isInvalid={fieldState.invalid}
                />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};
