# NELBELL Frontend

Next.js (App Router) frontend for the NELBELL / Nelson O. Bello site, talking to the
separate `nelbell-backend` (Node + Hono + Prisma) API.

## Setup

```bash
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL to the backend URL
npm run dev
```

## Backend wiring notes

- Set the backend's `PAYSTACK_CALLBACK_URL` env var to `${FRONTEND_URL}/orders/redirect`.
  That page reads the `reference` query param Paystack appends and forwards to
  `/orders/:id` (the backend reuses the order id as the Paystack reference).
- `NEXT_PUBLIC_API_URL` should point at the backend's base URL (e.g. `http://localhost:4000`
  in dev, or the deployed API origin in production). CORS on the backend must allow this
  frontend's origin via its own `FRONTEND_URL` env var.

## Structure

- `src/app` — routes (App Router), one folder per page from the agreement
- `src/components` — `layout`, `ui`, `books`, `cbt`, `forms`, `cart`
- `src/hooks` — TanStack Query hooks (GET) and mutation hooks (POST/PATCH via `apiClient`)
- `src/lib` — `apiClient` (Axios instance), query keys, formatters
- `src/store` — Zustand cart store (persisted to localStorage)
- `src/types` — one `*Types.d.ts` file per domain (bookTypes, orderTypes, cbtTypes,
  inquiryTypes, settingsTypes, cartTypes, apiResponseTypes)

## Pages

Home · About Nelson · Books/Bookstore · Publishing Services · Tutorial Centre ·
CBT Practice · Coaching & Consulting · Kingdom Influence (static) · Connect/Contact
