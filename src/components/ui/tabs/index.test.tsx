/**
 * @jest-environment jsdom
 */

import React from "react";
import { renderToString } from "react-dom/server";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
        indicator: root.querySelector(
          '[data-slot="tabs-indicator"]'
        ) as HTMLElement,
      };
    };

    it.each([
      [
        "solid",
        [
          "data-[state=active]:bg-surface-primary-high-enabled",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:bg-transparent",
          "data-[state=active]:text-text-inverse",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-primary-high-hover",
          "focus-visible:data-[state=active]:bg-surface-primary-high-active",
          "disabled:data-[state=active]:bg-surface-primary-high-disabled",
          "data-[state=inactive]:text-text-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "focus-visible:data-[state=inactive]:bg-surface-neutral-low-active",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ],
        ["bg-surface-primary-high-enabled", "rounded-t-action"],
      ],
      [
        "line",
        [
          "data-[state=active]:text-text-primary-enabled",
          "data-[state=active]:after:bg-border-primary-extra-high",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:after:bg-transparent",
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
        ["bg-border-primary-extra-high", "h-0.5"],
      ],
      [
        "ghost",
        [
          "data-[state=active]:text-text-neutral-high",
          "data-[state=active]:bg-surface-base-0",
          "data-[state=active]:border-border-neutral-middle",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:bg-transparent",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:border-transparent",
          "disabled:data-[state=active]:bg-surface-base-0",
          "disabled:data-[state=active]:border-border-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-neutral-low-hover",
          "focus-visible:data-[state=active]:bg-surface-neutral-low-active",
          "disabled:data-[state=active]:text-text-neutral-disabled",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ],
        [
          "bg-surface-base-0",
          "border-border-neutral-middle",
          "rounded-t-action",
        ],
      ],
    ] as const)(
      "applies %s trigger tokens",
      (variant, expectedTrigger, expectedIndicator) => {
        const { trigger, indicator } = renderTabs(variant);
        expectedTrigger.forEach(cls =>
          expect(trigger.className.split(/\s+/)).toContain(cls)
        );
        // 選択中の見た目（塗り・下線・枠）は、次のタブへ移動するインジケーターが持つ
        // en: The active look (fill / underline / outline) lives on the indicator that moves between tabs
        expectedIndicator.forEach(cls =>
          expect(indicator.className.split(/\s+/)).toContain(cls)
        );
      }
    );

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

describe("Tabs のモーション", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it("インジケーターは状態変化のスプリングで移動し、最初の位置合わせでは動かない", () => {
    // GIVEN: タブ
    // en: GIVEN tabs
    testContainer.render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const indicator = document.querySelector(
      '[data-slot="tabs-indicator"]'
    ) as HTMLElement;

    // THEN: 移動は位置合わせが済んでから（data-ready）だけ、settle のトークンで動く
    // en: THEN it only animates once placed (data-ready), with the settle tokens
    [
      "data-[ready]:transition-[translate,width,height]",
      "data-[ready]:duration-(--motion-settle-duration)",
      "data-[ready]:ease-(--motion-settle-ease)",
      "data-[ready]:delay-(--motion-latency)",
    ].forEach(cls => expect(indicator.className).toContain(cls));
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    // THEN: 最初の位置合わせでは動かさない
    // en: THEN the first placement is not animated
    expect(indicator).not.toHaveAttribute("data-ready");
  });

  it("SSR では、インジケーターを測れるまでトリガーが選択中の見た目を持つ", () => {
    // GIVEN: サーバーで描いたタブ（useLayoutEffect が動かないので、インジケーターは測られない）
    // en: GIVEN tabs rendered on the server (no layout effect, so the indicator is never measured)
    const container = document.createElement("div");
    container.innerHTML = renderToString(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const list = container.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;

    // THEN: インジケーターは隠れていて、リストには準備完了の印が無い
    // en: THEN the indicator is hidden and the list is not marked ready
    expect(list.querySelector('[data-slot="tabs-indicator"]')).toHaveAttribute(
      "hidden"
    );
    expect(list).not.toHaveAttribute("data-indicator-ready");
    // THEN: 選択中の塗りを透明にするのは、準備完了の印が付いたときだけ
    // en: THEN the active fill only turns transparent once the list is marked ready
    expect(list.className).toContain("group/tabs-list");
    const classes = (
      list.querySelector('[data-state="active"]') as HTMLElement
    ).className.split(/\s+/);
    expect(classes).toContain(
      "data-[state=active]:bg-surface-primary-high-enabled"
    );
    expect(classes).not.toContain("data-[state=active]:bg-transparent");
  });

  it("選択中のタブが変わると、インジケーターがそのタブの位置へ移る", async () => {
    // GIVEN: 2 つのタブ（jsdom は配置しないので位置を与える）
    // en: GIVEN two tabs (jsdom does no layout, so stub the positions)
    const lefts: Record<string, number> = { a: 0, b: 80 };
    const spies = [
      vi
        .spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(function (this: HTMLElement) {
          const isList = this.dataset.slot === "tabs-list";
          const left = lefts[this.dataset.value ?? ""] ?? 0;
          const width = isList ? 200 : this.dataset.value ? 72 : 0;
          return DOMRect.fromRect({ x: left, y: 0, width, height: 40 });
        }),
      vi
        .spyOn(HTMLElement.prototype, "offsetWidth", "get")
        .mockImplementation(function (this: HTMLElement) {
          return this.dataset.slot === "tabs-list" ? 200 : 0;
        }),
    ];
    testContainer.render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" data-value="a">
            A
          </TabsTrigger>
          <TabsTrigger value="b" data-value="b">
            B
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const indicator = document.querySelector(
      '[data-slot="tabs-indicator"]'
    ) as HTMLElement;
    expect(indicator.style.translate).toBe("0px 0px");
    expect(indicator.style.width).toBe("72px");
    // THEN: 測れたので、リストに準備完了の印が付き、塗りはインジケーターに引き継がれる
    // en: THEN, once measured, the list is marked ready and the fill moves to the indicator
    expect(indicator.parentElement).toHaveAttribute("data-indicator-ready");

    // WHEN: 2 つ目のタブを選ぶ
    // en: WHEN the second tab is selected
    const second = screen.getByRole("tab", { name: "B" });
    fireEvent.mouseDown(second, { button: 0 });

    // THEN: インジケーターが 2 つ目のタブの位置へ移る
    // en: THEN the indicator moves to the second tab
    await waitFor(() => expect(indicator.style.translate).toBe("80px 0px"));
    // THEN: 選択が移ったときは動かす（data-ready）
    // en: THEN it animates because the selection moved (data-ready)
    await waitFor(() => expect(indicator).toHaveAttribute("data-ready"));
    spies.forEach(spy => spy.mockRestore());
  });
});

describe("Tabs のアクセシビリティ（Modern Web Guidance の監査から）", () => {
  let testContainer: TestContainer;
  let spies: { mockRestore: () => void }[] = [];

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    spies.forEach(spy => spy.mockRestore());
    spies = [];
    testContainer.cleanup();
  });

  /**
   * jsdom は配置しないので、幅 100px のリストに幅 72px のタブが 80px 間隔で並ぶ状態を与える
   * en: jsdom does no layout, so stub a 100px list holding 72px tabs every 80px
   */
  const stubScrollableLayout = (
    lefts: Record<string, number> = { a: 0, b: 80, c: 160 }
  ) => {
    const isList = (el: HTMLElement) => el.dataset.slot === "tabs-list";
    spies = [
      vi
        .spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(function (this: HTMLElement) {
          const left = lefts[this.dataset.value ?? ""] ?? 0;
          const width = isList(this) ? 100 : this.dataset.value ? 72 : 0;
          const scroll = this.closest<HTMLElement>('[data-slot="tabs-list"]');
          const offset = isList(this) ? 0 : (scroll?.scrollLeft ?? 0);
          return DOMRect.fromRect({
            x: left - offset,
            y: 0,
            width,
            height: 40,
          });
        }),
      vi
        .spyOn(HTMLElement.prototype, "offsetWidth", "get")
        .mockImplementation(function (this: HTMLElement) {
          return isList(this) ? 100 : 0;
        }),
      vi
        .spyOn(HTMLElement.prototype, "clientWidth", "get")
        .mockImplementation(function (this: HTMLElement) {
          return isList(this) ? 100 : 0;
        }),
      vi
        .spyOn(HTMLElement.prototype, "scrollWidth", "get")
        .mockImplementation(function (this: HTMLElement) {
          return isList(this) ? 232 : 0;
        }),
    ];
  };

  const renderScrollable = ({
    defaultValue = "a",
    dir,
  }: { defaultValue?: string; dir?: "rtl" } = {}) =>
    testContainer.render(
      <Tabs defaultValue={defaultValue}>
        <TabsList scrollable>
          <TabsTrigger value="a" data-value="a">
            A
          </TabsTrigger>
          <TabsTrigger value="b" data-value="b">
            B
          </TabsTrigger>
          <TabsTrigger value="c" data-value="c">
            C
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );

  it.each([
    ["solid", "forced-colors:border-b-[3px]"],
    ["line", "forced-colors:border-b-4"],
  ] as const)(
    "強制カラーモードでは、%s のインジケーターを枠線で描き、背景色が消されても選択中のタブが分かる",
    (variant, cls) => {
      // GIVEN: タブ
      testContainer.render(
        <Tabs defaultValue="a">
          <TabsList variant={variant}>
            <TabsTrigger value="a">A</TabsTrigger>
          </TabsList>
        </Tabs>
      );

      // WHEN: インジケーターを取得する
      const indicator = document.querySelector(
        '[data-slot="tabs-indicator"]'
      ) as HTMLElement;

      // THEN: 強制カラーモードでも残る border で印を描く
      expect(indicator.className.split(/\s+/)).toContain(cls);
    }
  );

  it("スクロールできるリストでは、見えていないタブを選ぶとそのタブが見える位置までリストだけをスクロールする", async () => {
    // GIVEN: 3 つ目のタブがはみ出しているリスト
    stubScrollableLayout();
    renderScrollable();
    const list = document.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;
    const scrollTo = vi.fn();
    list.scrollTo = scrollTo as unknown as typeof list.scrollTo;

    // WHEN: 3 つ目のタブを選ぶ
    fireEvent.mouseDown(screen.getByRole("tab", { name: "C" }), { button: 0 });

    // THEN: 端までスクロールする（160 + 72 + 32 - 100 = 164 は、最大の 232 - 100 = 132 で止まる）
    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ left: 132 })
      )
    );
  });

  it("選んだタブは、端のフェード（2rem）に掛からない位置まで見せる", async () => {
    // GIVEN: 2 つ目のタブが右端からはみ出しているリスト
    stubScrollableLayout();
    renderScrollable();
    const list = document.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;
    const scrollTo = vi.fn();
    list.scrollTo = scrollTo as unknown as typeof list.scrollTo;

    // WHEN: 2 つ目のタブを選ぶ
    fireEvent.mouseDown(screen.getByRole("tab", { name: "B" }), { button: 0 });

    // THEN: タブの右端から 32px 先までが見える位置へスクロールする（80 + 72 + 32 - 100 = 84）
    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ left: 84 })
      )
    );
  });

  it("スクロールできるリストでは、隠れたタブがある側の端をフェードさせる", async () => {
    // GIVEN: 右側にタブが隠れているリスト
    stubScrollableLayout();
    renderScrollable();
    const list = document.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;

    // THEN: 右端だけフェードする
    expect(list).toHaveAttribute("data-fade-right");
    expect(list).not.toHaveAttribute("data-fade-left");
    expect(list.className).toContain("[mask-image:");

    // WHEN: 右端までスクロールする
    list.scrollLeft = 132;
    fireEvent.scroll(list);

    // THEN: 左端だけフェードする
    await waitFor(() => expect(list).toHaveAttribute("data-fade-left"));
    expect(list).not.toHaveAttribute("data-fade-right");
  });

  it("最初の選択がはみ出しているときも、そのタブが見える位置まで一瞬でスクロールする", async () => {
    // GIVEN: 3 つ目のタブがはみ出しているリスト
    stubScrollableLayout();
    // jsdom の要素には scrollTo が無いので、表示前に差し込んでおく
    const scrollTo = vi.fn();
    HTMLElement.prototype.scrollTo =
      scrollTo as unknown as HTMLElement["scrollTo"];
    spies.push({
      mockRestore: () => {
        delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo;
      },
    });

    // WHEN: 3 つ目のタブを選んだ状態で表示する
    renderScrollable({ defaultValue: "c" });

    // THEN: アニメーションせずに端までスクロールする
    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith({ left: 132, behavior: "auto" })
    );
  });

  it("RTL では scrollLeft が負の向きに進むので、その向きでスクロールする", async () => {
    // GIVEN: 右から並ぶリスト（scrollLeft 0 が右端）で、3 つ目のタブが左へはみ出している
    stubScrollableLayout({ a: 28, b: -52, c: -132 });
    // jsdom は direction を計算しないので、リストだけ rtl を返す
    const getComputedStyle = window.getComputedStyle.bind(window);
    spies.push(
      vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation((element, pseudo) => {
          const style = getComputedStyle(element, pseudo);
          return (element as HTMLElement).dataset?.slot === "tabs-list"
            ? new Proxy(style, {
                get: (target, key) =>
                  key === "direction"
                    ? "rtl"
                    : Reflect.get(target, key, target),
              })
            : style;
        })
    );
    renderScrollable();
    const list = document.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;
    const scrollTo = vi.fn();
    list.scrollTo = scrollTo as unknown as typeof list.scrollTo;

    // THEN: 左側にタブが隠れているので、左端がフェードする
    expect(list).toHaveAttribute("data-fade-left");

    // WHEN: 3 つ目のタブを選ぶ
    fireEvent.mouseDown(screen.getByRole("tab", { name: "C" }), { button: 0 });

    // THEN: 負の向きの端（-132）までスクロールする
    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ left: -132 })
      )
    );
  });

  it("リストの大きさが変わらなくても、タブが増えてはみ出したらフェードを付け直す", async () => {
    // GIVEN: はみ出していないリスト
    stubScrollableLayout();
    let scrollWidth = 100;
    spies.push(
      vi
        .spyOn(HTMLElement.prototype, "scrollWidth", "get")
        .mockImplementation(function (this: HTMLElement) {
          return this.dataset.slot === "tabs-list" ? scrollWidth : 0;
        })
    );
    const { rerender, unmount } = render(
      <Tabs defaultValue="a">
        <TabsList scrollable>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const list = document.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;
    expect(list).not.toHaveAttribute("data-fade-right");

    // WHEN: タブが増えて中身がはみ出す
    scrollWidth = 232;
    rerender(
      <Tabs defaultValue="a">
        <TabsList scrollable>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
      </Tabs>
    );

    // THEN: 右端がフェードする
    await waitFor(() => expect(list).toHaveAttribute("data-fade-right"));
    unmount();
  });

  it("スクロールしないリストにはフェードを付けない", () => {
    // GIVEN: scrollable ではないリスト
    testContainer.render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    );

    // THEN: マスクもフェードの印も無い
    const list = document.querySelector(
      '[data-slot="tabs-list"]'
    ) as HTMLElement;
    expect(list.className).not.toContain("[mask-image:");
    expect(list).not.toHaveAttribute("data-fade-right");
  });
});
