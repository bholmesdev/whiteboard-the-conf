import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { astro } from "lucia/middleware";
import type { D1Database } from "@cloudflare/workers-types";

export const auth = (db: D1Database) =>
  lucia({
    adapter: d1(db, {
      user: "user",
      session: "user_session",
      key: "user_key",
    }),
    middleware: astro(),
    env: import.meta.env.DEV ? "DEV" : "PROD",
    getUserAttributes: (data) => {
      return {
        username: data.username,
      };
    },
  });

export type Auth = typeof auth;
