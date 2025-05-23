import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalContent,
  ModalTrigger,
  ModalTitle,
  ModalDescription,
} from "./index";
import { useState } from "react";
import { Button } from "../button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>モーダルを開く</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalTitle>タイトル</ModalTitle>
          <ModalDescription>これはデフォルトのモーダルです。</ModalDescription>
        </ModalContent>
      </Modal>
    );
  },
};

export const SizeVariants: Story = {
  render: () => {
    const [open, setOpen] = useState<null | string>(null);
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;
    return (
      <div style={{ display: "flex", gap: 16 }}>
        {sizes.map((size) => (
          <div key={size}>
            <Button onClick={() => setOpen(size)}>Open {size}</Button>
            <Modal
              open={open === size}
              onOpenChange={(v) => (v ? setOpen(size) : setOpen(null))}
            >
              <ModalContent size={size}>
                <ModalTitle>サイズ: {size}</ModalTitle>
                <ModalDescription>
                  {size}サイズのモーダルです。
                </ModalDescription>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};
