// Kjører en migrasjonsfil mot Supabase-databasen og verifiserer resultatet live
// (function-verifier: tabeller, kolonner, RLS, policyer finnes faktisk).
//   node --env-file=.env.local scripts/migrate.mjs <fil>
import { readFileSync } from "node:fs";
import pkg from "pg";
const { Client } = pkg;

const password = process.env.SUPABASE_DB_PASSWORD;
if (!password) {
  console.error("Mangler SUPABASE_DB_PASSWORD i .env.local");
  process.exit(1);
}

const file = process.argv[2] || "supabase/migrations/0001_init_auth_children_progress.sql";
const sql = readFileSync(file, "utf8");

const client = new Client({
  host: "aws-0-eu-west-1.pooler.supabase.com",
  port: 5432,
  user: "postgres.xtrkqkullucgrlpdzsmc",
  password,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

await client.connect();
console.log("Tilkoblet databasen.\n");
try {
  await client.query(sql);
  console.log(`Migrasjon kjørt: ${file}\n`);

  const tables = (
    await client.query(
      `select table_name from information_schema.tables where table_schema='public' order by table_name`,
    )
  ).rows.map((r) => r.table_name);
  console.log("Tabeller i public:", tables.join(", "));

  const rls = (
    await client.query(
      `select relname, relrowsecurity as rls from pg_class
       where relnamespace='public'::regnamespace and relkind='r'
       and relname in ('profiles','children','progress','unlocks') order by relname`,
    )
  ).rows;
  console.log("RLS:", rls.map((r) => `${r.relname}=${r.rls}`).join(", "));

  const pol = (
    await client.query(
      `select tablename, cmd, policyname from pg_policies where schemaname='public'
       order by tablename, cmd, policyname`,
    )
  ).rows;
  console.log(`\nPolicyer (${pol.length}):`);
  for (const p of pol) console.log(`  ${p.tablename}  ${p.cmd}  ${p.policyname}`);

  const cols = (
    await client.query(
      `select column_name from information_schema.columns
       where table_schema='public' and table_name='children' order by ordinal_position`,
    )
  ).rows.map((r) => r.column_name);
  console.log("\nchildren-kolonner:", cols.join(", "));
} finally {
  await client.end();
}
