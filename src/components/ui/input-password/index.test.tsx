import React, { act } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ReactDOM from "react-dom/client";
import { InputPassword } from "./index";

let container: HTMLDivElement | null = null;
let root: ReactDOM.Root | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = ReactDOM.createRoot(container);
});

afterEach(() => {
  if (root) {
    act(() => {
      root!.unmount();
    });
    root = null;
  }
  if (container) {
    document.body.removeChild(container);
    container = null;
  }
});

describe("InputPassword", () => {
  it("toggles input type when icon button is clicked", () => {
    act(() => {
      root!.render(<InputPassword />);
    });
    const input = container!.querySelector("input")!;
    const button = container!.querySelector("button")!;

    expect(input.getAttribute("type")).toBe("password");

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(input.getAttribute("type")).toBe("text");

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(input.getAttribute("type")).toBe("password");
  });
});
