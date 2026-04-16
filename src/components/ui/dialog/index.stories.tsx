import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../button";
import { Icon } from "../icon";
import {
  Dialog,
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
} from "./index";

const meta: Meta<typeof Dialog> = {
  title: "Overlay/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // 引数の設定
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Neutral: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ネットワークを再試行</DialogTitle>
          <DialogDescription>
            通信状態を確認し、再度お試しください。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>キャンセル</DialogCancel>
          <DialogAction>続行</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Warning: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">警告ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DialogIcon icon="warning" className="text-warning-500" />
            変更内容を保存せずに移動
          </DialogTitle>
          <DialogDescription>
            このまま画面を離れると変更内容が保存されません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>キャンセル</DialogCancel>
          <DialogAction>再試行</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Negative: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ネガティブダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DialogIcon icon="error" className="text-negative-400" />
            アドレスを削除
          </DialogTitle>
          <DialogDescription>
            連絡先からアドレスを削除します。削除されたアドレスは復元できません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>キャンセル</DialogCancel>
          <DialogAction theme="negative">削除</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
