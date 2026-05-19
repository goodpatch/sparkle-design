/**
 * @jest-environment jsdom
 */
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TestContainer } from "../test/helpers";
import { useMergeRefs } from "./useMergeRefs";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("useMergeRefs", () => {
  it("複数の RefObject に同じ DOM ノードを書き込む / writes the same node to multiple ref objects", () => {
    // Given: 2 つの ref object をマージするコンポーネント
    const refA = React.createRef<HTMLDivElement>();
    const refB = React.createRef<HTMLDivElement>();
    const TestComp: React.FC = () => {
      const merged = useMergeRefs(refA, refB);
      return <div ref={merged} data-testid="target" />;
    };

    // When: レンダリング
    testContainer.render(<TestComp />);

    // Then: 両方の ref に同じノードが入る
    const node = testContainer.queryByTestId("target");
    expect(refA.current).toBe(node);
    expect(refB.current).toBe(node);
  });

  it("callback ref にも値を渡す / forwards the value to callback refs", () => {
    // Given: callback ref と ref object をマージするコンポーネント
    const callback = vi.fn();
    const refObj = React.createRef<HTMLDivElement>();
    const TestComp: React.FC = () => {
      const merged = useMergeRefs<HTMLDivElement>(callback, refObj);
      return <div ref={merged} data-testid="target" />;
    };

    // When: レンダリング
    testContainer.render(<TestComp />);

    // Then: callback が DOM ノードで呼ばれる
    const node = testContainer.queryByTestId("target");
    expect(callback).toHaveBeenCalledWith(node);
    expect(refObj.current).toBe(node);
  });

  it("undefined な ref は無視する / ignores undefined refs without throwing", () => {
    // Given: undefined を含む ref 配列
    const refA = React.createRef<HTMLDivElement>();
    const TestComp: React.FC = () => {
      const merged = useMergeRefs<HTMLDivElement>(refA, undefined);
      return <div ref={merged} data-testid="target" />;
    };

    // When/Then: 例外を投げない
    expect(() => testContainer.render(<TestComp />)).not.toThrow();
    expect(refA.current).toBeInstanceOf(HTMLDivElement);
  });
});
