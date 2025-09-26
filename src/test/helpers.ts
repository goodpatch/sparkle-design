// テストヘルパー関数とユーティリティ
// en: Test helper functions and utilities
import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "@testing-library/react";

/**
 * テストコンテナのセットアップとクリーンアップを管理するヘルパー
 * en: Helper to manage test container setup and cleanup
 */
export class TestContainer {
  private container: HTMLDivElement | null = null;
  private root: ReactDOM.Root | null = null;

  setup(): void {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.root = ReactDOM.createRoot(this.container);
  }

  cleanup(): void {
    if (this.root) {
      act(() => {
        this.root!.unmount();
      });
      this.root = null;
    }
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  render(element: React.ReactElement): void {
    if (!this.root) {
      throw new Error("Container not set up. Call setup() first.");
    }
    act(() => {
      this.root!.render(element);
    });
  }

  getContainer(): HTMLDivElement {
    if (!this.container) {
      throw new Error("Container not set up. Call setup() first.");
    }
    return this.container;
  }

  querySelector<T extends Element = Element>(selector: string): T {
    const element = this.getContainer().querySelector<T>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  queryByTestId<T extends HTMLElement = HTMLElement>(testId: string): T {
    return this.querySelector<T>(`[data-testid="${testId}"]`);
  }

  queryInput(selector: string = "input"): HTMLInputElement {
    const element =
      this.getContainer().querySelector<HTMLInputElement>(selector);
    if (!element) {
      throw new Error(`Input element not found: ${selector}`);
    }
    return element;
  }

  queryButton(selector: string = "button"): HTMLButtonElement {
    const element =
      this.getContainer().querySelector<HTMLButtonElement>(selector);
    if (!element) {
      throw new Error(`Button element not found: ${selector}`);
    }
    return element;
  }
}

/**
 * イベントディスパッチのヘルパー
 * en: Event dispatch helpers
 */
export const EventHelpers = {
  click(element: Element): void {
    act(() => {
      element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  },

  change(element: HTMLInputElement | HTMLTextAreaElement, value: string): void {
    act(() => {
      // input/textarea 双方に対応した value セッターを取得
      // en: obtain native value setter for both input and textarea
      const proto =
        element instanceof HTMLTextAreaElement
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype;
      const nativeValueSetter = Object.getOwnPropertyDescriptor(
        proto,
        "value"
      )?.set;
      if (nativeValueSetter) {
        nativeValueSetter.call(element, value);
      } else {
        (element as any).value = value; // フォールバック / fallback
      }
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    });
  },

  keyDown(element: Element, key: string): void {
    act(() => {
      element.dispatchEvent(
        new KeyboardEvent("keydown", { key, bubbles: true })
      );
    });
  },

  focus(element: HTMLElement): void {
    act(() => {
      element.focus();
    });
  },

  blur(element: HTMLElement): void {
    act(() => {
      element.blur();
    });
  },
};

/**
 * アクセシビリティテストのヘルパー
 * en: Accessibility test helpers
 */
export const A11yHelpers = {
  hasAriaLabel(element: Element, expectedLabel: string): boolean {
    return element.getAttribute("aria-label") === expectedLabel;
  },

  hasAriaDescribedBy(element: Element): boolean {
    return element.hasAttribute("aria-describedby");
  },

  hasRole(element: Element, expectedRole: string): boolean {
    return element.getAttribute("role") === expectedRole;
  },

  isDisabled(element: Element): boolean {
    return (
      element.hasAttribute("disabled") ||
      element.getAttribute("aria-disabled") === "true"
    );
  },

  hasValidAriaExpanded(element: Element): boolean {
    const ariaExpanded = element.getAttribute("aria-expanded");
    return ariaExpanded === "true" || ariaExpanded === "false";
  },
};

/**
 * CSS クラステストのヘルパー
 * en: CSS class test helpers
 */
export const StyleHelpers = {
  hasClass(element: Element, className: string): boolean {
    return element.classList.contains(className);
  },

  hasClasses(element: Element, classNames: string[]): boolean {
    return classNames.every(className => element.classList.contains(className));
  },

  getComputedStyleProperty(element: Element, property: string): string {
    return window.getComputedStyle(element).getPropertyValue(property);
  },
};

/**
 * 非同期テストのヘルパー
 * en: Async test helpers
 */
export const AsyncHelpers = {
  waitFor(
    callback: () => boolean | void,
    timeout = 1000,
    interval = 50
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const check = (): void => {
        try {
          const result = callback();
          if (result !== false) {
            resolve();
            return;
          }
        } catch (error) {
          // Continue checking
        }

        if (Date.now() - startTime >= timeout) {
          reject(new Error(`Timeout after ${timeout}ms`));
          return;
        }

        setTimeout(check, interval);
      };

      check();
    });
  },

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};
