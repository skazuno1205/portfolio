import { describe, expect, it, vi } from "vitest";

vi.mock("../ui/PortfolioPage", () => {
  const PortfolioPage = () => null;

  return {
    PortfolioPage,
  };
});

describe("public-preview index", () => {
  it("re-exports PortfolioPage", async () => {
    const { PortfolioPage } = await import("../ui/PortfolioPage");
    const publicPreview = await import("..");

    expect(publicPreview.PortfolioPage).toBe(PortfolioPage);
  });
});
