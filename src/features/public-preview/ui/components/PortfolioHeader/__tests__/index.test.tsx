import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../../model/playerProfile", () => ({
  getCurrentAge: () => 32,
}));

import {
  PortfolioHeader,
  attachHashchangeSync,
  getCurrentBrowserWindow,
  getMatchedCommandHref,
  moveToWorld,
} from "..";

describe("PortfolioHeader", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    window.location.hash = "";
    vi.restoreAllMocks();
  });

  it("syncs the active command from the current hash and updates on hashchange", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    window.location.hash = "#inventory";

    const { unmount } = render(<PortfolioHeader />);

    expect(screen.getByRole("link", { name: /Inventory/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByText("Lv. 32")).toBeInTheDocument();
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "hashchange",
      expect.any(Function),
    );

    window.location.hash = "#cad-lab";
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(screen.getByRole("link", { name: /CAD/ })).toHaveAttribute(
      "aria-current",
      "location",
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "hashchange",
      expect.any(Function),
    );
  });

  it("moves to progression when the player panel is clicked", () => {
    const scrollIntoViewMock = vi.fn();
    const progressionTarget = document.createElement("div");
    progressionTarget.id = "PROGRESSION";
    progressionTarget.scrollIntoView = scrollIntoViewMock;
    document.body.append(progressionTarget);

    render(<PortfolioHeader />);

    fireEvent.click(screen.getByRole("button", { name: /Shota Kazuno/ }));

    expect(window.location.hash).toBe("#PROGRESSION");
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(screen.getByRole("link", { name: /PROGRESSION/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("exposes helpers for missing-window scenarios", () => {
    const setActiveHref = vi.fn();
    const currentDocument = {
      getElementById: vi.fn(() => null),
    } as unknown as Document;
    const currentWindow = globalThis.window;

    expect(getCurrentBrowserWindow()).toBe(currentWindow);
    moveToWorld(undefined, currentDocument, setActiveHref);
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: undefined,
    });

    expect(setActiveHref).toHaveBeenCalledWith("#PROGRESSION");
    expect(getCurrentBrowserWindow()).toBeUndefined();
    expect(getMatchedCommandHref("#inventory")).toBe("#inventory");
    expect(getMatchedCommandHref("#unknown")).toBeUndefined();
    expect(attachHashchangeSync(undefined, setActiveHref)).toBeUndefined();

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: currentWindow,
    });
  });
});
