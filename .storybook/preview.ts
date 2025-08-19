import type { Preview } from "@storybook/react";
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
      // Docsページで除外
      argTypes: { exclude: ["onMouseDown", "onPointerDown", "onTouchStart"] },
      // Controls表でも除外（Docs内のControlsブロック）
      controls: { exclude: ["onMouseDown", "onPointerDown", "onTouchStart"] },
    },
  },
};

export default preview;
