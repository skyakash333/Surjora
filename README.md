# Wechatscan

Manually reviewed Chinese platform account and assistance requests covering WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao, 1688, JD, Baidu, Bilibili, Chinese phone numbers, email, QR confirmation and verification guidance.

SEO-first marketing site. Fast, mobile-first, Vercel-ready.

## Status

**Phases 0–8 complete (all roadmap phases implemented).** The site includes products, services, Knowledge Hub, admin (articles, catalog, orders, settings), an SEO system (metadata, JSON-LD, sitemap), conversion flows (contact, quote, Telegram/WhatsApp), media uploads, and view tracking. See the architecture plan for the full roadmap.

## Stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 14 (App Router)                     |
| Language   | TypeScript (strict)                         |
| Styling    | Tailwind CSS 3 + shadcn/ui-ready primitives |
| Database   | PostgreSQL (Prisma ORM)                     |
| Auth       | NextAuth v4 (credentials, single admin)     |
| Validation | Zod                                         |
| Forms      | React Hook Form + @hookform/resolvers       |
| Email      | Resend (contact form)                       |
| Media      | Cloudinary (with external-URL fallback)     |
| Tests      | Vitest                                      |
| Deployment | Vercel                                      |

## Requirements

- Node.js >= 20
- pnpm >= 9 (project pinned to `pnpm@9.15.9`)

## Getting started

```bash
pnpm install

# 1. Configure environment
cp .env.example .env
#    fill in DATABASE_URL and the other required values

# 2. Generate the Prisma client (types used by lib/prisma.ts)
pnpm prisma:generate

# 3. Create the database schema (once, when DB is available)
pnpm prisma:migrate:dev

# 4. Run the dev server
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command                      | Purpose                           |
| ---------------------------- | --------------------------------- |
| `pnpm dev`                   | Development server                |
| `pnpm build`                 | Production build                  |
| `pnpm start`                 | Run production build              |
| `pnpm lint`                  | ESLint                            |
| `pnpm format`                | Prettier (write)                  |
| `pnpm format:check`          | Prettier (check)                  |
| `pnpm typecheck`             | TypeScript check (`tsc --noEmit`) |
| `pnpm test`                  | Run Vitest smoke/unit tests       |
| `pnpm prisma:generate`       | Generate Prisma client            |
| `pnpm prisma:format`         | Format the Prisma schema          |
| `pnpm prisma:migrate:dev`    | Create/apply dev migrations       |
| `pnpm prisma:migrate:deploy` | Apply migrations (production)     |
| `pnpm prisma:studio`         | Open Prisma Studio                |

## Environment variables

See [.env.example](.env.example) — it documents every variable with usage notes. Never commit `.env`.

For Neon on Vercel, set `DATABASE_URL` to Neon's pooled connection string. Public CMS routes read
at request time, which keeps builds independent of database availability and publishes admin changes
without requiring a redeploy.

## Project structure

```
app/          # Next.js App Router routes (public pages + admin + api)
components/   # UI, layout, seo, content, product, forms, admin components
lib/          # prisma client, auth, seo metadata, slug, channels, media
prisma/       # Prisma schema + migrations
public/       # Static assets (og.svg, etc.)
schema/       # Zod schemas (validation, shared client/server)
tests/        # Vitest smoke/unit tests
types/        # Global type augmentations (next-auth session)
```

## Scope notes

- **Manual quote workflow.** Website requests are reviewed before price, payment method and delivery timing are confirmed. There is no instant checkout.
- **No marketplace.** 15–40 curated product/service landing pages, not a catalog.
- **SEO-first.** Dynamic metadata, JSON-LD, sitemaps and internal linking are core architecture, not bolt-ons.
