import { expect, test } from "@playwright/test";

test.describe("public portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("trollTowerBattleBest", "1200");
    });
    await page.goto("/");
  });

  test("renders the main HUD and first-view content", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Shota Kazuno" }),
    ).toBeVisible();
    await expect(page.getByText("COMMAND HUD")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "メインナビゲーション" }),
    ).toBeVisible();
    await expect(page.getByText("BUILD TIME")).toBeVisible();
    await expect(page.getByText("EXP / CAREER")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "CHANGE SKY" }),
    ).toBeVisible();
  });

  test("opens and closes the sky lottery modal", async ({ page }) => {
    await page.getByRole("button", { name: "CHANGE SKY" }).click();

    await expect(
      page.getByRole("dialog", { name: "Sky color lottery" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "DROP BALL" })).toBeVisible();

    await page
      .getByRole("button", { exact: true, name: "sky 抽選モーダルを閉じる" })
      .click();

    await expect(
      page.getByRole("dialog", { name: "Sky color lottery" }),
    ).toBeHidden();
  });

  test("reveals archived works and reads the troll best score", async ({
    page,
  }) => {
    const pastWorks = page.locator("#game-project");

    await expect(pastWorks.getByText("トロールタワーバトル")).toBeVisible();
    await expect(pastWorks.getByText("BEST 1200")).toBeVisible();
    await expect(pastWorks.getByText("LEDコースター")).toHaveCount(0);

    await pastWorks
      .getByRole("button", { name: /SCROLL TO CONTINUE/i })
      .click();

    await expect(pastWorks.getByText("LEDコースター")).toBeVisible();
    await expect(
      pastWorks.getByRole("button", { name: /CLOSE ARCHIVE/i }),
    ).toBeVisible();
  });
});
