# Rasana Admin Panel — Phased Build Plan

## Purpose

Complete every navigation destination shown in the custom `/admin` dashboard, connect each screen to the existing Payload collections, and make the public-site links and admin links consistent.

## Current navigation audit

| Navigation item | Route | Current state | Planned source |
| --- | --- | --- | --- |
| Dashboard | `/admin` | Exists as a static dashboard | Aggregated CMS counts, drafts, and recent changes |
| Product categories | `/admin/product-categories` | Missing | `product-categories` collection |
| Products | `/admin/products` | Missing | `products` collection |
| Partners | `/admin/partners` | Missing | Existing `brands` collection |
| Media library | `/admin/media` | Missing | Existing `media` upload collection |
| Home page | `/admin/home` | Missing | Home-page global/content blocks; first release may expose featured partners |
| Contact page | `/admin/contact` | Missing | Existing `contact-page` collection, then migrate to a singleton/global |
| News | `/admin/news` | Missing | Existing `news` collection |
| Account settings | `/admin/account` | Missing | Authenticated `users` collection and password/session actions |
| View website | `/` | Exists | Public-site link; preserve in a new tab where appropriate |

At present only `/admin` and the login flow are implemented. The navigation currently points to several routes that resolve to missing pages.

## Linking rules

1. Every sidebar item must resolve to a real page; no placeholder or dead link is allowed.
2. Every list row must link to an edit route, for example `/admin/products/[id]`.
3. Every edit screen must provide `Back to [section]`, `Save`, `Save and continue`, and `View on website` where a public page exists.
4. Create actions use `/admin/[section]/new` and return to the relevant list after saving.
5. Destructive actions require a confirmation dialog and show the resulting success/error state.
6. Sidebar active state must be based on the current pathname, including nested create/edit routes.
7. Public links must use the record slug and must never expose unpublished content.
8. Breadcrumbs must mirror the actual route: `Admin / Products / [Product name]`.

## Phase 0 — Route, data, and UI foundation

### Work

- Establish a shared admin shell: sidebar, header, breadcrumbs, page title, action bar, loading state, empty state, error state, and confirmation dialog.
- Add route helpers and a central navigation map so sidebar labels and URLs cannot drift apart.
- Add a shared Payload server-data layer for authenticated list, read, create, update, delete, and upload operations.
- Define common statuses: draft, published, archived; define which statuses are public.
- Add consistent form validation, toast/alert feedback, unsaved-changes handling, and responsive layouts.
- Keep the existing authentication guard on all `/admin/*` pages and keep login outside the protected layout.

### Deliverable

All routes have a documented owner and shared page primitives are ready for the collection-specific screens.

### Exit criteria

The dashboard shell can render a real nested page, the current route is highlighted correctly, and unauthenticated access is rejected on every protected route.

## Phase 1 — Product categories

### Route set

- `/admin/product-categories` — searchable table with status, order, and product count.
- `/admin/product-categories/new` — create form.
- `/admin/product-categories/[id]` — edit form and linked products.

### Work

- Confirm the `product-categories` collection fields: name, slug, description, image, display order, and published status.
- Add unique-slug validation and prevent deletion when products still reference a category, or require reassignment.
- Add create, edit, publish/unpublish, reorder, and delete actions.
- Link each category to its public category/product view once that public route is finalized.
- Link category rows to filtered products.

### Exit criteria

An administrator can manage categories without editing code, and category changes are reflected in product filters and public pages.

## Phase 2 — Products

### Route set

- `/admin/products` — searchable/filterable table with status, category, brand, featured state, and updated date.
- `/admin/products/new` — create form.
- `/admin/products/[id]` — edit form, media, SEO, and preview.

### Work

- Replace free-text category with a relationship to `product-categories`.
- Build fields for name, slug, short/full description, category, brand, origin, packaging, certifications, images, featured state, enquiry state, status, order, and SEO.
- Add image upload/select from Media library.
- Add validation for required fields, unique slugs, image types, and publish readiness.
- Connect `View on website` to `/products/[slug]`.
- Add related-product links based on category and published status.
- Replace dashboard hardcoded product counts with live collection queries.

### Exit criteria

Create, edit, publish, unpublish, reorder, preview, and delete work from the admin panel; public product pages update from CMS data.

## Phase 3 — Partners / brands

### Route set

- `/admin/partners` — partner table with featured/order/status controls.
- `/admin/partners/new` — create form.
- `/admin/partners/[id]` — edit form and public preview.

### Work

- Use the existing `brands` collection as the single source of truth.
- Expose name, slug, logo, cover image, home description, full description, website, featured state, display order, and publication status.
- Add quick featured toggle and drag/reorder or numeric order control.
- Link public preview to `/brands/[slug]`.
- Update the home page to query featured, published partners and link each card to its detail page.
- Replace dashboard hardcoded partner counts with live queries.

### Exit criteria

The administrator can choose and order home-page partners, and each partner has a working public detail link.

## Phase 4 — Media library

### Route set

- `/admin/media` — searchable grid/table with type, dimensions, size, and usage.
- `/admin/media/[id]` — metadata/edit screen.

### Work

- Connect to the existing `media` upload collection.
- Add upload, search, filter by type, preview, copy URL, alt text, and safe delete.
- Show where an asset is used before deletion.
- Add shared media picker modal for products, partners, pages, and news.
- Validate file type and size server-side.

### Exit criteria

All image fields can select from one library, and deleting a referenced asset is blocked or explicitly confirmed with its references shown.

## Phase 5 — Home page content

### Route set

- `/admin/home` — home-page content editor.
- Optional `/admin/home/preview` — authenticated preview of draft content.

### Work

- Start with featured partner selection and ordering, wired to Phase 3.
- Migrate hero, intro, divisions, product-category highlights, trust copy, and CTA sections into a home-page global/content model.
- Add image selection, text fields, visibility toggles, and section ordering only where required by the approved design.
- Add draft/preview/publish behavior.
- Ensure every CTA points to a real public route.

### Exit criteria

The administrator can update home-page content and verify the result without changing source code.

## Phase 6 — Contact page

### Route set

- `/admin/contact` — singleton editor.
- `/admin/contact/preview` — authenticated preview.

### Work

- Consolidate contact content into the existing `contact-page` model, preferably a Payload global/singleton.
- Manage eyebrow, heading, body, address, email, WhatsApp URL, hero image, form labels, reason options, success message, and SEO.
- Validate email and URL fields.
- Keep enquiry submission separate from editable presentation content.
- Add `View public page` linking to `/contact`.

### Exit criteria

All visible contact-page copy and contact details are editable from one screen and public `/contact` reflects saved changes.

## Phase 7 — News

### Route set

- `/admin/news` — news table with status/date filters.
- `/admin/news/new` — create article.
- `/admin/news/[id]` — edit article and preview.

### Work

- Connect to the existing `news` collection.
- Build title, slug, excerpt, body, cover image, publication date, status, and SEO fields.
- Add publish scheduling only if required by the launch workflow.
- Link public preview to `/news/[slug]`.
- Add empty state and pagination.

### Exit criteria

News can be created, edited, published, unpublished, previewed, and linked from the public news index/detail pages.

## Phase 8 — Account settings and security

### Route set

- `/admin/account` — profile and security settings.

### Work

- Show the authenticated administrator's email and display name.
- Add change-email and change-password flows with current-password verification.
- Add logout action that clears the session and returns to `/login`.
- Enforce the single-user rule in the `users` collection and hide user creation in the custom admin.
- Replace the local development fallback with database-backed Payload auth before production.
- Add password recovery instructions and rate limiting at deployment level.

### Exit criteria

The administrator can securely update credentials, logout, and recover access; invalid sessions cannot access any admin route.

## Phase 9 — Dashboard, QA, and release

### Work

- Replace all dashboard hardcoded counts and recent items with live data.
- Add links from dashboard cards to each corresponding admin list.
- Add quick actions for every major create flow.
- Test every sidebar and in-page link, including mobile navigation.
- Test draft visibility, missing media, invalid slugs, empty collections, API/database downtime, and unauthorized requests.
- Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, and manual acceptance tests.
- Update deployment and content-editor documentation.

### Definition of done

Every sidebar route resolves to a working page; every CRUD screen has a valid back/save/preview path; all public links use published CMS data; and one authenticated administrator can manage products, categories, partners, media, home content, contact content, news, and account settings without code changes.

## Recommended delivery sequence

Implement Phase 0 first, then Phases 1–4 to establish the reusable content-management core. Deliver Phases 5–8 in order because Home and Contact depend on stable content/media patterns, while Account settings must be completed before production. Finish Phase 9 before launch.
