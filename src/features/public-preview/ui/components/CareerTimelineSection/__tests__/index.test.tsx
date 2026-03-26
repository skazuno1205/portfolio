import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CareerTimelineSection } from "..";
import type { Location, ParallelStage } from "../../../../model/portfolioData";

const locations: Location[] = [
  {
    description: "frontend stage",
    era: "STAGE 2020",
    markerLabel: "2020",
    stats: ["React", "TypeScript"],
    title: "Frontend City",
    x: "10%",
    y: "20%",
  },
  {
    description: "hardware stage",
    era: "STAGE 2024",
    markerLabel: "2024",
    stats: ["Hardware", "CAD"],
    title: "Hardware Garage",
    x: "30%",
    y: "40%",
  },
];

const parallelStages: ParallelStage[] = [
  {
    description: "side route",
    era: "SIDE 2022",
    markerLabel: "2022",
    stats: ["Shopify"],
    title: "kutsulab CTO",
  },
];

describe("CareerTimelineSection", () => {
  it("renders the active stage and lets the user switch tracks", () => {
    const onSelect = vi.fn();

    render(
      <CareerTimelineSection
        activeSelection={{ track: "main", index: 0 }}
        activeStage={locations[0]}
        activeStageIndex={0}
        activeTrackItems={locations}
        locations={locations}
        onSelect={onSelect}
        parallelStages={parallelStages}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Career Stages" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frontend City" }),
    ).toBeInTheDocument();
    expect(screen.getByText("01 / 02")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2020" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "2024" }));
    fireEvent.click(
      screen.getByRole("button", { name: "2022 の Side Route を表示" }),
    );

    expect(onSelect).toHaveBeenNthCalledWith(1, { track: "main", index: 1 });
    expect(onSelect).toHaveBeenNthCalledWith(2, {
      track: "parallel",
      index: 0,
    });
  });
});
