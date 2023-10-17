import type { MiddlewareResponseHandler } from "astro";
import { auth } from "./lib/lucia";

let hasSetUpDev = false;

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  if (import.meta.env.DEV && !hasSetUpDev) {
    const { setupDevSchema } = await import("./lib/dev-schema");
    await setupDevSchema(context);
    hasSetUpDev = true;
  }

  context.locals.auth = auth(context.locals.runtime.env.DB).handleRequest(
    context
  );
  return await next();
};
