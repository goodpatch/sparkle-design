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
      expect(triggers[0].className).toContain("rounded-t-md");
      expect(triggers[1].className).toContain("rounded-t-md");
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
      expect(trigger?.className).toContain("rounded-t-md");
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
});
