import { defineConfig, devices } from "@playwright/test";
import { readFileSync } from "node:fs";

// Last .env.local inn i testprosessen (Playwright gjør det ikke selv).
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* ingen .env.local */
}

// Bruker Playwright sin egen Chromium (npx playwright install chromium). På nett med
// TLS-inspeksjon som blokkerer nedlastingen: sett PW_CHANNEL=msedge for å bruke Edge.
const channel = process.env.PW_CHANNEL;
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel } },
    { name: "mobile", use: { ...devices["Pixel 5"], channel } },
  ],
});
