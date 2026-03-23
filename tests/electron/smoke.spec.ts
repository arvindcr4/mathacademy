import {
  _electron as electron,
  expect,
  test,
  type ElectronApplication,
  type Page,
} from "@playwright/test";

const electronDevBaseUrl =
  process.env.ELECTRON_DEV_BASE_URL ?? "http://127.0.0.1:3100";
const homeUrl = new URL("/", electronDevBaseUrl).toString();
const dashboardUrl = new URL("/dashboard", electronDevBaseUrl).toString();

async function findAppWindow(app: ElectronApplication): Promise<Page> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const page = app.windows().find((candidate) => {
      const candidateUrl = candidate.url();

      return (
        !candidateUrl.startsWith("data:text/html") &&
        !candidateUrl.startsWith("devtools://")
      );
    });

    if (page) {
      await page.waitForLoadState("domcontentloaded");
      return page;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Could not find the Electron app window.");
}

test.describe("Electron UI", () => {
  let app: ElectronApplication | undefined;

  test.afterEach(async () => {
    if (app) {
      await app.close();
      app = undefined;
    }
  });

test("loads the home page and navigates to the dashboard", async ({}, testInfo) => {
    app = await electron.launch({
      executablePath: require("electron") as string,
      args: ["."],
      cwd: process.cwd(),
      env: {
        ...process.env,
        ELECTRON_DEV: "true",
        ELECTRON_DEV_BASE_URL: electronDevBaseUrl,
        ELECTRON_DISABLE_DEVTOOLS: "true",
      },
    });

    const page = await findAppWindow(app);

    await expect(page).toHaveURL(homeUrl);
    await expect(page.locator("body")).not.toContainText("This page could not be found");
    await expect(page.locator("header")).toContainText("LearnNova");
    await expect(
      page.getByRole("heading", { name: /Master Skills/i }),
    ).toBeVisible();
    const startLearningLink = page
      .locator("header")
      .getByRole("link", { name: "Start Learning", exact: true });
    await expect(startLearningLink).toBeVisible();

    const homeScreenshot = testInfo.outputPath("electron-home.png");
    await page.screenshot({ path: homeScreenshot, fullPage: true });
    await testInfo.attach("electron-home", {
      path: homeScreenshot,
      contentType: "image/png",
    });

    const isElectron = await page.evaluate(() => {
      const appWindow = window as Window & {
        electronAPI?: { isElectron?: boolean };
      };
      return appWindow.electronAPI?.isElectron ?? false;
    });

    expect(isElectron).toBe(true);

    await startLearningLink.click();

    await expect(page).toHaveURL(dashboardUrl);
    await expect(
      page.getByRole("heading", { name: "Welcome back!" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Leaderboard" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Courses" })).toBeVisible();

    const dashboardScreenshot = testInfo.outputPath("electron-dashboard.png");
    await page.screenshot({ path: dashboardScreenshot, fullPage: true });
    await testInfo.attach("electron-dashboard", {
      path: dashboardScreenshot,
      contentType: "image/png",
    });
  });
});
