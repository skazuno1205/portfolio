import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BackToHudButton } from "..";

describe("BackToHudButton", () => {
  it("does not render when hidden", () => {
    render(<BackToHudButton visible={false} />);

    expect(
      screen.queryByRole("button", { name: /BACK TO HUD/ }),
    ).not.toBeInTheDocument();
  });

  it("scrolls to the top when clicked", () => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollToMock,
    });

    render(<BackToHudButton visible />);

    fireEvent.click(screen.getByRole("button", { name: /BACK TO HUD/ }));

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
