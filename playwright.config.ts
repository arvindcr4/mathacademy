import { defineConfig } from "@playwright/test";

const electronDevBaseUrl =
  process.env.ELECTRON_DEV_BASE_URL ?? "http://127.0.0.1:3100";
const { hostname: electronDevHost, port: electronDevPort } = new URL(
  electronDevBaseUrl,
);

export default defineConfig({
  testDir: "./tests/electron",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["dot"], ["html", { open: "never", outputFolder: "output/playwright/report" }]]
    : [["list"]],
  outputDir: "output/playwright/test-results",
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `ELECTRON_BUILD=true pnpm exec next dev --hostname ${electronDevHost} --port ${electronDevPort}`,
    url: electronDevBaseUrl,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
