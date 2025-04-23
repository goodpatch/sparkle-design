import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./index";

const meta = {
  title: "Components/Select",
  component: SelectTrigger,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "セレクトを無効化します",
      defaultValue: false,
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "セレクトのサイズを指定します",
      defaultValue: "md",
    },
    isInvalid: {
      control: "boolean",
      description: "エラー状態を指定します",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof SelectTrigger>;

export const Default: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger className="w-[280px]" {...args}>
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
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger className="w-[240px]" size="sm" {...args}>
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
  render: (args) => (
    <Select>
      <SelectTrigger className="w-[240px]" size="md" {...args}>
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
  render: (args) => (
    <Select>
      <SelectTrigger className="w-[240px]" size="lg" {...args}>
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
  render: (args) => (
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
  render: (args) => (
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

export const DisabledWithInvalidState: Story = {
  render: (args) => (
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
