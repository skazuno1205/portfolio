import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../features/public-preview", () => ({
  PortfolioPage: () => <div>portfolio page mock</div>,
}));

import { App } from "../App";

describe("App", () => {
  it("renders the public preview page", () => {
    render(<App />);

    expect(screen.getByText("portfolio page mock")).toBeInTheDocument();
  });
});
