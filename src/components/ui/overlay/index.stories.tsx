import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../button";
import { Overlay } from "./index";

const meta: Meta<typeof Overlay> = {
  title: "Overlay/Overlay",
  component: Overlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Playground: Story = {
  render: args => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative h-[300px] w-[420px] overflow-hidden rounded-lg border bg-background p-6">
        <p className="character-4-regular-pro">背景コンテンツ</p>
        <Button className="mt-4" onClick={() => setVisible(!visible)}>
          オーバーレイを{visible ? "隠す" : "表示"}
        </Button>
        {visible ? (
          <Overlay {...args} onClick={() => setVisible(false)}>
            <span className="sr-only">Overlay layer</span>
          </Overlay>
        ) : null}
      </div>
    );
  },
  args: {
    opacity: "md",
    blur: true,
  },
};
