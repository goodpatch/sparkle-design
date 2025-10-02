import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index";

const meta: Meta<typeof Form> = {
  title: "Form/Form Control",
  component: Form,
  subcomponents: {
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
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
  args: {
    // デフォルトの引数をここに設定
  },
};
