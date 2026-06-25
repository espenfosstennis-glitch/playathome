import { test, expect } from "@playwright/test";
import {
  authedClient,
  createParent,
  deleteParent,
  login,
  uniqueCreds,
  assertNotProduction,
} from "./helpers";

// Fase 4: marker øvelse som gjort -> baller lagres per barn, repetisjon teller,
// og fremgang er RLS-isolert mellom foreldre. Testbrukere ryddes (cascade) etterpå.

test.describe.configure({ mode: "serial" });

const A = uniqueCreds("prog_a");
const B = uniqueCreds("prog_b");
const childName = `Progbarn_${Date.now()}`;
let aId = "";
let bId = "";

test.beforeAll(async () => {
  assertNotProduction();
  aId = await createParent(A);
  bId = await createParent(B);
});

test.afterAll(async () => {
  await deleteParent(aId);
  await deleteParent(bId);
});

test("markering lagrer baller, repetisjon teller, og fremgang er RLS-isolert", async ({ page }) => {
  test.setTimeout(180_000); // next dev kompilerer ruter on-demand ved første treff
  // Forelder A logger inn og oppretter et barn
  await login(page, A);
  await page.getByLabel("Navn").fill(childName);
  await page.getByRole("button", { name: "Legg til barn" }).click();
  await expect(page.getByRole("heading", { name: childName })).toBeVisible();

  await page.goto("/ovelser");
  // Velg aktivt barn (idempotent: første barn er aktivt som standard)
  await page.getByRole("button", { name: childName }).click();

  // Åpne første øvelseskort og marker som gjort
  const firstCard = page.locator(".card .card-trigger").first();
  await expect(firstCard).toBeVisible();
  const title = ((await firstCard.textContent()) ?? "").trim();
  await firstCard.click();
  await page.getByRole("button", { name: /Marker som gjort/ }).click();

  // Én ball, én unik øvelse
  await expect(page.getByText("🎾 1 baller").first()).toBeVisible();
  await expect(page.getByText("1 av 100 øvelser fullført")).toBeVisible();

  // Overlever refresh (ekte persistens, ikke bare lokal state)
  await page.reload();
  await expect(page.getByText("🎾 1 baller").first()).toBeVisible();

  // Repetisjon teller: samme øvelse igjen -> 2 baller, men fortsatt 1 unik
  await page.getByRole("button", { name: title, exact: true }).click();
  await page.getByRole("button", { name: /Gjort igjen|Marker som gjort/ }).click();
  await expect(page.getByText("🎾 2 baller").first()).toBeVisible();
  await expect(page.getByText("1 av 100 øvelser fullført")).toBeVisible();

  // DB: A har 2 fremgangsrader; B (annen forelder) ser ingen av dem (RLS-isolasjon)
  const aClient = await authedClient(A);
  const { data: aRows } = await aClient.from("progress").select("id");
  expect(aRows?.length, "A skal ha 2 fremgangsrader").toBe(2);

  const bClient = await authedClient(B);
  const { data: bRows } = await bClient.from("progress").select("id");
  expect(bRows?.length ?? 0, "B skal ikke se A sin fremgang").toBe(0);
});