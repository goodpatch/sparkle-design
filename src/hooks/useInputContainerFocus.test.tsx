/**
 * @jest-environment jsdom
 */
import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { EventHelpers, TestContainer } from "../test/helpers";
import { useInputContainerFocus } from "./useInputContainerFocus";

interface HarnessProps {
  isDisabled?: boolean;
  withExclude?: boolean;
}

const Harness: React.FC<HarnessProps> = ({ isDisabled, withExclude }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const excludeRefs = React.useMemo(
    () => (withExclude ? [buttonRef] : []),
    [withExclude]
  );
  const handleContainerClick = useInputContainerFocus({
    targetRef: inputRef,
    isDisabled,
    excludeRefs,
  });
  return (
    <div
      data-testid="container"
      onClick={handleContainerClick}
      role="presentation"
      tabIndex={-1}
    >
      <input ref={inputRef} data-testid="input" />
      <button ref={buttonRef} data-testid="button" type="button">
        btn
      </button>
    </div>
  );
};

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("useInputContainerFocus", () => {
  it("コンテナクリックでターゲットにフォーカスを移す / focuses the target on container click", () => {
    // Given: ハーネスをレンダリング
    testContainer.render(<Harness />);
    const container = testContainer.queryByTestId("container");
    const input = testContainer.queryByTestId<HTMLInputElement>("input");

    // When: コンテナをクリック
    EventHelpers.click(container);

    // Then: input にフォーカスが移る
    expect(document.activeElement).toBe(input);
  });

  it("excludeRefs に含まれる要素のクリックではフォーカスを移さない / skips focus when click originates in excluded refs", () => {
    // Given: ボタンを exclude 対象にしたハーネス
    testContainer.render(<Harness withExclude />);
    const button = testContainer.queryByTestId("button");

    // When: ボタンをクリック
    EventHelpers.click(button);

    // Then: input にはフォーカスが移らない
    const input = testContainer.queryByTestId<HTMLInputElement>("input");
    expect(document.activeElement).not.toBe(input);
  });

  it("isDisabled のときは何もしない / does nothing when disabled", () => {
    // Given: disabled なハーネス
    testContainer.render(<Harness isDisabled />);
    const container = testContainer.queryByTestId("container");
    const input = testContainer.queryByTestId<HTMLInputElement>("input");

    // When: コンテナをクリック
    EventHelpers.click(container);

    // Then: input にフォーカスは移らない
    expect(document.activeElement).not.toBe(input);
  });
});
