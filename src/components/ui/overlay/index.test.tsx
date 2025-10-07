import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Overlay } from "./index";

describe("Overlay", () => {
  it("renders with default attributes", () => {
    // Given: デフォルトのオーバーレイをレンダリングする
    const { container } = render(<Overlay data-testid="overlay" />);

    // Then: オーバーレイが正しい data-slot とクラスを持つ
    const element = container.querySelector("[data-slot='overlay']");
    expect(element).not.toBeNull();
    expect(element).toHaveClass("fixed", "inset-0", "bg-black/50");
  });

  it("applies blur and opacity variants", () => {
    // Given: blur と opacity="lg" を指定してレンダリングする
    const { container } = render(<Overlay blur opacity="lg" />);

    // Then: 指定したスタイルが付与される
    const element = container.querySelector("[data-slot='overlay']");
    expect(element).toHaveClass("bg-black/70", "backdrop-blur-sm");
  });
});
