import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { astro } from "lucia/middleware";
import type { D1Database } from "@cloudflare/workers-types";
import { z } from "astro/zod";

export const userSchema = z.object({
  username: z.string(),
  badgeImgUrl: z.string().nullable(),
  picture: z.string().nullable(),
});

export const auth = (db: D1Database) =>
  lucia({
    adapter: d1(db, {
      user: "user",
      session: "user_session",
      key: "user_key",
    }),
    middleware: astro(),
    env: import.meta.env.DEV ? "DEV" : "PROD",
    getUserAttributes: (data): z.infer<typeof userSchema> => {
      return {
        username: data.username,
        picture: data.picture ?? null,
        badgeImgUrl: data.badge_img_url ?? null,
      };
    },
  });

export type Auth = ReturnType<typeof auth>;
