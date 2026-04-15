import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import OpenInV0Container from "./OpenInV0Container";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: OpenInV0Container,
    },
  },
};

export default preview;
