import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ClickableCard,
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

/**
 * クリッカブルなカードの例
 */
export const Clickable: Story = {
  render: () => (
    <ClickableCard
      onClick={() => {
        alert("clicked");
      }}
    >
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
    </ClickableCard>
  ),
};

/**
 * クリッカブルなカードが無効な状態の例
 */
export const ClickableDisabled: Story = {
  render: () => (
    <ClickableCard
      onClick={() => {
        alert("clicked");
      }}
      isDisabled
    >
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
    </ClickableCard>
  ),
};
