import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { PortfolioPage } from "../PortfolioPage";

vi.mock("../../hooks/useTypewriterMessage", () => ({
  useTypewriterMessage: () => "SYSTEM > Test message.",
}));

const canvasContextStub = {
  arc: vi.fn(),
  beginPath: vi.fn(),
  clearRect: vi.fn(),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  fill: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
  setTransform: vi.fn(),
  stroke: vi.fn(),
  strokeRect: vi.fn(),
};

let intersectionObserverCallback:
  | ((entries: IntersectionObserverEntry[]) => void)
  | undefined;

class IntersectionObserverMock {
  constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
    intersectionObserverCallback = callback;
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
}

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: vi.fn(() => canvasContextStub),
  });
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: IntersectionObserverMock,
  });
  window.requestAnimationFrame = vi.fn(() => 1);
  window.cancelAnimationFrame = vi.fn();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("PortfolioPage", () => {
  it("renders the main portfolio sections", () => {
    window.localStorage.removeItem("trollTowerBattleBest");
    render(<PortfolioPage />);

    expect(
      screen.getByRole("heading", { name: "Shota Kazuno" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Career Stages" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Main Quests" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Open Development Boards")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Detailed Stack" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "宇宙猫召喚装置" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "メモリアルタイムスリップ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "トロールタワーバトル" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "VIEW WORK" })).toHaveAttribute(
      "href",
      "https://qiita.com/kyazoooo/items/3fa5e929ebf3d2c6e028",
    );
    expect(screen.getAllByRole("link", { name: "X" })[0]).toHaveAttribute(
      "href",
      "https://x.com/kyazoooo",
    );
    expect(
      screen.getByRole("button", { name: "SCROLL TO CONTINUE" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Hobby Log" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "3D CAD Gallery" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Trophy Room" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /BACK TO HUD/ }),
    ).not.toBeInTheDocument();
  });

  it("shows side route details in the shared stage card", () => {
    window.localStorage.removeItem("trollTowerBattleBest");
    render(<PortfolioPage />);

    fireEvent.click(
      screen.getAllByRole("button", { name: "NOW の Side Route を表示" })[0],
    );

    expect(
      screen.getByRole("heading", { name: "kutsulab CTO" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "kutsulab合同会社のCTOとして、ShopifyベースのEC / サービスサイト改善や足測定ツール開発を担当。",
      ),
    ).toBeInTheDocument();
  });

  it("opens the sky lottery modal", () => {
    window.localStorage.removeItem("trollTowerBattleBest");
    render(<PortfolioPage />);

    fireEvent.click(screen.getAllByRole("button", { name: "CHANGE SKY" })[0]);

    expect(
      screen.getByRole("dialog", { name: "Sky color lottery" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("sky color physics board"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "DROP BALL" }),
    ).toBeInTheDocument();
  });

  it("shows the back to hud command after the header leaves the viewport", () => {
    window.localStorage.removeItem("trollTowerBattleBest");
    render(<PortfolioPage />);

    act(() => {
      intersectionObserverCallback?.([
        {
          isIntersecting: false,
        } as IntersectionObserverEntry,
      ]);
    });

    expect(
      screen.getByRole("button", { name: /BACK TO HUD/ }),
    ).toBeInTheDocument();
  });

  it("shows the troll tower battle best score from localStorage", () => {
    window.localStorage.setItem("trollTowerBattleBest", "1200");

    render(<PortfolioPage />);

    expect(screen.getByText("BEST 1200")).toBeInTheDocument();
  });

  it("summons a space cat across the viewport from the project title", () => {
    window.localStorage.removeItem("trollTowerBattleBest");
    render(<PortfolioPage />);

    fireEvent.click(
      screen.getAllByRole("button", { name: "宇宙猫召喚装置" })[0],
    );

    const summonedCats = document.querySelectorAll(
      'img[src^="/images/cat/cat_"]',
    );

    expect(summonedCats.length).toBeGreaterThan(0);
  });

  it("drops a troll into the troll tower battle card when the title is clicked", () => {
    window.localStorage.removeItem("trollTowerBattleBest");
    render(<PortfolioPage />);

    const trollArena = screen.getAllByTestId("troll-stack-arena")[0];

    expect(trollArena.querySelectorAll("img")).toHaveLength(0);

    fireEvent.click(
      screen.getAllByRole("button", { name: "トロールタワーバトル" })[0],
    );

    expect(trollArena.querySelectorAll("img").length).toBeGreaterThan(0);
  });
});
