import { expect, test } from "@playwright/test";
import {
  admin,
  assertNotProduction,
  authedClient,
  createParent,
  deleteParent,
  uniqueCreds,
} from "./helpers";
import { CURRENT_TERMS_VERSION } from "../lib/terms";

test.describe.configure({ mode: "serial" });

const parent = uniqueCreds("terms");
const otherParent = uniqueCreds("terms_other");
let parentId = "";
let otherParentId = "";

test.beforeAll(async () => {
  assertNotProduction();
  parentId = await createParent(parent);
  otherParentId = await createParent(otherParent);
});

test.afterAll(async () => {
  await deleteParent(parentId);
  await deleteParent(otherParentId);
});

test("requires current terms before parent app access", async ({ page }) => {
  await page.goto("/logg-inn");
  await page.getByLabel("E-post").fill(parent.email);
  await page.getByLabel("Passord").fill(parent.password);
  await page.getByRole("button", { name: "Logg inn" }).click();
  await page.waitForURL("**/vilkar**");

  await page.goto("/barn");
  await expect(page).toHaveURL(/\/vilkar\?next=/);

  await page.getByLabel("Jeg har lest og godtar vilkårene for bruk.").check();
  await page.getByRole("button", { name: "Godta og fortsett" }).click();
  await expect(page).toHaveURL(/\/barn$/);
  await expect(page.getByRole("heading", { name: "Mine barn" })).toBeVisible();

  const { data, error } = await admin
    .from("terms_acceptances")
    .select("user_id,terms_version")
    .eq("user_id", parentId);
  expect(error, "acceptance should be readable by the test administrator").toBeNull();
  expect(data).toEqual([{ user_id: parentId, terms_version: CURRENT_TERMS_VERSION }]);
});

test("blocks another parent until they accept and keeps records private", async ({ page }) => {
  await page.goto("/logg-inn");
  await page.getByLabel("E-post").fill(otherParent.email);
  await page.getByLabel("Passord").fill(otherParent.password);
  await page.getByRole("button", { name: "Logg inn" }).click();
  await page.waitForURL("**/vilkar**");

  await page.goto("/barn");
  await expect(page).toHaveURL(/\/vilkar\?next=/);

  const otherClient = await authedClient(otherParent);
  const { data, error } = await otherClient
    .from("terms_acceptances")
    .select("user_id")
    .eq("user_id", parentId);
  expect(error, "other parent query should be permitted by RLS").toBeNull();
  expect(data).toEqual([]);
});

test("requires login before opening parent app routes", async ({ page }) => {
  await page.goto("/barn");
  await expect(page).toHaveURL(/\/logg-inn$/);
});
