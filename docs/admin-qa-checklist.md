# Rasana Admin Panel — QA and Release Checklist

## Route coverage

- [x] `/admin` dashboard
- [x] `/admin/product-categories`, `/new`, and `/[id]`
- [x] `/admin/products`, `/new`, and `/[id]`
- [x] `/admin/partners`, `/new`, and `/[id]`
- [x] `/admin/media` and `/[id]`
- [x] `/admin/home`
- [x] `/admin/contact`
- [x] `/admin/news`, `/new`, and `/[id]`
- [x] `/admin/account`
- [x] `/login`

## Authentication checks

- [ ] Every `/admin/*` route redirects signed-out visitors to `/login`.
- [ ] Invalid credentials do not create a session.
- [ ] Valid administrator sessions can access every admin route.
- [ ] Logout clears the local or Payload session and returns to `/login`.
- [ ] Expired or invalid tokens cannot access admin data.
- [ ] Development fallback credentials are disabled in production.

## CRUD checks

- [ ] Create, edit, publish, draft, and reorder categories.
- [ ] Create, edit, publish, draft, and preview products.
- [ ] Product category relationships persist correctly.
- [ ] Create, edit, feature, reorder, and preview partners.
- [ ] Upload, edit metadata, preview, and delete media.
- [ ] Save home-page content and confirm it appears publicly.
- [ ] Save contact-page content and confirm `/contact` reflects it.
- [ ] Create, edit, publish, draft, and preview news articles.
- [ ] Change profile details and password.

## Navigation and linking checks

- [ ] Every sidebar item opens a real page.
- [ ] Active navigation is correct for list, create, and edit routes.
- [ ] Back and cancel actions return to the correct list.
- [ ] Public preview links use the record slug.
- [ ] Dashboard quick actions point to working routes.
- [ ] View website opens the public site.

## Security and content checks

- [ ] Draft records are excluded from public pages server-side.
- [ ] Required fields and unique slugs show useful errors.
- [ ] Media types and sizes are validated server-side.
- [ ] `/admin` remains disallowed in `robots.txt`.
- [ ] Production uses a strong `PAYLOAD_SECRET`, managed PostgreSQL, and persistent media storage.
- [ ] Production backups include both database and media.

## Automated release checks

Run from `rasana-web`:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Current lint output contains non-blocking image optimization warnings from the existing UI.

## Release gate

Release only after the manual checks pass against a real PostgreSQL-backed Payload environment. The local development credential fallback must not be used for production access.
