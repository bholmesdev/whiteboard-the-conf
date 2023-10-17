import type { APIRoute } from "astro";
import { z } from "astro/zod";

const body = z.object({
  badgeImgUrl: z.string(),
});

export const PATCH: APIRoute = async (context) => {
  const session = await context.locals.auth.validate();
  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  let badgeImgUrl: string;

  try {
    const json = await context.request.json();
    const data = body.parse(json);
    badgeImgUrl = data.badgeImgUrl;
  } catch (e) {
    return new Response("`badgeImgUrl` missing or malformed in request.", {
      status: 400,
    });
  }

  const { user } = session;
  const query = context.locals.runtime.env.DB.prepare(
    `UPDATE user SET badge_img_url = ? WHERE id = ?`
  ).bind(badgeImgUrl, user.userId);
  await query.run();

  return new Response(null, {
    status: 200,
  });
};
