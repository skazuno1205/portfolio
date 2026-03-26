import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../components/AchievementsSection", () => ({
  AchievementsSection: () => null,
}));
vi.mock("../components/BackToHudButton", () => ({
  BackToHudButton: () => null,
}));
vi.mock("../components/CadGallerySection", () => ({
  CadGallerySection: () => null,
}));
vi.mock("../components/CareerTimelineSection", () => ({
  CareerTimelineSection: ({
    activeStage,
    onSelect,
  }: {
    activeStage: { title: string };
    onSelect: (selection: { index: number; track: "parallel" }) => void;
  }) => (
    <div>
      <span>{activeStage.title}</span>
      <button
        onClick={() => onSelect({ track: "parallel", index: 0 })}
        type="button"
      >
        choose parallel
      </button>
    </div>
  ),
}));
vi.mock("../components/ContactSection", () => ({
  ContactSection: () => null,
}));
vi.mock("../components/HeroSection", () => ({
  HeroSection: () => null,
}));
vi.mock("../components/HobbiesSection", () => ({
  HobbiesSection: () => null,
}));
vi.mock("../components/ImageLightbox", () => ({
  ImageLightbox: () => null,
}));
vi.mock("../components/IntroSection", () => ({
  IntroSection: () => null,
}));
vi.mock("../components/InventorySection", () => ({
  InventorySection: () => null,
}));
vi.mock("../components/PastProjectsSection", () => ({
  PastProjectsSection: () => null,
}));
vi.mock("../components/PortfolioBackground", () => ({
  PortfolioBackground: () => null,
}));
vi.mock("../components/PortfolioFooter", () => ({
  PortfolioFooter: () => null,
}));
vi.mock("../components/PortfolioHeader", () => ({
  PortfolioHeader: () => <header id="portfolio-hud">header</header>,
}));
vi.mock("../components/QuestSection", () => ({
  QuestSection: () => null,
}));
vi.mock("../components/SkyLotteryModal", () => ({
  SkyLotteryModal: () => null,
}));
vi.mock("../components/StackSection", () => ({
  StackSection: () => null,
}));
vi.mock("../../hooks/useTypewriterMessage", () => ({
  useTypewriterMessage: () => "LOG",
}));
vi.mock("../../model/playerProfile", () => ({
  getPortfolioMeters: () => [],
}));
vi.mock("../../model/portfolioData", () => ({
  locations: [
    {
      description: "fallback stage",
      era: "STAGE 1",
      markerLabel: "2020",
      stats: ["A"],
      title: "Fallback Stage",
      x: "0%",
      y: "0%",
    },
  ],
  parallelStages: [],
  skyColorSlots: [
    {
      bottomHex: "#111111",
      glowRgb: "10, 20, 30",
      id: 0,
      label: "slot 0",
      swatchHex: "#111111",
      theme: "theme-night",
      topHex: "#222222",
    },
  ],
  statusCards: [],
  systemMessages: ["LOG"],
}));
vi.mock("../../model/skyLottery", () => ({
  createSkyLotteryBall: vi.fn(),
  createSkyLotteryBoard: vi.fn(() => ({
    airDrag: 0,
    ballRadius: 8,
    centerPull: 0,
    dividerWidth: 4,
    floorRestitution: 0.16,
    floorY: 296,
    gravity: 0.26,
    height: 320,
    leftWall: 0,
    pegRadius: 4,
    pegRestitution: 0.58,
    pegs: [],
    rightWall: 320,
    slotBounds: [{ center: 160, left: 0, right: 320 }],
    slotLabelFontSize: 8,
    slotLabelOffset: 8,
    slotTop: 200,
    spawnY: 40,
    wallRestitution: 0.5,
    width: 320,
  })),
  drawSkyLotteryScene: vi.fn(),
  stepSkyLotteryBall: vi.fn(),
}));

import { PortfolioPage } from "../PortfolioPage";

describe("PortfolioPage stage fallback", () => {
  it("falls back to the first main stage when the parallel route is empty", () => {
    render(<PortfolioPage />);

    fireEvent.click(screen.getByRole("button", { name: "choose parallel" }));

    expect(screen.getByText("Fallback Stage")).toBeInTheDocument();
  });
});
