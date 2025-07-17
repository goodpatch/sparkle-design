// Storybook のメイン設定ファイル
// en: Main configuration for Storybook
import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-a11y",
  ],

  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },

  // Storybook を `public/storybook` に出力する際は `public` からのコピーで
  // self-copy エラーが発生するため staticDirs を無効化します。
  // en: When outputting Storybook to `public/storybook`, copying from `public`
  // en: causes a self-copy error. Disable staticDirs to avoid this.
  staticDirs: [],

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
