/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TestContainer } from "@/test/helpers";
import { Tooltip, TooltipTrigger, TooltipContent } from "./index";

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Tooltip", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it("renders TooltipTrigger and TooltipContent correctly", async () => {
    // Given: TooltipTriggerとTooltipContentを含むTooltipコンポーネントがレンダリングされる
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent side="top">Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: TooltipTriggerが表示される
    expect(screen.getByText("Hover me")).toBeInTheDocument();

    // Then: ユーザーがTooltipTriggerにホバーするとTooltipContentが表示される
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    const tooltipContents = await screen.findAllByText("Tooltip Content");
    const visibleTooltip = tooltipContents.find(
      content => content.getAttribute("data-state") === "delayed-open"
    );
    expect(visibleTooltip).toBeInTheDocument();
  });

  it("displays TooltipContent on hover", async () => {
    // Given: TooltipContentが含まれるTooltipコンポーネントがレンダリングされる
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: ユーザーがTooltipTriggerにホバーする
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    // Then: TooltipContentが表示されることを確認する
    const tooltipContents = await screen.findAllByText("Tooltip Content");
    const visibleTooltip = tooltipContents.find(
      content => content.getAttribute("data-state") === "delayed-open"
    );
    expect(visibleTooltip).toBeVisible();
  });

  it("renders with default side when no side is provided", async () => {
    // Given: TooltipContentにsideが指定されていない
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: ユーザーがTooltipTriggerにホバーする
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    // Then: TooltipContentのdata-side属性がデフォルト値"top"であることを確認する
    const tooltipContents = await screen.findAllByText("Tooltip Content");
    const visibleTooltip = tooltipContents.find(
      content => content.getAttribute("data-state") === "delayed-open"
    );
    expect(visibleTooltip).toHaveAttribute("data-side", "top");
  });

  it("applies the correct side to TooltipContent", async () => {
    // Given: TooltipContentにside="right"が指定されている
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent side="right">Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: ユーザーがTooltipTriggerにホバーする
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    // Then: TooltipContentのdata-side属性が"right"であることを確認する
    const tooltipContents = await screen.findAllByText("Tooltip Content");
    const visibleTooltip = tooltipContents.find(
      content => content.getAttribute("data-state") === "delayed-open"
    );
    expect(visibleTooltip).toHaveAttribute("data-side", "right");
  });

  it("applies Figma tokens to the content and arrow", async () => {
    // Figma: Tooltip 973:684（2026-10-01 取得）
    // en: Figma Tooltip 973:684 (retrieved 2026-10-01)
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Token</TooltipTrigger>
        <TooltipContent side="top">Token Content</TooltipContent>
      </Tooltip>
    );
    await userEvent.hover(screen.getByText("Token"));
    await screen.findAllByText("Token Content");
    const content = document.querySelector(
      '[data-slot="tooltip-content"]'
    ) as HTMLElement;
    expect(content).toBeTruthy();
    ["bg-surface-inverse", "text-text-inverse", "rounded-notice"].forEach(cls =>
      expect(content.className).toContain(cls)
    );
    const arrow = content.querySelector("svg") as SVGElement;
    expect(arrow).toBeTruthy();
    const arrowClass = arrow.getAttribute("class") ?? "";
    ["bg-surface-inverse", "fill-surface-inverse"].forEach(cls =>
      expect(arrowClass).toContain(cls)
    );
  });
});
