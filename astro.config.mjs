import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import alpinejs from "@astrojs/alpinejs";
import simpleScope from "vite-plugin-simple-scope";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    // use miniflare in dev
    runtime: {
      mode: "local",
    },
  }),
  integrations: [alpinejs()],
  vite: {
    plugins: [simpleScope()],
  },
});
