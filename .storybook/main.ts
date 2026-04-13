// Storybook のメイン設定ファイル
// en: Main configuration for Storybook
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],

  framework: "@storybook/nextjs-vite",

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
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
