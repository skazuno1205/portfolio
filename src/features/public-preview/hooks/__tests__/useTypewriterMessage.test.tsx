import { renderHook } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useTypewriterMessage } from "../useTypewriterMessage";

describe("useTypewriterMessage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns an empty string when there are no messages", () => {
    const { result } = renderHook(() => useTypewriterMessage([]));

    expect(result.current).toBe("");
  });

  it("types each message and advances to the next one", () => {
    const { result } = renderHook(() => useTypewriterMessage(["ABC", "Z"]));

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(36);
    });
    expect(result.current).toBe("A");

    act(() => {
      vi.advanceTimersByTime(36);
    });
    expect(result.current).toBe("AB");

    act(() => {
      vi.advanceTimersByTime(36);
    });
    expect(result.current).toBe("ABC");

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(36);
    });
    expect(result.current).toBe("Z");
  });

  it("stops the timeout callback after cleanup", () => {
    let timeoutCallback: (() => void) | undefined;
    const setTimeoutSpy = vi.spyOn(window, "setTimeout").mockImplementation(((
      callback: TimerHandler,
    ) => {
      timeoutCallback = callback as () => void;
      return 1;
    }) as typeof window.setTimeout);
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() => useTypewriterMessage(["AB"]));

    unmount();
    timeoutCallback?.();

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
  });

  it("falls back to an empty current message when the message list shrinks", () => {
    const { rerender, result } = renderHook(
      ({ messages }) => useTypewriterMessage(messages),
      {
        initialProps: {
          messages: ["A", "B"],
        },
      },
    );

    act(() => {
      vi.advanceTimersByTime(36);
    });
    expect(result.current).toBe("A");

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(36);
    });
    expect(result.current).toBe("B");

    rerender({ messages: ["A"] });

    expect(result.current).toBe("");
  });
});
