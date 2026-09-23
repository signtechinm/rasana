# Rasana CMS Production Checklist

## Environment

Set these values on the CMS deployment:

```env
DATABASE_URI=postgres://...
PAYLOAD_SECRET=<long-random-secret>
NEXT_PUBLIC_CMS_URL=https://cms.example.com
NEXT_PUBLIC_SITE_URL=https://rasana.com
CONTACT_EMAIL=hello@rasana.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
```

Do not use the development database, development secret, or local media directory in production.

## First-time CMS setup

1. Start the production app against the configured PostgreSQL database.
2. Open `/admin` and create the first administrator account.
3. Do not create another user; the application rejects additional accounts.
4. Create product categories before creating products.
5. Add products and mark them Published.
6. Add partner records, mark selected records Featured and Published.
7. Create exactly one Contact Page record and enter the public contact details.
8. Upload and verify media through the Media collection.
9. Use the admin account profile to test email/password changes and password recovery.

## Release verification

- `/products` shows only published products.
- Product detail pages show the correct category and related products.
- The home-page partner section reflects Featured/Published partner records and ordering.
- `/contact` reflects the Contact Page record.
- Draft records are not visible publicly.
- Invalid product and partner slugs return the not-found page.
- Password-reset email arrives through SMTP.
- Database and media backups are both enabled.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.

## Known implementation note

Payload's built-in admin remains the authenticated CMS shell. The content model and account controls are ready; a fully bespoke shadcn admin shell requires choosing whether to customize Payload's admin components or maintain a separate authenticated admin frontend. That choice should be made before investing in a second UI layer.
