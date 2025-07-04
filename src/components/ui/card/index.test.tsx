import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardControl,
  CardContent,
  CardFooter,
} from "./index";

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
        testContainer.render(<Card>Basic Card Content</Card>);

        // When: div要素を確認
        const card = testContainer.querySelector("div");

        // Then: 正常に描画される
        expect(card).toBeTruthy();
        expect(card.textContent).toBe("Basic Card Content");
      });

      it("applies base styles correctly", () => {
        // Given: 基本的なCard
        testContainer.render(<Card>Styled Card</Card>);

        // When: スタイルクラスを確認
        const card = testContainer.querySelector("div");

        // Then: 基本スタイルが適用される
        expect(card.className).toContain("rounded-minimum");
        expect(card.className).toContain("border");
        expect(card.className).toContain("border-divider-low");
        expect(card.className).toContain("bg-white");
        expect(card.className).toContain("text-text-middle");
        expect(card.className).toContain("py-4");
      });

      it("supports custom className", () => {
        // Given: カスタムクラス付きのCard
        const customClass = "my-custom-card-class";
        testContainer.render(<Card className={customClass}>Custom Card</Card>);

        // When: クラス名を確認
        const card = testContainer.querySelector("div");

        // Then: カスタムクラスが追加される
        expect(card.className).toContain(customClass);
      });

      it("forwards DOM attributes", () => {
        // Given: カスタム属性付きのCard
        const testId = "custom-card-id";
        testContainer.render(
          <Card data-testid={testId} role="article">
            Attributed Card
          </Card>
        );

        // When: 属性を確認
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
        testContainer.render(<ClickableCard>Clickable Card</ClickableCard>);

        // When: button要素を確認
        const card = testContainer.querySelector("button");

        // Then: 正常に描画される
        expect(card).toBeTruthy();
        expect(card.textContent).toBe("Clickable Card");
        expect((card as HTMLButtonElement).type).toBe("button");
      });

      it("applies clickable styles correctly", () => {
        // Given: 基本的なClickableCard
        testContainer.render(<ClickableCard>Clickable Card</ClickableCard>);

        // When: スタイルクラスを確認
        const card = testContainer.querySelector("button");

        // Then: クリック可能なスタイルが適用される
        expect(card.className).toContain("rounded-action");
        expect(card.className).toContain("cursor-pointer");
        expect(card.className).toContain("hover:bg-neutral-50");
        expect(card.className).toContain("transition-colors");
        expect(card.className).toContain("active:bg-neutral-50");
        expect(card.className).toContain("active:shadow-float");
        expect(card.className).toContain("active:border-primary-400");
      });

      it("has proper focus styles", () => {
        // Given: フォーカス可能なClickableCard
        testContainer.render(<ClickableCard>Focusable Card</ClickableCard>);

        // When: フォーカススタイルを確認
        const card = testContainer.querySelector("button");

        // Then: フォーカススタイルが適用される
        expect(card.className).toContain("focus-visible:outline-hidden");
        expect(card.className).toContain("focus-visible:ring-2");
        expect(card.className).toContain("focus-visible:ring-ring");
        expect(card.className).toContain("focus-visible:ring-offset-2");
      });
    });

    describe("User Interaction", () => {
      it("handles click events properly", async () => {
        // Given: clickハンドラー付きのClickableCard
        const handleClick = vi.fn();
        testContainer.render(
          <ClickableCard onClick={handleClick}>Click Me</ClickableCard>
        );

        // When: カードをクリック
        const card = testContainer.querySelector("button");
        await EventHelpers.click(card);

        // Then: クリックハンドラーが呼ばれる
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("provides click event details", async () => {
        // Given: イベント詳細をチェックするハンドラー
        const handleClick = vi.fn();
        testContainer.render(
          <ClickableCard onClick={handleClick}>Event Card</ClickableCard>
        );

        // When: カードをクリック
        const card = testContainer.querySelector("button");
        await EventHelpers.click(card);

        // Then: 正しいイベントオブジェクトが渡される
        expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
        expect(handleClick.mock.calls[0][0].type).toBe("click");
      });

      it("supports keyboard interaction", async () => {
        // Given: キーボードイベントハンドラー付きのClickableCard
        const handleKeyDown = vi.fn();
        testContainer.render(
          <ClickableCard onKeyDown={handleKeyDown}>Keyboard Card</ClickableCard>
        );

        // When: キーボードイベントを実行
        const card = testContainer.querySelector("button");
        await EventHelpers.keyDown(card, "Enter");

        // Then: キーボードイベントが処理される
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
      });

      it("can be focused", () => {
        // Given: フォーカス可能なClickableCard
        testContainer.render(<ClickableCard>Focusable Card</ClickableCard>);

        // When: フォーカスする
        const card = testContainer.querySelector("button");
        EventHelpers.focus(card as HTMLElement);

        // Then: フォーカスが設定される
        expect(document.activeElement).toBe(card);
      });
    });

    describe("Disabled State", () => {
      it("applies disabled styles when isDisabled is true", () => {
        // Given: 無効化されたClickableCard
        testContainer.render(
          <ClickableCard isDisabled>Disabled Card</ClickableCard>
        );

        // When: 要素とスタイルを確認
        const card = testContainer.querySelector("button");

        // Then: 無効化スタイルが適用される
        expect((card as HTMLButtonElement).disabled).toBe(true);
        expect(card.className).toContain("disabled:cursor-not-allowed");
        expect(card.className).toContain("disabled:bg-white");
        expect(card.className).toContain("disabled:border-secondary-100");
        expect(card.className).toContain("disabled:text-secondary-200");
        expect(card.className).toContain("disabled:shadow-flat");
      });

      it("does not respond to clicks when disabled", async () => {
        // Given: 無効化されたClickableCard
        const handleClick = vi.fn();
        testContainer.render(
          <ClickableCard isDisabled onClick={handleClick}>
            Disabled Clickable
          </ClickableCard>
        );

        // When: クリックを試行
        const card = testContainer.querySelector("button");
        await EventHelpers.click(card);

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
    it("applies spacing by default", () => {
      // Given: デフォルトのCardContent
      testContainer.render(<CardContent>Content with spacing</CardContent>);

      // When: スタイルクラスを確認
      const content = testContainer.querySelector("div");

      // Then: デフォルトでスペーシングが適用される
      expect(content.className).toContain("px-6");
      expect(content.className).toContain("py-2");
      expect(content.textContent).toBe("Content with spacing");
    });

    it("removes spacing when isSpace is false", () => {
      // Given: isSpace=falseのCardContent
      testContainer.render(
        <CardContent isSpace={false}>Content without spacing</CardContent>
      );

      // When: スタイルクラスを確認
      const content = testContainer.querySelector("div");

      // Then: スペーシングが適用されない
      expect(content.className).not.toContain("px-6");
      expect(content.className).not.toContain("py-2");
      expect(content.textContent).toBe("Content without spacing");
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

      // Then: カード全体がクリック可能
      expect(card).toBeTruthy();
      expect((card as HTMLButtonElement).type).toBe("button");
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

    it("maintains performance with multiple cards", () => {
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
