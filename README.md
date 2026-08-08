# Surjora

Digital Chinese accounts & services — verified WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao, 1688, JD, Baidu, Bilibili accounts, plus Chinese phone numbers, emails, QR-scan and verification services.

SEO-first marketing site. Fast, mobile-first, Vercel-ready.

## Status

**Phase 0 — Architecture & Foundation (in progress).** Core scaffolding is in place; the full roadmap (products, Knowledge Hub, admin, SEO system, conversion flows) is documented in the architecture plan and built phase by phase.

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
| `pnpm prisma:generate`       | Generate Prisma client            |
| `pnpm prisma:format`         | Format the Prisma schema          |
| `pnpm prisma:migrate:dev`    | Create/apply dev migrations       |
| `pnpm prisma:migrate:deploy` | Apply migrations (production)     |
| `pnpm prisma:studio`         | Open Prisma Studio                |

## Environment variables

See [.env.example](.env.example) — it documents every variable with usage notes. Never commit `.env`.

## Project structure

```
app/          # Next.js App Router routes (public pages, later admin + api)
components/   # UI, layout, seo, content, product, forms, admin components
lib/          # prisma client, auth, seo metadata, slug, revalidate, channels, analytics
prisma/       # Prisma schema + migrations
public/       # Static assets
schema/       # Zod schemas (validation, shared client/server)
types/        # Global type augmentations (next-auth session)
```

## Scope notes

- **No payments.** Orders capture custom requests / buy-intent only; payment integration is a later phase.
- **No marketplace.** 15–40 curated product/service landing pages, not a catalog.
- **SEO-first.** Dynamic metadata, JSON-LD, sitemaps and internal linking are core architecture, not bolt-ons.
