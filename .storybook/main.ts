import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
  ],

  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },

  // When outputting Storybook to `public/storybook`, copying from `public`
  // causes a self-copy error. Disable staticDirs to avoid this.
  staticDirs: [],

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
