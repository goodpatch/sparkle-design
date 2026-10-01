/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TestContainer, EventHelpers } from "@/test/helpers";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index";

describe("Tabs", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  describe("基本レンダリング / Basic Rendering", () => {
    it("Tabs, TabsList, TabsTrigger, TabsContentが正しくレンダリングされる", () => {
      // Given: タブ構造をレンダリング
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2">タブ2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容1</TabsContent>
          <TabsContent value="tab2">内容2</TabsContent>
        </Tabs>
      );
      // When: DOMを取得
      const triggers = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-trigger"]');
      const activeContent = Array.from(
        testContainer
          .getContainer()
          .querySelectorAll('[data-slot="tabs-content"]')
      ).find(el => el.getAttribute("data-state") === "active");
      // Then: トリガーと内容が正しく存在
      expect(triggers.length).toBe(2);
      expect(triggers[0].textContent).toBe("タブ1");
      expect(triggers[1].textContent).toBe("タブ2");
      expect(activeContent?.textContent).toBe("内容1");
    });
  });

  describe("バリアントスタイリング / Variant Styling", () => {
    it("solidバリアントのクラスが正しく付与される", () => {
      // Given: solidバリアントでレンダリング
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">solid</TabsTrigger>
            <TabsTrigger value="tab2">solid2</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      // When: トリガー取得
      const triggers = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-trigger"]');
      // Then: solid
      expect(triggers[0].className).toContain("rounded-t-action");
      expect(triggers[1].className).toContain("rounded-t-action");
    });

    it("lineバリアントのクラスが正しく付与される", () => {
      // Given: lineバリアントでレンダリング
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList variant="line">
            <TabsTrigger value="tab1">line</TabsTrigger>
            <TabsTrigger value="tab2">line2</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      // When: トリガー取得
      const triggers = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-trigger"]');
      // Then: line
      expect(triggers[0].className).toContain("border-none");
      expect(triggers[1].className).toContain("border-none");
    });

    it("ghostバリアントのクラスが正しく付与される", () => {
      // Given: ghostバリアントでレンダリング
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList variant="ghost">
            <TabsTrigger value="tab1">ghost</TabsTrigger>
            <TabsTrigger value="tab2">ghost2</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      // When: トリガー取得
      const triggers = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-trigger"]');
      // Then: ghost
      expect(triggers[0].className).toContain("border-x");
      expect(triggers[1].className).toContain("border-x");
    });

    it("scrollable=true のとき横スクロール用クラスが付与される", () => {
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList variant="line" scrollable>
            <TabsTrigger value="tab1">line</TabsTrigger>
            <TabsTrigger value="tab2">line2</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const list = testContainer
        .getContainer()
        .querySelector('[data-slot="tabs-list"]');

      expect(list?.className).toContain("overflow-x-auto");
      expect(list?.className).toContain("max-w-full");
      expect(list?.className).toContain("whitespace-nowrap");
    });
  });

  describe("ユーザーインタラクション / User Interaction", () => {
    it.todo("タブをクリックすると内容が切り替わる（jsdomではE2Eで担保）");

    it("propsでvalueを切り替えると内容が切り替わる", () => {
      // Given: valueを外部から制御
      function ControlledTabs({ value }: { value: string }) {
        return (
          <Tabs value={value} onValueChange={() => {}}>
            <TabsList>
              <TabsTrigger value="tab1">タブ1</TabsTrigger>
              <TabsTrigger value="tab2">タブ2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">内容1</TabsContent>
            <TabsContent value="tab2">内容2</TabsContent>
          </Tabs>
        );
      }
      // When: value=tab1
      testContainer.render(<ControlledTabs value="tab1" />);
      let activeContent = Array.from(
        testContainer
          .getContainer()
          .querySelectorAll('[data-slot="tabs-content"]')
      ).find(el => el.getAttribute("data-state") === "active");
      expect(activeContent?.textContent).toBe("内容1");
      // When: value=tab2
      testContainer.render(<ControlledTabs value="tab2" />);
      activeContent = Array.from(
        testContainer
          .getContainer()
          .querySelectorAll('[data-slot="tabs-content"]')
      ).find(el => el.getAttribute("data-state") === "active");
      expect(activeContent?.textContent).toBe("内容2");
    });
    it("disabledなタブはクリックできない", () => {
      // Given: 2タブ構成、2つ目はdisabled
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              タブ2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容1</TabsContent>
          <TabsContent value="tab2">内容2</TabsContent>
        </Tabs>
      );
      // When: disabledタブをクリック
      const triggers = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-trigger"]');
      EventHelpers.click(triggers[1]);
      // Then: 内容1がアクティブのまま
      const contents = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-content"]');
      expect(contents[0].getAttribute("data-state")).toBe("active");
      expect(contents[1].getAttribute("data-state")).toBe("inactive");
    });
  });

  describe("アクセシビリティ / Accessibility", () => {
    it("TabsTriggerはbutton要素である", () => {
      // Given: タブをレンダリング
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      // When: トリガー取得
      const trigger = testContainer
        .getContainer()
        .querySelector('[data-slot="tabs-trigger"]');
      // Then: button要素
      expect(trigger?.tagName).toBe("BUTTON");
    });
    it("TabsTriggerはdisabled属性を持つ場合は無効化される", () => {
      // Given: disabledトリガー
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" disabled>
              タブ1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );
      // When: トリガー取得
      const trigger = testContainer
        .getContainer()
        .querySelector('[data-slot="tabs-trigger"]');
      // Then: disabled属性
      expect(trigger?.hasAttribute("disabled")).toBe(true);
    });
  });

  describe("エッジケース / Edge Cases", () => {
    it("TabsListのvariantが未指定の場合はsolidになる", () => {
      // Given: variant未指定
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      // When: トリガー取得
      const trigger = testContainer
        .getContainer()
        .querySelector('[data-slot="tabs-trigger"]');
      // Then: solidバリアントのクラス
      expect(trigger?.className).toContain("rounded-t-action");
    });
    it("TabsContentはvalueが一致しない場合は非表示", () => {
      // Given: 2タブ構成
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2">タブ2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容1</TabsContent>
          <TabsContent value="tab2">内容2</TabsContent>
        </Tabs>
      );
      // When: 内容取得
      const contents = testContainer
        .getContainer()
        .querySelectorAll('[data-slot="tabs-content"]');
      // Then: 2つ目はinactive
      expect(contents[1].getAttribute("data-state")).toBe("inactive");
    });
  });

  describe("Figma token mapping", () => {
    // Figma: Tabs/Parts/Item 234:3608 と Tabs 234:3639（2026-10-01 取得）
    // en: Figma Tabs/Parts/Item 234:3608 and Tabs 234:3639 (retrieved 2026-10-01)
    const renderTabs = (variant: "solid" | "line" | "ghost") => {
      testContainer.render(
        <Tabs defaultValue="tab1">
          <TabsList variant={variant}>
            <TabsTrigger value="tab1">A</TabsTrigger>
            <TabsTrigger value="tab2">B</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      const root = testContainer.getContainer();
      return {
        list: root.querySelector('[data-slot="tabs-list"]') as HTMLElement,
        trigger: root.querySelector(
          '[data-slot="tabs-trigger"]'
        ) as HTMLElement,
      };
    };

    it.each([
      [
        "solid",
        [
          "data-[state=active]:bg-surface-primary-high-enabled",
          "data-[state=active]:text-text-inverse",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-primary-high-hover",
          "focus-visible:data-[state=active]:bg-surface-primary-high-active",
          "disabled:data-[state=active]:bg-surface-primary-high-disabled",
          "data-[state=inactive]:text-text-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "focus-visible:data-[state=inactive]:bg-surface-neutral-low-active",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ],
      ],
      [
        "line",
        [
          "data-[state=active]:text-text-primary-enabled",
          "data-[state=active]:after:bg-border-primary-extra-high",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-primary-low-hover",
          "enabled:not-focus-visible:hover:data-[state=active]:text-text-primary-hover",
          "focus-visible:data-[state=active]:bg-surface-primary-low-active",
          "focus-visible:data-[state=active]:text-text-primary-active",
          "disabled:data-[state=active]:text-text-primary-disabled",
          "disabled:data-[state=active]:after:bg-border-primary-low",
          "data-[state=inactive]:text-text-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ],
      ],
      [
        "ghost",
        [
          "data-[state=active]:text-text-neutral-high",
          "data-[state=active]:bg-surface-base-0",
          "data-[state=active]:border-border-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-neutral-low-hover",
          "focus-visible:data-[state=active]:bg-surface-neutral-low-active",
          "disabled:data-[state=active]:text-text-neutral-disabled",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ],
      ],
    ] as const)("applies %s trigger tokens", (variant, expected) => {
      const { trigger } = renderTabs(variant);
      expected.forEach(cls =>
        expect(trigger.className.split(/\s+/)).toContain(cls)
      );
    });

    it.each([
      ["solid", "border-b-border-neutral-low"],
      ["line", "border-b-border-neutral-low"],
    ] as const)("uses %s list underline token", (variant, cls) => {
      const { list } = renderTabs(variant);
      expect(list.className.split(/\s+/)).toContain(cls);
    });

    it("ghost list has no underline", () => {
      const { list } = renderTabs("ghost");
      expect(list.className).not.toMatch(/border-b-/);
    });

    it("never applies hover tokens while focus-visible", () => {
      (["solid", "line", "ghost"] as const).forEach(variant => {
        testContainer.cleanup();
        testContainer = new TestContainer();
        testContainer.setup();
        const { trigger } = renderTabs(variant);
        const hoverClasses = trigger.className
          .split(/\s+/)
          .filter(c => c.includes("hover:"));
        expect(hoverClasses.length).toBeGreaterThan(0);
        hoverClasses.forEach(c =>
          expect(c.startsWith("enabled:not-focus-visible:hover:")).toBe(true)
        );
      });
    });
  });
});
