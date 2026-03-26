import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("PastProjectsSection fallback states", () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
  });

  it("hides the archive toggle for short lists and supports projects without images", async () => {
    vi.doMock("../../../../model/portfolioData", () => ({
      pastProjects: [
        {
          ctaLabel: "VIEW WORK",
          description: "cat summoner",
          eyebrow: "AI PHOTO FRAME",
          href: "https://example.com/cat",
          subtitle: "No image project",
          title: "宇宙猫召喚装置",
        },
        {
          ctaLabel: "VIEW WORK",
          description: "project two",
          eyebrow: "ARCHIVE",
          href: "https://example.com/2",
          subtitle: "two",
          title: "Project Two",
        },
        {
          ctaLabel: "VIEW WORK",
          description: "project three",
          eyebrow: "ARCHIVE",
          href: "https://example.com/3",
          subtitle: "three",
          title: "Project Three",
        },
        {
          ctaLabel: "VIEW WORK",
          description: "project four",
          eyebrow: "ARCHIVE",
          href: "https://example.com/4",
          subtitle: "four",
          title: "Project Four",
        },
      ],
    }));

    const { PastProjectsSection } = await import("..");
    render(
      <PastProjectsSection
        onPreviewImage={vi.fn()}
        onToggleShowAll={vi.fn()}
        showAll={false}
      />,
    );

    expect(
      screen.queryByRole("button", { name: "SCROLL TO CONTINUE" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "宇宙猫召喚装置" }),
    ).not.toBeInTheDocument();
  });
});
