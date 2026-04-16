import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectTriggerProps,
} from "./index";

const meta = {
  title: "Form/Select",
  component: Select,
  subcomponents: {
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<SelectTriggerProps>;
const argTypes: Story["argTypes"] = {
  disabled: {
    control: "boolean",
    defaultValue: false,
  },
  size: {
    control: { type: "radio" },
    options: ["sm", "md", "lg"],
    defaultValue: "md",
  },
  isInvalid: {
    control: "boolean",
    defaultValue: false,
  },
};

export const Default: Story = {
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[480px]" {...args}>
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot" disabled>
            Bolivia Time (BOT)
          </SelectItem>
          <SelectSeparator />
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[240px]" {...args}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Medium: Story = {
  args: {
    size: "md",
  },
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[240px]" {...args}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[240px]" {...args}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[240px]" isInvalid {...args}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[240px]" disabled {...args}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * 開閉モーション（パネル浮き上がり + chevron 回転 + チェックマーク出現）の確認用。
 * en: For verifying open/close motion (panel float-up + chevron rotation + checkmark appearance).
 */
export const MotionPreview: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "開閉を繰り返してモーションを確認する。**パネル open**：opacity + translateY(6px→0) + scale(0.97→1)、200ms cubic-bezier(0.16,1,0.3,1)。**パネル close**：opacity + translateY(0→4px) + scale(1→0.97)、150ms ease-in。**chevron**：open で 180° 回転、close で戻る（200ms / 150ms）。**チェックマーク**：選択直後に scale(0)→scale(1) + opacity(0)→opacity(1)、120ms ease-out。\n\nen: Open/close repeatedly to verify motion. Panel open: opacity + translateY(6px→0) + scale(0.97→1), 200ms cubic-bezier(0.16,1,0.3,1). Panel close: opacity + translateY(0→4px) + scale(1→0.97), 150ms ease-in. Chevron: rotates 180° on open, returns on close. Checkmark: scale(0)→scale(1) + opacity immediately on selection, 120ms ease-out.",
      },
    },
  },
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
        <SelectSeparator />
        <SelectItem value="4">オプション4</SelectItem>
        <SelectItem value="5">オプション5</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const DisabledWithInvalidState: Story = {
  argTypes: argTypes,
  render: args => (
    <Select>
      <SelectTrigger className="w-[240px]" disabled isInvalid {...args}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">オプション1</SelectItem>
        <SelectItem value="2">オプション2</SelectItem>
        <SelectItem value="3">オプション3</SelectItem>
      </SelectContent>
    </Select>
  ),
};
