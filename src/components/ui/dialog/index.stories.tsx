import type { Meta, StoryObj } from "@storybook/react";
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
import { Button } from "../button";
import { Icon } from "../icon";

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
        <Button variant="outline">警告ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DialogIcon icon="warning" className="text-warning-500" />
            警告
          </DialogTitle>
          <DialogDescription>
            この操作は取り消せません。続行しますか？
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
            エラー
          </DialogTitle>
          <DialogDescription>
            予期しないエラーが発生しました。後でもう一度お試しください。
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
