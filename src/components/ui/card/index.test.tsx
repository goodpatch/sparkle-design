/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TestContainer, EventHelpers } from "../../../test/helpers";
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardControl,
  CardContent,
  CardFooter,
  type ClickableCardProps,
  type CardContentProps,
} from "./index";

/**
 * テストデータ定数
 * en: Test data constants
 */
const CARD_BASE_CLASSES = [
  "rounded-minimum",
  "border",
  "border-border-neutral-middle",
  "bg-surface-base-0",
  "text-text-neutral-middle",
  "py-4",
] as const;
const CLICKABLE_CARD_BASE_CLASSES = [
  "rounded-action",
  "border",
  "border-border-neutral-middle",
  "bg-surface-base-0",
  "shadow-raise",
  "text-text-neutral-middle",
  "py-4",
  "cursor-pointer",
  "hover:bg-neutral-50",
  "transition-colors",
] as const;

const CLICKABLE_CARD_INTERACTION_CLASSES = [
  "active:bg-neutral-50",
  "active:shadow-float",
  "active:border-primary-400",
] as const;

const CLICKABLE_CARD_FOCUS_CLASSES = [
  "focus-visible:outline-hidden",
  "focus-visible:ring-2",
  "focus-visible:ring-border-ring",
  "focus-visible:ring-offset-2",
] as const;

const CLICKABLE_CARD_DISABLED_CLASSES = [
  "disabled:cursor-not-allowed",
  "disabled:bg-surface-base-0",
  "disabled:border-secondary-100",
  "disabled:text-secondary-200",
  "disabled:shadow-flat",
] as const;

const CARD_CONTENT_SPACING_TEST_CASES = [
  { isSpace: true, expectedClasses: ["px-6", "py-2"] },
  { isSpace: false, expectedClasses: [] },
] as const;

/**
 * テストヘルパー関数
 * en: Test helper functions
 */
const TestHelpers = {
  /**
   * Cardを描画して要素を取得
   * en: Render Card and get element
   */
  renderCard(
    container: TestContainer,
    props: React.HTMLAttributes<HTMLDivElement> = {}
  ) {
    container.render(<Card {...props}>Test Card</Card>);
    return container.querySelector("div");
  },

  /**
   * ClickableCardを描画して要素を取得
   * en: Render ClickableCard and get element
   */
  renderClickableCard(
    container: TestContainer,
    props: ClickableCardProps = {}
  ) {
    container.render(
      <ClickableCard {...props}>Test Clickable Card</ClickableCard>
    );
    return container.querySelector("button");
  },

  /**
   * CardContentを描画して要素を取得
   * en: Render CardContent and get element
   */
  renderCardContent(container: TestContainer, props: CardContentProps = {}) {
    container.render(<CardContent {...props}>Test Content</CardContent>);
    return container.querySelector("div");
  },

  /**
   * 複数のクラスが存在することを確認
   * en: Verify that multiple classes exist
   */
  expectClassesToExist(element: Element, classes: readonly string[]) {
    classes.forEach(className => {
      expect(element.className).toContain(className);
    });
  },
};

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Card Components", () => {
  describe("Card", () => {
    describe("Basic Rendering", () => {
      it("renders a basic card", () => {
        // Given: 基本的なCard
        const card = TestHelpers.renderCard(testContainer);

        // Then: 正常に描画される
        expect(card).toBeTruthy();
        expect(card.textContent).toBe("Test Card");
      });

      it("applies base styles correctly", () => {
        // Given: 基本的なCard
        const card = TestHelpers.renderCard(testContainer);

        // Then: 基本スタイルが適用される
        TestHelpers.expectClassesToExist(card, CARD_BASE_CLASSES);
      });

      it("supports custom className", () => {
        // Given: カスタムクラス付きのCard
        const customClass = "my-custom-card-class";
        const card = TestHelpers.renderCard(testContainer, {
          className: customClass,
        });

        // Then: カスタムクラスが追加される
        expect(card.className).toContain(customClass);
      });

      it("forwards DOM attributes", () => {
        // Given: カスタム属性付きのCard
        const testId = "custom-card-id";
        testContainer.render(
          <Card data-testid={testId} role="article">
            Test Card
          </Card>
        );
        const card = testContainer.querySelector("div");

        // Then: DOM属性が転送される
        expect(card.getAttribute("data-testid")).toBe(testId);
        expect(card.getAttribute("role")).toBe("article");
      });
    });
  });

  describe("ClickableCard", () => {
    describe("Basic Rendering", () => {
      it("renders as a button element", () => {
        // Given: 基本的なClickableCard
        const card = TestHelpers.renderClickableCard(testContainer);

        // Then: 正常に描画される
        expect(card).toBeTruthy();
        expect(card.textContent).toBe("Test Clickable Card");
        expect((card as HTMLButtonElement).type).toBe("button");
      });

      it("applies clickable styles correctly", () => {
        // Given: 基本的なClickableCard
        const card = TestHelpers.renderClickableCard(testContainer);

        // Then: クリック可能なスタイルが適用される
        TestHelpers.expectClassesToExist(card, CLICKABLE_CARD_BASE_CLASSES);
        TestHelpers.expectClassesToExist(
          card,
          CLICKABLE_CARD_INTERACTION_CLASSES
        );
      });

      it("has proper focus styles", () => {
        // Given: フォーカス可能なClickableCard
        const card = TestHelpers.renderClickableCard(testContainer);

        // Then: フォーカススタイルが適用される
        TestHelpers.expectClassesToExist(card, CLICKABLE_CARD_FOCUS_CLASSES);
      });
    });

    describe("User Interaction", () => {
      it("handles click events properly", async () => {
        // Given: clickハンドラー付きのClickableCard
        const handleClick = vi.fn();
        const card = TestHelpers.renderClickableCard(testContainer, {
          onClick: handleClick,
        });

        // When: カードをクリック
        await EventHelpers.click(card);

        // Then: クリックハンドラーが呼ばれる
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("provides click event details", async () => {
        // Given: イベント詳細をチェックするハンドラー
        const handleClick = vi.fn();
        const card = TestHelpers.renderClickableCard(testContainer, {
          onClick: handleClick,
        });

        // When: カードをクリック
        await EventHelpers.click(card);

        // Then: 正しいイベントオブジェクトが渡される
        expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
        expect(handleClick.mock.calls[0][0].type).toBe("click");
      });

      it("supports keyboard interaction", async () => {
        // Given: キーボードイベントハンドラー付きのClickableCard
        const handleKeyDown = vi.fn();
        const card = TestHelpers.renderClickableCard(testContainer, {
          onKeyDown: handleKeyDown,
        });

        // When: キーボードイベントを実行
        await EventHelpers.keyDown(card, "Enter");

        // Then: キーボードイベントが処理される
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
      });

      it("can be focused", () => {
        // Given: フォーカス可能なClickableCard
        const card = TestHelpers.renderClickableCard(testContainer);

        // When: フォーカスする
        EventHelpers.focus(card as HTMLElement);

        // Then: フォーカスが設定される
        expect(document.activeElement).toBe(card);
      });
    });

    describe("Disabled State", () => {
      it("applies disabled styles when isDisabled is true", () => {
        // Given: 無効化されたClickableCard
        const card = TestHelpers.renderClickableCard(testContainer, {
          isDisabled: true,
        });

        // Then: 無効化スタイルが適用される
        expect((card as HTMLButtonElement).disabled).toBe(true);
        TestHelpers.expectClassesToExist(card, CLICKABLE_CARD_DISABLED_CLASSES);
      });

      it("does not respond to clicks when disabled", async () => {
        // Given: 無効化されたClickableCard
        const handleClick = vi.fn();
        const disabledCard = TestHelpers.renderClickableCard(testContainer, {
          isDisabled: true,
          onClick: handleClick,
        });

        // When: 無効化されたカードをクリック
        await EventHelpers.click(disabledCard);

        // Then: クリックハンドラーが呼ばれない
        expect(handleClick).not.toHaveBeenCalled();
      });
    });
  });

  describe("CardHeader", () => {
    it("renders with proper layout styles", () => {
      // Given: CardHeader
      testContainer.render(
        <CardHeader>
          <span>Header Content</span>
        </CardHeader>
      );

      // When: スタイルクラスを確認
      const header = testContainer.querySelector("div");

      // Then: 適切なレイアウトスタイルが適用される
      expect(header.className).toContain("flex");
      expect(header.className).toContain("flex-row");
      expect(header.className).toContain("gap-2");
      expect(header.className).toContain("justify-between");
      expect(header.className).toContain("px-6");
      expect(header.className).toContain("py-2");
      expect(header.className).toContain("items-center");
    });

    it("supports multiple children", () => {
      // Given: 複数の子要素を持つCardHeader
      testContainer.render(
        <CardHeader>
          <span data-testid="title">Title</span>
          <span data-testid="action">Action</span>
        </CardHeader>
      );

      // When: 子要素を確認
      const title = testContainer.querySelector('[data-testid="title"]');
      const action = testContainer.querySelector('[data-testid="action"]');

      // Then: 複数の子要素が正常に描画される
      expect(title).toBeTruthy();
      expect(action).toBeTruthy();
      expect(title.textContent).toBe("Title");
      expect(action.textContent).toBe("Action");
    });
  });

  describe("CardTitle", () => {
    it("renders with proper typography styles", () => {
      // Given: CardTitle
      testContainer.render(<CardTitle>Card Title</CardTitle>);

      // When: スタイルクラスを確認
      const title = testContainer.querySelector("div");

      // Then: 適切なタイポグラフィスタイルが適用される
      expect(title.className).toContain("character-4-bold-pro");
      expect(title.className).toContain("flex");
      expect(title.className).toContain("items-center");
      expect(title.className).toContain("gap-2");
      expect(title.textContent).toBe("Card Title");
    });

    it("supports icon integration", () => {
      // Given: アイコン付きのCardTitle
      testContainer.render(
        <CardTitle>
          <span data-testid="icon">📄</span>
          <span data-testid="text">Document Title</span>
        </CardTitle>
      );

      // When: アイコンとテキストを確認
      const icon = testContainer.querySelector('[data-testid="icon"]');
      const text = testContainer.querySelector('[data-testid="text"]');

      // Then: アイコンとテキストが正常に描画される
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
      expect(icon.textContent).toBe("📄");
      expect(text.textContent).toBe("Document Title");
    });
  });

  describe("CardDescription", () => {
    it("renders description content", () => {
      // Given: CardDescription
      testContainer.render(
        <CardDescription>This is a card description</CardDescription>
      );

      // When: 内容を確認
      const description = testContainer.querySelector("div");

      // Then: 説明コンテンツが正常に描画される
      expect(description).toBeTruthy();
      expect(description.textContent).toBe("This is a card description");
    });

    it("supports rich content", () => {
      // Given: リッチコンテンツのCardDescription
      testContainer.render(
        <CardDescription>
          <p data-testid="paragraph">Rich description</p>
          <small data-testid="small">Additional info</small>
        </CardDescription>
      );

      // When: リッチコンテンツを確認
      const paragraph = testContainer.querySelector(
        '[data-testid="paragraph"]'
      );
      const small = testContainer.querySelector('[data-testid="small"]');

      // Then: リッチコンテンツが正常に描画される
      expect(paragraph).toBeTruthy();
      expect(small).toBeTruthy();
      expect(paragraph.textContent).toBe("Rich description");
      expect(small.textContent).toBe("Additional info");
    });
  });

  describe("CardControl", () => {
    it("renders control elements", () => {
      // Given: CardControl with button
      testContainer.render(
        <CardControl>
          <button data-testid="control-button">Control Action</button>
        </CardControl>
      );

      // When: コントロール要素を確認
      const control = testContainer.querySelector("div");
      const button = testContainer.querySelector(
        '[data-testid="control-button"]'
      );

      // Then: コントロール要素が正常に描画される
      expect(control).toBeTruthy();
      expect(control.className).toContain("flex");
      expect(control.className).toContain("items-center");
      expect(control.className).toContain("gap-2");
      expect(button).toBeTruthy();
      expect(button.textContent).toBe("Control Action");
    });

    it("supports multiple control elements", () => {
      // Given: 複数のコントロール要素
      testContainer.render(
        <CardControl>
          <button data-testid="primary">Primary</button>
          <button data-testid="secondary">Secondary</button>
        </CardControl>
      );

      // When: 複数のコントロールを確認
      const primary = testContainer.querySelector('[data-testid="primary"]');
      const secondary = testContainer.querySelector(
        '[data-testid="secondary"]'
      );

      // Then: 複数のコントロールが正常に描画される
      expect(primary).toBeTruthy();
      expect(secondary).toBeTruthy();
    });
  });

  describe("CardContent", () => {
    describe("Spacing Behavior", () => {
      CARD_CONTENT_SPACING_TEST_CASES.forEach(
        ({ isSpace, expectedClasses }) => {
          it(`${isSpace ? "applies" : "removes"} spacing when isSpace is ${isSpace}`, () => {
            // Given: isSpace設定のCardContent
            const content = TestHelpers.renderCardContent(testContainer, {
              isSpace,
            });

            // Then: 期待されるスペーシングが適用される
            if (expectedClasses.length > 0) {
              TestHelpers.expectClassesToExist(content, expectedClasses);
            } else {
              expect(content.className).not.toContain("px-6");
              expect(content.className).not.toContain("py-2");
            }
          });
        }
      );
    });

    it("supports complex content structure", () => {
      // Given: 複雑なコンテンツ構造
      testContainer.render(
        <CardContent>
          <div data-testid="section1">Section 1</div>
          <div data-testid="section2">Section 2</div>
          <ul data-testid="list">
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </CardContent>
      );

      // When: 複雑な構造を確認
      const section1 = testContainer.querySelector('[data-testid="section1"]');
      const section2 = testContainer.querySelector('[data-testid="section2"]');
      const list = testContainer.querySelector('[data-testid="list"]');

      // Then: 複雑な構造が正常に描画される
      expect(section1).toBeTruthy();
      expect(section2).toBeTruthy();
      expect(list).toBeTruthy();
    });
  });

  describe("CardFooter", () => {
    it("renders with proper footer layout", () => {
      // Given: CardFooter
      testContainer.render(
        <CardFooter>
          <button>Footer Action</button>
        </CardFooter>
      );

      // When: スタイルクラスを確認
      const footer = testContainer.querySelector("div");

      // Then: 適切なフッターレイアウトスタイルが適用される
      expect(footer.className).toContain("flex");
      expect(footer.className).toContain("items-center");
      expect(footer.className).toContain("justify-end");
      expect(footer.className).toContain("px-6");
      expect(footer.className).toContain("py-2");
    });

    it("supports multiple footer actions", () => {
      // Given: 複数のフッターアクション
      testContainer.render(
        <CardFooter>
          <button data-testid="cancel">Cancel</button>
          <button data-testid="submit">Submit</button>
        </CardFooter>
      );

      // When: アクションボタンを確認
      const cancel = testContainer.querySelector('[data-testid="cancel"]');
      const submit = testContainer.querySelector('[data-testid="submit"]');

      // Then: 複数のアクションが正常に描画される
      expect(cancel).toBeTruthy();
      expect(submit).toBeTruthy();
      expect(cancel.textContent).toBe("Cancel");
      expect(submit.textContent).toBe("Submit");
    });
  });

  describe("Card Composition", () => {
    it("renders a complete card with all components", () => {
      // Given: 完全なカード構成
      testContainer.render(
        <Card>
          <CardHeader>
            <CardTitle>Complete Card</CardTitle>
            <CardControl>
              <button data-testid="header-action">⋯</button>
            </CardControl>
          </CardHeader>
          <CardContent>
            <CardDescription>
              This is a complete card example with all components.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <button data-testid="footer-cancel">Cancel</button>
            <button data-testid="footer-save">Save</button>
          </CardFooter>
        </Card>
      );

      // When: 各コンポーネントを確認
      const title = testContainer.querySelector(
        "div[class*='character-4-bold-pro']"
      );
      const headerAction = testContainer.querySelector(
        '[data-testid="header-action"]'
      );
      const description = testContainer.querySelector("div");
      const cancelButton = testContainer.querySelector(
        '[data-testid="footer-cancel"]'
      );
      const saveButton = testContainer.querySelector(
        '[data-testid="footer-save"]'
      );

      // Then: 完全なカード構成が正常に描画される
      expect(title).toBeTruthy();
      expect(headerAction).toBeTruthy();
      expect(cancelButton).toBeTruthy();
      expect(saveButton).toBeTruthy();
    });

    it("works as a clickable card with content", () => {
      // Given: コンテンツ付きのクリック可能なカード
      const handleClick = vi.fn();
      testContainer.render(
        <ClickableCard onClick={handleClick}>
          <CardHeader>
            <CardTitle>Clickable Card</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Click anywhere to interact</CardDescription>
          </CardContent>
        </ClickableCard>
      );

      // When: カード全体をクリック
      const card = testContainer.querySelector("button");

      // Then: カード全体がクリック可能で、button 内に div（flow content）を含まない
      expect(card).toBeTruthy();
      expect((card as HTMLButtonElement).type).toBe("button");
      expect(card.querySelectorAll("div")).toHaveLength(0);
    });
  });

  describe("Inside ClickableCard", () => {
    /**
     * ClickableCard 内で span（phrasing content）として描画されるサブコンポーネント
     * en: Subcomponents rendered as span (phrasing content) inside ClickableCard
     */
    const SUBCOMPONENT_CASES = [
      { name: "CardHeader", Component: CardHeader, displayClass: "flex" },
      { name: "CardTitle", Component: CardTitle, displayClass: "flex" },
      {
        name: "CardDescription",
        Component: CardDescription,
        displayClass: "block",
      },
      { name: "CardControl", Component: CardControl, displayClass: "flex" },
      { name: "CardContent", Component: CardContent, displayClass: "block" },
      { name: "CardFooter", Component: CardFooter, displayClass: "flex" },
    ] as const;

    it.each(SUBCOMPONENT_CASES)(
      "renders $name as a span with $displayClass display inside ClickableCard",
      ({ Component, displayClass }) => {
        // Given: ClickableCard 内のサブコンポーネント
        testContainer.render(
          <ClickableCard>
            <Component data-testid="sub">Content</Component>
          </ClickableCard>
        );

        // When: サブコンポーネントの要素を取得
        const sub = testContainer.querySelector('[data-testid="sub"]');

        // Then: span として描画され、ブロックレベルの見た目を保つ
        expect(sub.tagName).toBe("SPAN");
        expect(sub.classList.contains(displayClass)).toBe(true);
      }
    );

    it.each(SUBCOMPONENT_CASES)(
      "renders $name as a div outside ClickableCard",
      ({ Component }) => {
        // Given: Card 内のサブコンポーネント
        testContainer.render(
          <Card>
            <Component data-testid="sub">Content</Component>
          </Card>
        );

        // When: サブコンポーネントの要素を取得
        const sub = testContainer.querySelector('[data-testid="sub"]');

        // Then: div として描画され、block クラスは付与されない
        expect(sub.tagName).toBe("DIV");
        expect(sub.classList.contains("block")).toBe(false);
      }
    );

    it("keeps base classes of CardHeader and CardTitle when rendered as span", () => {
      // Given: ClickableCard 内の CardHeader / CardTitle
      testContainer.render(
        <ClickableCard>
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">タイトル</CardTitle>
          </CardHeader>
        </ClickableCard>
      );

      // When: 要素を取得
      const header = testContainer.querySelector('[data-testid="header"]');
      const title = testContainer.querySelector('[data-testid="title"]');

      // Then: div 版と同じクラスが適用される
      TestHelpers.expectClassesToExist(header, [
        "flex",
        "flex-row",
        "gap-2",
        "justify-between",
        "px-6",
        "py-2",
        "items-center",
      ]);
      TestHelpers.expectClassesToExist(title, [
        "character-4-bold-pro",
        "flex",
        "items-center",
        "gap-2",
      ]);
    });

    it("forwards ref to the rendered span", () => {
      // Given: ref 付きの CardTitle
      const ref = React.createRef<HTMLDivElement>();
      testContainer.render(
        <ClickableCard>
          <CardTitle ref={ref}>タイトル</CardTitle>
        </ClickableCard>
      );

      // Then: ref は描画された span を指す
      expect(ref.current?.tagName).toBe("SPAN");
    });

    it("respects an explicit as prop inside and outside ClickableCard", () => {
      // Given: as を明示したサブコンポーネント
      testContainer.render(
        <>
          <ClickableCard>
            <CardTitle as="div" data-testid="inside-div">
              Inside
            </CardTitle>
          </ClickableCard>
          <Card>
            <CardTitle as="span" data-testid="outside-span">
              Outside
            </CardTitle>
          </Card>
        </>
      );

      // When: 各要素を取得
      const insideDiv = testContainer.querySelector(
        '[data-testid="inside-div"]'
      );
      const outsideSpan = testContainer.querySelector(
        '[data-testid="outside-span"]'
      );

      // Then: 明示した as が優先される
      expect(insideDiv.tagName).toBe("DIV");
      expect(outsideSpan.tagName).toBe("SPAN");
    });

    it("applies span through Fragments, HTML elements and mapped arrays", () => {
      // Given: Fragment・HTML 要素・配列の中にあるサブコンポーネント
      const items = ["a", "b"];
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      testContainer.render(
        <ClickableCard>
          <>
            <CardTitle data-testid="in-fragment">Fragment</CardTitle>
          </>
          <span>
            <CardDescription data-testid="in-span">Span</CardDescription>
          </span>
          {items.map(item => (
            <CardContent key={item} data-testid={`item-${item}`}>
              {item}
            </CardContent>
          ))}
        </ClickableCard>
      );

      // Then: すべて span で描画され、key 警告も出ない
      ["in-fragment", "in-span", "item-a", "item-b"].forEach(id => {
        expect(
          testContainer.querySelector(`[data-testid="${id}"]`).tagName
        ).toBe("SPAN");
      });
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it("does not descend into custom components", () => {
      // Given: 独自コンポーネント（render prop を含む）で包んだサブコンポーネント
      const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      );
      const RenderProp = ({
        children,
      }: {
        children: (label: string) => React.ReactNode;
      }) => <>{children("render prop")}</>;
      testContainer.render(
        <ClickableCard>
          <Wrapper>
            <CardTitle data-testid="wrapped">Wrapped</CardTitle>
            <CardTitle as="span" data-testid="wrapped-explicit">
              Explicit
            </CardTitle>
          </Wrapper>
          <RenderProp>
            {label => <span data-testid="render-prop">{label}</span>}
          </RenderProp>
        </ClickableCard>
      );

      // Then: 独自コンポーネント内は自動付与されず（as の明示が必要）、render prop も壊れない
      expect(
        testContainer.querySelector('[data-testid="wrapped"]').tagName
      ).toBe("DIV");
      expect(
        testContainer.querySelector('[data-testid="wrapped-explicit"]').tagName
      ).toBe("SPAN");
      expect(
        testContainer.querySelector('[data-testid="render-prop"]').textContent
      ).toBe("render prop");
    });

    it("uses no hooks so it stays Server Component compatible", () => {
      // Given/When: React の描画外で関数として直接呼び出す（hooks を使うと Invalid hook call になる）
      // Then: 例外なく要素を返し、ClickableCard は子に as="span" を付与する
      expect(() => CardTitle({ children: "Title" })).not.toThrow();
      const button = ClickableCard({
        children: <CardTitle>Title</CardTitle>,
      });
      const child = button.props.children as React.ReactElement<{
        as?: string;
      }>;
      expect(child.props.as).toBe("span");
    });

    it("renders span only within the ClickableCard subtree", () => {
      // Given: ClickableCard の外にある Card（兄弟要素）
      testContainer.render(
        <>
          <ClickableCard>
            <CardTitle data-testid="inside">Inside</CardTitle>
          </ClickableCard>
          <Card>
            <CardTitle data-testid="outside">Outside</CardTitle>
          </Card>
        </>
      );

      // When: 各 CardTitle を取得
      const inside = testContainer.querySelector('[data-testid="inside"]');
      const outside = testContainer.querySelector('[data-testid="outside"]');

      // Then: ClickableCard の内側だけ span になる
      expect(inside.tagName).toBe("SPAN");
      expect(outside.tagName).toBe("DIV");
    });
  });

  describe("Accessibility", () => {
    it("provides proper semantic structure", () => {
      // Given: セマンティックな構造のカード
      testContainer.render(
        <Card role="article">
          <CardHeader>
            <CardTitle>Accessible Card</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Accessible content</CardDescription>
          </CardContent>
        </Card>
      );

      // When: セマンティック属性を確認
      const card = testContainer.querySelector("div");

      // Then: 適切なセマンティック構造が提供される
      expect(card.getAttribute("role")).toBe("article");
    });

    it("supports ARIA attributes for clickable cards", () => {
      // Given: ARIA属性付きのクリック可能なカード
      testContainer.render(
        <ClickableCard
          aria-label="Product card"
          aria-describedby="product-desc"
        >
          <CardTitle>Product Name</CardTitle>
          <CardDescription id="product-desc">
            Product description
          </CardDescription>
        </ClickableCard>
      );

      // When: ARIA属性を確認
      const card = testContainer.querySelector("button");

      // Then: 適切なARIA属性が設定される
      expect(card.getAttribute("aria-label")).toBe("Product card");
      expect(card.getAttribute("aria-describedby")).toBe("product-desc");
    });

    it("maintains keyboard navigation for clickable cards", async () => {
      // Given: キーボードナビゲーション可能なカード
      const handleKeyDown = vi.fn();
      testContainer.render(
        <ClickableCard onKeyDown={handleKeyDown}>
          Keyboard Accessible Card
        </ClickableCard>
      );

      // When: キーボードでナビゲーション
      const card = testContainer.querySelector("button");
      EventHelpers.focus(card as HTMLElement);
      await EventHelpers.keyDown(card, "Enter");

      // Then: キーボードナビゲーションが正常に動作
      expect(document.activeElement).toBe(card);
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Integration Tests", () => {
    it("works well in grid layouts", () => {
      // Given: グリッドレイアウト内のカード
      testContainer.render(
        <div className="grid grid-cols-2 gap-4">
          <Card data-testid="card1">
            <CardContent>Card 1</CardContent>
          </Card>
          <Card data-testid="card2">
            <CardContent>Card 2</CardContent>
          </Card>
        </div>
      );

      // When: グリッド内のカードを確認
      const card1 = testContainer.querySelector('[data-testid="card1"]');
      const card2 = testContainer.querySelector('[data-testid="card2"]');

      // Then: グリッドレイアウトで正常に動作
      expect(card1).toBeTruthy();
      expect(card2).toBeTruthy();
    });

    // 時間ベースのアサーションは CI 負荷で flaky のため skip
    // en: Skip time-based performance assertion; flaky on loaded CI runners
    it.skip("maintains performance with multiple cards", () => {
      // Given: 複数のカード要素
      const manyCards = Array.from({ length: 10 }, (_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Content for card {i + 1}</CardDescription>
          </CardContent>
        </Card>
      ));

      // When: 複数のカードを描画
      const startTime = performance.now();
      testContainer.render(<div>{manyCards}</div>);
      const endTime = performance.now();

      // Then: パフォーマンスが適切である
      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(40); // 40ms以下

      // And: カードが正常に描画される
      const container = testContainer.querySelector("div");
      expect(container).toBeTruthy();
      expect(container.children.length).toBe(10);
    });

    it("integrates well with form elements", async () => {
      // Given: フォーム要素と統合されたカード
      const handleSubmit = vi.fn(e => e.preventDefault());
      testContainer.render(
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Form Card</CardTitle>
            </CardHeader>
            <CardContent>
              <input data-testid="form-input" type="text" />
            </CardContent>
            <CardFooter>
              <button data-testid="submit-btn" type="submit">
                Submit
              </button>
            </CardFooter>
          </Card>
        </form>
      );

      // When: フォーム要素と操作
      const input = testContainer.querySelector('[data-testid="form-input"]');
      const submitBtn = testContainer.querySelector(
        '[data-testid="submit-btn"]'
      );

      EventHelpers.change(input as HTMLInputElement, "test value");
      await EventHelpers.click(submitBtn);

      // Then: フォームと正しく統合される
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect((input as HTMLInputElement).value).toBe("test value");
    });
  });
});
