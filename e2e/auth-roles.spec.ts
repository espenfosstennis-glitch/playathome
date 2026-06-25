import { test, expect, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

// Rollebasert isolasjonstest: forelder A skal ikke kunne se forelder B sine barn.
// Testbrukere opprettes via service_role (bekreftet) og slettes etterpå (cascade sletter barn),
// så testdata reverseres alltid, slik dev-pipeline krever.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const stamp = Date.now();
const A = { email: `pwtest_${stamp}_a@example.com`, password: "Passord12345" };
const B = { email: `pwtest_${stamp}_b@example.com`, password: "Passord12345" };
const childName = `TestbarnA_${stamp}`;
let aId = "";
let bId = "";

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  const a = await admin.auth.admin.createUser({
    email: A.email,
    password: A.password,
    email_confirm: true,
  });
  const b = await admin.auth.admin.createUser({
    email: B.email,
    password: B.password,
    email_confirm: true,
  });
  aId = a.data.user?.id ?? "";
  bId = b.data.user?.id ?? "";
  expect(aId, "kunne ikke opprette testbruker A").not.toBe("");
  expect(bId, "kunne ikke opprette testbruker B").not.toBe("");
});

test.afterAll(async () => {
  // Rydd opp uansett utfall.
  if (aId) await admin.auth.admin.deleteUser(aId);
  if (bId) await admin.auth.admin.deleteUser(bId);
});

async function login(page: Page, creds: { email: string; password: string }) {
  await page.goto("/logg-inn");
  await page.getByLabel("E-post").fill(creds.email);
  await page.getByLabel("Passord").fill(creds.password);
  await page.getByRole("button", { name: "Logg inn" }).click();
  await page.waitForURL("**/barn");
}

test("forelder A oppretter barn, forelder B ser det ikke", async ({ page }) => {
  // A logger inn og oppretter et barn
  await login(page, A);
  await page.getByLabel("Navn").fill(childName);
  await page.getByRole("button", { name: "Legg til barn" }).click();
  await expect(page.getByRole("heading", { name: childName })).toBeVisible();

  // A logger ut
  await page.getByRole("button", { name: "Logg ut" }).click();
  await page.waitForURL((u) => !u.pathname.startsWith("/barn"));

  // B logger inn og skal IKKE se A sitt barn (RLS-isolasjon)
  await login(page, B);
  await expect(page.getByRole("heading", { name: childName })).toHaveCount(0);
});
