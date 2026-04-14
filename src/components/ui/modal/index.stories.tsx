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
  subcomponents: {
    ModalContent,
    ModalTrigger,
    ModalTitle,
    ModalBody,
    ModalHeader,
    ModalClose,
    ModalFooter,
  },
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

export const EnabledOverlayClickToClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>オーバーレイクリックで閉じる</Button>
        </ModalTrigger>
        <ModalContent closeOnOverlayClick>
          <ModalHeader>
            <ModalTitle>タイトル</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <p>オーバーレイクリックで閉じるモーダルです。</p>
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

/**
 * 開閉モーション（オーバーレイフェード＋パネル fade／zoom）の確認用。
 * en: For verifying open/close motion (overlay fade + panel fade/zoom).
 */
export const MotionPreview: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "全画面レイアウトでスクリムとパネルの動きを確認する。**開く**：トリガーボタン。**閉じる**：×／キャンセル／保存／Esc。オーバーレイクリックは既定で閉じない（仕様確認用）。オーバーレイはフェード（Open 150ms / Close 200ms）、コンテンツは opacity + translateY + scale（Open 240ms / delay 20ms、Close 200ms）で出入りする。Close 時はオーバーレイとコンテンツが同時（各 200ms）に退場し、背景が先に見えてしまう状態を防ぐ。\n\nen: Use fullscreen to judge scrim and panel motion. Trigger opens; close via ×, footer buttons, or Esc. Overlay fades (open 150ms, close 200ms). Content enters/leaves with opacity + translateY + scale (open 240ms with 20ms delay, close 200ms). On close, both overlay and content exit simultaneously at 200ms so the background never shows prematurely.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <Modal open={open} onOpenChange={setOpen}>
          <ModalTrigger asChild>
            <Button>モーダルを開く（モーション確認）</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>モーション確認</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              <p className="text-pretty">
                開閉を繰り返して、オーバーレイのフェードとパネルのスケール／不透明度の同期を確認してください。
              </p>
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
      </div>
    );
  },
};
