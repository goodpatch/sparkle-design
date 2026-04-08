// Storybook のメイン設定ファイル
// en: Main configuration for Storybook
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

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

  // Vite のパスエイリアス設定
  // en: Configure Vite path aliases to resolve @/ imports
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(dirname, "../src"),
      };
    }
    return config;
  },
};
export default config;
