/// <reference types="astro/client" />
/// <reference types="lucia" />

declare namespace App {
  interface Locals {
    auth: import("lucia").AuthRequest;
  }
}

declare namespace Lucia {
  type Auth = import("./lib/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
    picture?: string;
    badge_img_url?: string;
  };
  type DatabaseSessionAttributes = {};
}

type ENV = {
  SERVER_URL: string;
  DB: import("@cloudflare/workers-types").D1Database;
};

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}
