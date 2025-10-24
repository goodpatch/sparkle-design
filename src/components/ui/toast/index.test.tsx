import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { toast, Toast } from "./index";

describe("ToastToaster", () => {
  it("renders the toaster container", async () => {
    // Given: デフォルトのトーストコンテナをレンダリングする
    render(<Toast />);

    // Then: data-slot="toast-toaster" を持つ要素が配置される
    await waitFor(() => {
      const liveRegion = document.querySelector("section[aria-live='polite']");
      expect(liveRegion).not.toBeNull();
    });
  });

  it("returns an identifier when triggering toast", () => {
    // Given: トーストを表示できるコンテナをレンダリングする
    render(<Toast />);

    // When: toast を呼び出す
    let toastId: string | number | undefined;
    act(() => {
      toastId = toast("テストトースト");
    });

    // Then: toast 関数は識別子を返す
    expect(typeof toastId === "number" || typeof toastId === "string").toBe(
      true
    );

    act(() => {
      toast.dismiss(toastId);
    });
  });
});
