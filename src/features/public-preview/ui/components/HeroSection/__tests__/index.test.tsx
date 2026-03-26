import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeroSection } from "..";
import type { Meter, StatusCard } from "../../../../model/portfolioData";

const statusCards: StatusCard[] = [
  { label: "CLASS", value: "Frontend Engineer" },
  { label: "WORLD", value: "Portfolio" },
];

const meters: Meter[] = [
  {
    label: "BUILD TIME",
    valueLabel: "10H",
    width: 75,
    fillClassName: "expFill",
  },
  {
    label: "EXP / CAREER",
    valueLabel: "",
    width: 42,
    levelLabel: "LV.32",
    progressLabel: "EXP 111 / 365",
    nextLevelLabel: "NEXT LEVEL IN 254 EXP",
  },
];

describe("HeroSection", () => {
  it("renders status cards, meters, and the system log", () => {
    const onOpenSkyModal = vi.fn();
    const { rerender } = render(
      <HeroSection
        meterAnimated={false}
        meters={meters}
        onOpenSkyModal={onOpenSkyModal}
        statusCards={statusCards}
        typewriterMessage="SYSTEM > ACTIVE"
      />,
    );

    expect(screen.getByText("CLASS")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("BUILD TIME")).toBeInTheDocument();
    expect(screen.getByText("10H")).toBeInTheDocument();
    expect(screen.getByText("EXP / CAREER")).toBeInTheDocument();
    expect(screen.getByText("LV.32")).toBeInTheDocument();
    expect(screen.getByText("EXP 111 / 365")).toBeInTheDocument();
    expect(screen.getByText("NEXT LEVEL IN 254 EXP")).toBeInTheDocument();
    expect(screen.getByText("SYSTEM > ACTIVE")).toBeInTheDocument();

    const meterFills = document.querySelectorAll('span[style*="width"]');
    expect(meterFills[0]).toHaveStyle({ width: "0%" });
    expect(meterFills[1]).toHaveStyle({ width: "0%" });

    rerender(
      <HeroSection
        meterAnimated
        meters={meters}
        onOpenSkyModal={onOpenSkyModal}
        statusCards={statusCards}
        typewriterMessage="SYSTEM > ACTIVE"
      />,
    );

    expect(meterFills[0]).toHaveStyle({ width: "75%" });
    expect(meterFills[1]).toHaveStyle({ width: "42%" });

    fireEvent.click(screen.getByRole("button", { name: "CHANGE SKY" }));

    expect(onOpenSkyModal).toHaveBeenCalledTimes(1);
  });
});
