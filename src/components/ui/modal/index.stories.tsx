import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button";
import {
  Modal,
  ModalContent,
  ModalTrigger,
  ModalTitle,
  ModalBody,
  ModalHeader,
  ModalClose,
  ModalFooter,
} from "./index";

const meta: Meta<typeof Modal> = {
  title: "Overlay/Modal",
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
          <ModalHeader>
            <ModalTitle>タイトル</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <p>これはデフォルトのモーダルです。</p>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              theme="neutral"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              保存
            </Button>
          </ModalFooter>
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
        {sizes.map(size => (
          <div key={size}>
            <Button onClick={() => setOpen(size)}>Open {size}</Button>
            <Modal
              open={open === size}
              onOpenChange={v => (v ? setOpen(size) : setOpen(null))}
            >
              <ModalContent size={size}>
                <ModalHeader>
                  <ModalTitle>モーダルサイズ: {size}</ModalTitle>
                  <ModalClose />
                </ModalHeader>
                <ModalBody>
                  <p>{size}サイズのモーダルです。</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    theme="neutral"
                    variant="ghost"
                    onClick={() => setOpen(null)}
                  >
                    キャンセル
                  </Button>
                  <Button size="sm" onClick={() => setOpen(null)}>
                    保存
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};

export const HeaderHidden: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>ヘッダー非表示</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalBody>
            <p>ヘッダーが非表示のモーダルです。</p>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              theme="neutral"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const CloseButtonHidden: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>クローズボタン非表示</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>タイトル</ModalTitle>
            {/* クローズボタンを非表示にするため省略 */}
          </ModalHeader>
          <ModalBody>
            <p>クローズボタンが非表示のモーダルです。</p>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              theme="neutral"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const FooterHidden: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>フッター非表示</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>タイトル</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <p>フッターが非表示のモーダルです。</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  },
};
