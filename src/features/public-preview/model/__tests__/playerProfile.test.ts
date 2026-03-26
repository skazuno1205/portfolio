import { describe, expect, it } from "vitest";

import {
  getBirthdayProgress,
  getCurrentAge,
  getPortfolioMeters,
} from "../playerProfile";

describe("playerProfile", () => {
  it("calculates age from the December birthday cycle", () => {
    expect(getCurrentAge(new Date(2026, 10, 30))).toBe(32);
    expect(getCurrentAge(new Date(2026, 11, 5))).toBe(33);
  });

  it("tracks exp progress between December birthdays", () => {
    expect(getBirthdayProgress(new Date(2026, 11, 5)).progressPercent).toBe(0);
    expect(getBirthdayProgress(new Date(2026, 5, 1)).progressPercent).toBe(49);
  });

  it("builds the hero meters with the updated labels", () => {
    const meters = getPortfolioMeters(new Date(2026, 5, 1));

    expect(meters).toHaveLength(2);
    expect(meters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "BUILD TIME", valueLabel: "10H" }),
        expect.objectContaining({
          label: "EXP / CAREER",
          levelLabel: "LV.32",
          nextLevelLabel: "NEXT LEVEL IN 187 EXP",
          progressLabel: "EXP 178 / 365",
          valueLabel: "UNTIL DEC",
          width: 49,
        }),
      ]),
    );
  });
});
