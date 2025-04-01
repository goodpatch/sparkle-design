import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";
import { ReactNode } from "react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * 基本的なカードの例
 */
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>
          タイトル<div className="border border-info text-text-low">SLOT</div>
        </CardTitle>
        <CardDescription>
          <div className="border border-info text-text-low">SLOT</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-info text-text-low w-[272px]">SLOT</div>
      </CardContent>
      <CardFooter>
        <div className="border border-info text-text-low">SLOT</div>
      </CardFooter>
    </Card>
  ),
};
