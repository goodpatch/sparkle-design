import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../button";
import { Input } from "../input";
import { Radio, RadioItem } from "../radio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Textarea } from "../textarea";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormHeader,
  FormHelperMessage,
  FormItem,
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

const formSchema = z.object({
  username: z.string().min(2, {
    error: "ユーザー名は2文字以上である必要があります。",
  }),
  email: z.email({
    error: "有効なメールアドレスを入力してください。",
  }),
  type: z.enum(["personal", "company"], {
    error: "アカウント種別を選択してください。",
  }),
  role: z.enum(["developer", "designer", "manager"], {
    error: "役割を選択してください。",
  }),
  bio: z.string().max(160).min(4, {
    error: "自己紹介は4文字以上160文字以内で入力してください。",
  }),
});
type FormValues = z.infer<typeof formSchema>;

export const Default: Story = {
  render: () => {
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        bio: "",
        type: "personal",
        role: "developer",
      },
    });

    function onSubmit(values: FormValues) {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-96"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormHeader label="ユーザー名" isRequired />
                <FormHelperMessage>
                  表示名として使用されます。
                </FormHelperMessage>
                <FormControl>
                  <Input
                    placeholder="sparkle"
                    {...field}
                    isInvalid={fieldState.invalid}
                  />
                </FormControl>
                <FormErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormHeader label="メールアドレス" isRequired />
                <FormControl>
                  <Input
                    placeholder="hello@example.com"
                    {...field}
                    isInvalid={fieldState.invalid}
                  />
                </FormControl>
                <FormErrorMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormHeader label="アカウント種別" isRequired />
                  <FormControl>
                    <Radio onValueChange={field.onChange} value={field.value}>
                      <RadioItem value="personal" label="個人" />
                      <RadioItem value="company" label="法人" />
                    </Radio>
                  </FormControl>
                  <FormErrorMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormHeader label="役割" isRequired />
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">開発者</SelectItem>
                        <SelectItem value="designer">デザイナー</SelectItem>
                        <SelectItem value="manager">マネージャー</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormErrorMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormHeader label="自己紹介" />
                <FormControl>
                  <Textarea
                    placeholder="2026年生まれ、東京育ち"
                    className="resize-none"
                    {...field}
                    isInvalid={fieldState.invalid}
                  />
                </FormControl>
                <FormErrorMessage />
              </FormItem>
            )}
          />

          <Button type="submit">送信</Button>
        </form>
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
                  placeholder="プレースホルダー"
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
    const form = useForm();

    useEffect(() => {
      form.setError("example", {
        type: "manual",
        message: "エラーメッセージ",
      });
    }, [form]);

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
                  placeholder="プレースホルダー"
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
