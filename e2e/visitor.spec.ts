import { test, expect } from "@playwright/test";

// Rolle: utlogget besøkende.
// Denne testen oppretter ingen data, så ingen opprydding er nødvendig. Når tester begynner
// å lage data (f.eks. innlogget forelder i Fase 3), MÅ de rydde opp etter seg, se dev-pipeline.
test.describe("Utlogget besøkende", () => {
  test("ser landingssiden og navigerer til en ferdighet", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("som føles som lek")).toBeVisible();
    await expect(page.getByRole("link", { name: /Ballkontroll/ })).toBeVisible();

    await page.getByRole("link", { name: /Ballkontroll/ }).click();

    await expect(page).toHaveURL(/ferdighet=ballkontroll/);
    await expect(page.getByRole("heading", { name: "Ballkontroll" })).toBeVisible();
  });

  test("åpner en øvelse, fokus fanges i dialogen, og lukker med Escape", async ({ page }) => {
    await page.goto("/ovelser?ferdighet=ballkontroll");

    await page.getByRole("button", { name: "Sprett og fang" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Sprett og fang" })).toBeVisible();

    // Fokusfelle: Tab flere ganger, fokus skal bli inne i dialogen
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    const focusInside = await dialog.evaluate((el) => el.contains(document.activeElement));
    expect(focusInside).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
