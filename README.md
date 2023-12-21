# Whiteboard the Conf 📢

The greatest gathering of web devs and whiteboardists on earth.

> This is a totally real conference, I swear
> ~ @bholmesdev

## 🚀 Project Structure

This project uses the ASC stack: Astro, Svelte, and Cloudflare workers. It's bASiCally the perfect pick for a viral event site.

The essential files are highlighted below:

```bash
/
├── public/
│   └── favicon.svg
├── src/
│   ├── lib/
│   │   ├── lucia.ts # configure Clerk as oauth provider
│   │   └── schema.sql # scaffold SQLite tables
│   ├── pages/
│   │   ├── invite/[username].astro # show dynamic invite link
│   │   ├── login/clerk # handle sign-in redirects
│   │   └── user.ts # handle table updates
└── wrangler.toml # configure SQLite with Cloudflare D1
```

You may have noticed we own the user tables. That's because we're treating Clerk like an external auth provider, and storing user info whenever logins are redirected successfully.

It's a mess, I know. But it let us pull off server-side auth without hacking core Clerk SDKs 🙃

## ⚙️ Run locally

You can run this project locally with the following steps:

1. Create a Clerk account and retrieve the credentials outlined in the `.env.example`
2. Run `d1:setup` to scaffold a local Cloudflare database.
3. Run `dev` to start the dev server.
