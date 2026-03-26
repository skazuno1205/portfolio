import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type EquipmentSlot, InventoryLoadout, InventorySection } from "..";

describe("InventorySection", () => {
  it("renders the frontend and hardware inventory cards", () => {
    render(<InventorySection />);

    expect(
      screen.getByRole("heading", { name: "Skills & Equipment" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frontend Stack" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Hardware Gear" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "React" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Fusion360" }),
    ).toBeInTheDocument();
  });

  it("falls back to the text icon when an image is not available", () => {
    const slots: EquipmentSlot[] = [
      {
        iconText: "AI",
        id: "ai-tool",
        label: "AI Tool",
        tone: "cyan",
      },
    ];

    render(<InventoryLoadout slots={slots} />);

    expect(screen.getByRole("button", { name: "AI Tool" })).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });
});
