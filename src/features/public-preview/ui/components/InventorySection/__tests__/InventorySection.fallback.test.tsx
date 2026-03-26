import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("InventorySection fallback data", () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
  });

  it("renders an inventory card even when no loadout is configured", async () => {
    vi.doMock("../../../../model/portfolioData", () => ({
      inventories: [
        {
          items: ["Unknown Tool"],
          note: "",
          title: "Mystery Gear",
        },
      ],
    }));

    const { InventorySection } = await import("..");

    render(<InventorySection />);

    expect(
      screen.getByRole("heading", { name: "Mystery Gear" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Unknown Tool" }),
    ).not.toBeInTheDocument();
  });
});
