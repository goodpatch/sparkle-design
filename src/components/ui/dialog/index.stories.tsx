import type { Meta, StoryObj } from "@storybook/react";
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
  title: "Components/Dialog",
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
          <DialogTitle>確認</DialogTitle>
          <DialogDescription>
            この操作を実行してもよろしいですか？
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
        <Button variant="outline">ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DialogIcon icon="warning" className="text-warning-500" />
            変更内容を破棄
          </DialogTitle>
          <DialogDescription>
            変更内容が保存されていません。このままページを移動すると変更内容が破棄されます。変更内容を破棄しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>キャンセル</DialogCancel>
          <DialogAction theme="negative">破棄</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Negative: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DialogIcon icon="error" className="text-negative-400" />
            アドレスを削除
          </DialogTitle>
          <DialogDescription>
            削除されたアドレスは復元できません。連絡先からアドレスを削除しますか？。
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
