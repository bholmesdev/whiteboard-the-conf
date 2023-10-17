import type { APIContext } from "astro";
import schemaSql from "./schema.sql?raw";

/** Miniflare does not support `wrangler d1 execute` when running cloudflare locally.
 * Call this utility to stand up database schema in dev middleware.
 */
export async function setupDevSchema({ locals }: APIContext) {
  const DB = locals.runtime.env.DB;
  await DB.batch(schemaSql.split(";").map((s) => DB.prepare(s)));
}
