import { test, expect } from "@playwright/test";

// Rolle: utlogget besøkende.
// Denne testen oppretter ingen data, så ingen opprydding er nødvendig. Når tester begynner
// å lage data (f.eks. innlogget forelder i Fase 3), MÅ de rydde opp etter seg, se dev-pipeline.
test.describe("Utlogget besøkende", () => {
  test("ser landingssiden og navigerer til en ferdighet", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("som føles som lek")).toBeVisible();
    await expect(page.getByRole("link", { name: /Lek hjemme/ })).toBeVisible();

    await page.getByRole("link", { name: /Lek hjemme/ }).click();

    await expect(page).toHaveURL(/ferdighet=hjemmetrening/);
    await expect(page.locator(".card").first()).toBeVisible();
  });

  test("åpner en øvelse, fokus fanges i dialogen, og lukker med Escape", async ({ page }) => {
    await page.goto("/ovelser?ferdighet=hjemmetrening");

    // Første kort, uansett innhold i Sanity
    const firstCard = page.locator(".card .card-trigger").first();
    const title = ((await firstCard.textContent()) ?? "").trim();
    await firstCard.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: title })).toBeVisible();

    // Fokusfelle: Tab flere ganger, fokus skal bli inne i dialogen
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    const focusInside = await dialog.evaluate((el) => el.contains(document.activeElement));
    expect(focusInside).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
