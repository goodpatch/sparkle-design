import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  Card,
  CardContent,
  CardControl,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ClickableCard,
} from "./index";

const meta: Meta<typeof Card> = {
  title: "Data Display/Card",
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
          タイトル
          <CardDescription>
            <div className="border border-dashed border-purple-300 text-purple-300">
              SLOT
            </div>
          </CardDescription>
        </CardTitle>
        <CardControl>
          <div className="border border-dashed border-purple-300 text-purple-300">
            SLOT
          </div>
        </CardControl>
      </CardHeader>
      <CardContent>
        <div className="border border-dashed border-purple-300 text-purple-300 w-[272px]">
          SLOT
        </div>
      </CardContent>
      <CardFooter>
        <div className="border border-dashed border-purple-300 text-purple-300">
          SLOT
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * クリッカブルなカードの例
 */
export const Clickable: Story = {
  render: () => (
    <ClickableCard onClick={action("clicked")}>
      <CardHeader>
        <CardTitle>
          タイトル
          <CardDescription>
            <div className="border border-dashed border-purple-300 text-purple-300">
              SLOT
            </div>
          </CardDescription>
        </CardTitle>
        <CardControl>
          <div className="border border-dashed border-purple-300 text-purple-300">
            SLOT
          </div>
        </CardControl>
      </CardHeader>
      <CardContent>
        <div className="border border-dashed border-purple-300 text-purple-300 w-[272px]">
          SLOT
        </div>
      </CardContent>
    </ClickableCard>
  ),
};

/**
 * クリッカブルなカードが無効な状態の例
 */
export const ClickableDisabled: Story = {
  render: () => (
    <ClickableCard onClick={action("clicked")} isDisabled>
      <CardHeader>
        <CardTitle>
          タイトル
          <CardDescription>
            <div className="border border-dashed border-purple-300 text-purple-300">
              SLOT
            </div>
          </CardDescription>
        </CardTitle>
        <CardControl>
          <div className="border border-dashed border-purple-300 text-purple-300">
            SLOT
          </div>
        </CardControl>
      </CardHeader>
      <CardContent>
        <div className="border border-dashed border-purple-300 text-purple-300 w-[272px]">
          SLOT
        </div>
      </CardContent>
    </ClickableCard>
  ),
};
