# Rasana Web

Next.js frontend and Payload CMS backend for Rasana International Trading.

## Local CMS setup

1. Start PostgreSQL with `docker compose up -d postgres`.
2. Copy `.env.example` to `.env`.
3. Replace `PAYLOAD_SECRET` with a long random value.
4. Start the app with `npm run dev`.
5. Run the separately hosted CMS admin service to create the first administrator.

The public frontend works with fallback product, brand, catalogue, and news content when `NEXT_PUBLIC_CMS_URL` is not configured. To read content from a separately hosted CMS, set:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

## Available API examples

- `/api/products`
- `/api/brands`
- `/api/catalogues`
- `/api/news`
- `/api/pages`

## Useful commands

```bash
npm run dev
npm run lint
npx tsc --noEmit
```

## Production checklist

- Set a production `DATABASE_URI` and `PAYLOAD_SECRET`.
- Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- Configure media storage and transactional email.
- Create the first admin user in the separately hosted CMS.
- Run lint, TypeScript checks, and a production build before deployment.
- Keep `/admin` protected by Payload authentication and excluded from indexing.

## Deployment handoff

The public Next.js app can be deployed to Vercel or another Node-compatible host. The Payload API/CMS service should use the same `payload.config.ts`, a managed PostgreSQL instance, and persistent media storage. Set `NEXT_PUBLIC_CMS_URL` on the public app to the CMS service URL.

Required production values:

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_CMS_URL`
- `NEXT_PUBLIC_SITE_URL`
- `CONTACT_EMAIL`

Before launch, verify that `/api/products`, `/api/brands`, `/api/catalogues`, and `/api/news` return CMS data rather than fallback content.
