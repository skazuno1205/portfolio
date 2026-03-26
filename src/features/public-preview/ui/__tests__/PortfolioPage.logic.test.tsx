import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockFlags,
  createSkyLotteryBallMock,
  createSkyLotteryBoardMock,
  drawSkyLotterySceneMock,
  stepSkyLotteryBallMock,
} = vi.hoisted(() => ({
  mockFlags: {
    attachSkyHost: true,
  },
  createSkyLotteryBallMock: vi.fn(
    (board: { width: number; spawnY: number }) => ({
      color: "#fff",
      radius: 8,
      settled: false,
      slotIndex: -1,
      stableFrames: 0,
      vx: 0,
      vy: 0,
      x: board.width / 2,
      y: board.spawnY,
    }),
  ),
  createSkyLotteryBoardMock: vi.fn((width: number, height: number) => ({
    airDrag: 0,
    ballRadius: 8,
    centerPull: 0,
    dividerWidth: 4,
    floorRestitution: 0.16,
    floorY: height - 24,
    gravity: 0.26,
    height,
    leftWall: 0,
    pegRadius: 4,
    pegRestitution: 0.58,
    pegs: [],
    rightWall: width,
    slotBounds: [
      { center: width * 0.25, left: 0, right: width * 0.5 },
      { center: width * 0.75, left: width * 0.5, right: width },
    ],
    slotLabelFontSize: 8,
    slotLabelOffset: 8,
    slotTop: height - 120,
    spawnY: 40,
    wallRestitution: 0.5,
    width,
  })),
  drawSkyLotterySceneMock: vi.fn(),
  stepSkyLotteryBallMock: vi.fn(),
}));

vi.mock("../components/AchievementsSection", () => ({
  AchievementsSection: () => <div>achievements</div>,
}));
vi.mock("../components/BackToHudButton", () => ({
  BackToHudButton: ({ visible }: { visible: boolean }) =>
    visible ? <button type="button">BACK TO HUD</button> : null,
}));
vi.mock("../components/CadGallerySection", () => ({
  CadGallerySection: () => <div>cad</div>,
}));
vi.mock("../components/CareerTimelineSection", () => ({
  CareerTimelineSection: ({
    activeSelection,
    activeStage,
    onSelect,
  }: {
    activeSelection: { index: number; track: string };
    activeStage: { title: string };
    onSelect: (selection: {
      index: number;
      track: "main" | "parallel";
    }) => void;
  }) => (
    <div>
      <span>{`${activeSelection.track}:${activeSelection.index}`}</span>
      <span>{activeStage.title}</span>
      <button
        onClick={() => onSelect({ track: "parallel", index: 0 })}
        type="button"
      >
        select parallel
      </button>
    </div>
  ),
}));
vi.mock("../components/ContactSection", () => ({
  ContactSection: () => <div>contact</div>,
}));
vi.mock("../components/HeroSection", () => ({
  HeroSection: ({
    meterAnimated,
    onOpenSkyModal,
    typewriterMessage,
  }: {
    meterAnimated: boolean;
    onOpenSkyModal: () => void;
    typewriterMessage: string;
  }) => (
    <div>
      <span>{meterAnimated ? "meters-on" : "meters-off"}</span>
      <span>{typewriterMessage}</span>
      <button onClick={onOpenSkyModal} type="button">
        open sky modal
      </button>
    </div>
  ),
}));
vi.mock("../components/HobbiesSection", () => ({
  HobbiesSection: () => <div>hobbies</div>,
}));
vi.mock("../components/ImageLightbox", () => ({
  ImageLightbox: ({
    image,
    onClose,
  }: {
    image: { alt: string; src: string };
    onClose: () => void;
  }) => (
    <div>
      <span>{image.alt}</span>
      <span>{image.src}</span>
      <button onClick={onClose} type="button">
        close preview
      </button>
    </div>
  ),
}));
vi.mock("../components/IntroSection", () => ({
  IntroSection: () => <div>intro</div>,
}));
vi.mock("../components/InventorySection", () => ({
  InventorySection: () => <div>inventory</div>,
}));
vi.mock("../components/PastProjectsSection", () => ({
  PastProjectsSection: ({
    onPreviewImage,
    onToggleShowAll,
    showAll,
  }: {
    onPreviewImage: (image: { alt: string; src: string }) => void;
    onToggleShowAll: () => void;
    showAll: boolean;
  }) => (
    <div>
      <span>{showAll ? "archive-open" : "archive-closed"}</span>
      <button
        onClick={() =>
          onPreviewImage({
            alt: "preview alt",
            src: "/images/mock-preview.png",
          })
        }
        type="button"
      >
        open preview
      </button>
      <button onClick={onToggleShowAll} type="button">
        toggle archive
      </button>
    </div>
  ),
}));
vi.mock("../components/PortfolioBackground", () => ({
  PortfolioBackground: ({ stars }: { stars: unknown[] }) => (
    <div>{`stars:${stars.length}`}</div>
  ),
}));
vi.mock("../components/PortfolioFooter", () => ({
  PortfolioFooter: () => <div>footer</div>,
}));
vi.mock("../components/PortfolioHeader", () => ({
  PortfolioHeader: () => <header id="portfolio-hud">header</header>,
}));
vi.mock("../components/QuestSection", () => ({
  QuestSection: () => <div>quests</div>,
}));
vi.mock("../components/SkyLotteryModal", () => ({
  SkyLotteryModal: ({
    canvasRef,
    hostRef,
    isDrawing,
    isOpen,
    onClose,
    onDraw,
    selectedSkySlot,
  }: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    hostRef: React.RefObject<HTMLDivElement | null>;
    isDrawing: boolean;
    isOpen: boolean;
    onClose: () => void;
    onDraw: () => void;
    selectedSkySlot: { id: number };
  }) =>
    isOpen ? (
      <div>
        <span>{`slot:${selectedSkySlot.id}`}</span>
        <span>{isDrawing ? "drawing" : "idle"}</span>
        {mockFlags.attachSkyHost ? (
          <div data-testid="sky-host" ref={hostRef} />
        ) : null}
        <canvas aria-label="sky-canvas" ref={canvasRef} />
        <button onClick={onDraw} type="button">
          draw sky
        </button>
        <button onClick={onClose} type="button">
          close sky
        </button>
      </div>
    ) : null,
}));
vi.mock("../components/StackSection", () => ({
  StackSection: () => <div>stack</div>,
}));
vi.mock("../../hooks/useTypewriterMessage", () => ({
  useTypewriterMessage: () => "MOCK LOG",
}));
vi.mock("../../model/playerProfile", () => ({
  getPortfolioMeters: () => [
    { label: "BUILD TIME", valueLabel: "10H", width: 80 },
    {
      fillClassName: "expFill",
      label: "EXP / CAREER",
      valueLabel: "UNTIL DEC",
      width: 50,
    },
  ],
}));
vi.mock("../../model/portfolioData", () => ({
  locations: [
    {
      description: "main stage",
      era: "STAGE 1",
      markerLabel: "2020",
      stats: ["A"],
      title: "Main Stage",
      x: "0%",
      y: "0%",
    },
  ],
  parallelStages: [
    {
      description: "parallel stage",
      era: "SIDE",
      markerLabel: "NOW",
      stats: ["B"],
      title: "Parallel Stage",
    },
  ],
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
    {
      bottomHex: "#333333",
      glowRgb: "40, 50, 60",
      id: 1,
      label: "slot 1",
      swatchHex: "#333333",
      theme: "theme-sunset",
      topHex: "#444444",
    },
  ],
  statusCards: [{ label: "CLASS", value: "Tester" }],
  systemMessages: ["MOCK LOG"],
}));
vi.mock("../../model/skyLottery", () => ({
  createSkyLotteryBall: createSkyLotteryBallMock,
  createSkyLotteryBoard: createSkyLotteryBoardMock,
  drawSkyLotteryScene: drawSkyLotterySceneMock,
  stepSkyLotteryBall: stepSkyLotteryBallMock,
}));

import { PortfolioPage } from "../PortfolioPage";

let headerBottom = 32;
let hostWidth = 720;
let hostHeight = 480;
let resizeObserverCallback: (() => void) | undefined;
const frameCallbacks: FrameRequestCallback[] = [];
const canvasContextStub = {
  setTransform: vi.fn(),
};

class ResizeObserverMock {
  constructor(callback: () => void) {
    resizeObserverCallback = callback;
  }

  disconnect = vi.fn();
  observe = vi.fn();
}

beforeEach(() => {
  cleanup();
  frameCallbacks.length = 0;
  resizeObserverCallback = undefined;
  headerBottom = 32;
  hostWidth = 720;
  hostHeight = 480;
  mockFlags.attachSkyHost = true;
  createSkyLotteryBoardMock.mockClear();
  createSkyLotteryBallMock.mockClear();
  drawSkyLotterySceneMock.mockClear();
  stepSkyLotteryBallMock.mockReset();
  stepSkyLotteryBallMock.mockImplementation((ball: { slotIndex: number }) => ({
    ...ball,
    settled: true,
    slotIndex: 1,
  }));

  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: function getBoundingClientRect() {
      const element = this as HTMLElement;

      if (element.id === "portfolio-hud") {
        return {
          bottom: headerBottom,
          height: 80,
          left: 0,
          right: 400,
          top: headerBottom - 80,
          width: 400,
          x: 0,
          y: headerBottom - 80,
          toJSON: () => ({}),
        };
      }

      if (element.dataset.testid === "sky-host") {
        return {
          bottom: hostHeight,
          height: hostHeight,
          left: 0,
          right: hostWidth,
          top: 0,
          width: hostWidth,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        };
      }

      return {
        bottom: 100,
        height: 100,
        left: 0,
        right: 100,
        top: 0,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      };
    },
  });
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: vi.fn(() => canvasContextStub),
  });
  Object.defineProperty(window, "requestAnimationFrame", {
    configurable: true,
    value: vi.fn((callback: FrameRequestCallback) => {
      frameCallbacks.push(callback);
      return frameCallbacks.length;
    }),
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    configurable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window, "devicePixelRatio", {
    configurable: true,
    value: 3,
  });
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: class {
      disconnect = vi.fn();
      observe = vi.fn();
    },
  });
  Object.defineProperty(window, "ResizeObserver", {
    configurable: true,
    value: ResizeObserverMock,
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("PortfolioPage logic", () => {
  it("handles preview toggles and scroll-based HUD visibility fallback", () => {
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: undefined,
    });

    render(<PortfolioPage />);

    expect(screen.getByText("archive-closed")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "toggle archive" }));
    expect(screen.getByText("archive-open")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "open preview" }));
    expect(screen.getByText("preview alt")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "close preview" }));
    expect(screen.queryByText("preview alt")).not.toBeInTheDocument();

    headerBottom = -4;
    fireEvent.scroll(window);

    expect(
      screen.getByRole("button", { name: "BACK TO HUD" }),
    ).toBeInTheDocument();
  });

  it("opens the sky modal, animates the draw, and closes after settling", () => {
    render(<PortfolioPage />);

    act(() => {
      frameCallbacks.shift()?.(16.67);
    });

    expect(screen.getByText("meters-on")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    expect(screen.getByText("slot:0")).toBeInTheDocument();
    expect(createSkyLotteryBoardMock).toHaveBeenCalledWith(720, 480);
    expect(drawSkyLotterySceneMock).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "draw sky" }));

    expect(createSkyLotteryBallMock).toHaveBeenCalled();
    expect(screen.getByText("drawing")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "close sky" }));
    expect(screen.getByText("drawing")).toBeInTheDocument();

    act(() => {
      frameCallbacks.shift()?.(33.34);
    });

    expect(screen.getByText("slot:1")).toBeInTheDocument();
    expect(screen.getByText("idle")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "close sky" }));
    expect(screen.queryByText("slot:1")).not.toBeInTheDocument();
  });

  it("requeues the animation while the ball is still falling", () => {
    stepSkyLotteryBallMock
      .mockImplementationOnce((ball: { slotIndex: number }) => ({
        ...ball,
        settled: false,
        slotIndex: -1,
      }))
      .mockImplementationOnce((ball: { slotIndex: number }) => ({
        ...ball,
        settled: true,
        slotIndex: 0,
      }));

    render(<PortfolioPage />);
    act(() => {
      frameCallbacks.shift()?.(16.67);
    });
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));
    fireEvent.click(screen.getByRole("button", { name: "draw sky" }));

    const scheduledFramesBefore = vi.mocked(window.requestAnimationFrame).mock
      .calls.length;

    act(() => {
      frameCallbacks.shift()?.(16.67);
    });

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(
      scheduledFramesBefore + 1,
    );

    act(() => {
      frameCallbacks.shift()?.(33.34);
    });
  });

  it("stops the animation callback when the current ball is cleared", () => {
    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      value: undefined,
    });
    stepSkyLotteryBallMock.mockImplementationOnce(
      (ball: { slotIndex: number }) => ({
        ...ball,
        settled: false,
        slotIndex: -1,
      }),
    );

    render(<PortfolioPage />);
    act(() => {
      frameCallbacks.shift()?.(16.67);
    });
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));
    fireEvent.click(screen.getByRole("button", { name: "draw sky" }));

    hostWidth = 680;
    hostHeight = 420;
    fireEvent(window, new Event("resize"));

    act(() => {
      frameCallbacks.shift()?.(16.67);
    });

    expect(createSkyLotteryBoardMock).toHaveBeenCalledWith(680, 420);
  });

  it("uses the resize fallback when ResizeObserver is unavailable", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      value: undefined,
    });

    render(<PortfolioPage />);
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    hostWidth = 680;
    hostHeight = 420;
    fireEvent(window, new Event("resize"));

    expect(createSkyLotteryBoardMock).toHaveBeenCalledWith(680, 420);

    cleanup();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("ignores same-size updates from ResizeObserver", () => {
    render(<PortfolioPage />);
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    act(() => {
      resizeObserverCallback?.();
    });

    expect(screen.getByText("slot:0")).toBeInTheDocument();
  });

  it("returns early when header or canvas APIs are unavailable", () => {
    const getElementByIdSpy = vi
      .spyOn(document, "getElementById")
      .mockImplementation((id) =>
        id === "portfolio-hud" ? null : document.body,
      );

    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value: vi.fn(() => {
        throw new Error("boom");
      }),
    });

    render(<PortfolioPage />);
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    expect(getElementByIdSpy).toHaveBeenCalledWith("portfolio-hud");
    expect(drawSkyLotterySceneMock).not.toHaveBeenCalled();
  });

  it("skips drawing when the canvas context is null", () => {
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value: vi.fn(() => null),
    });

    render(<PortfolioPage />);
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    expect(drawSkyLotterySceneMock).not.toHaveBeenCalled();
  });

  it("returns early when the sky modal host is missing", () => {
    mockFlags.attachSkyHost = false;

    render(<PortfolioPage />);
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    expect(screen.getByText("slot:0")).toBeInTheDocument();
  });

  it("uses a base pixel ratio and falls back to the first sky slot", () => {
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 1,
    });
    stepSkyLotteryBallMock.mockImplementationOnce(
      (ball: { slotIndex: number }) => ({
        ...ball,
        settled: true,
        slotIndex: 99,
      }),
    );

    render(<PortfolioPage />);
    act(() => {
      frameCallbacks.shift()?.(16.67);
    });
    fireEvent.click(screen.getByRole("button", { name: "open sky modal" }));

    const canvas = screen.getByLabelText("sky-canvas") as HTMLCanvasElement;

    expect(canvas.width).toBe(720);

    fireEvent.click(screen.getByRole("button", { name: "draw sky" }));

    act(() => {
      frameCallbacks.shift()?.(16.67);
    });

    expect(screen.getByText("slot:0")).toBeInTheDocument();
  });
});
