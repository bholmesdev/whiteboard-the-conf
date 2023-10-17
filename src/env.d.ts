/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    auth: import("lucia").AuthRequest;
  }
}

/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lib/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
    userId: string;
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
