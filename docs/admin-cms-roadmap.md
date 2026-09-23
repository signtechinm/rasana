# Rasana CMS and Admin Panel Roadmap

## Objective

Build a single-user admin panel for Rasana that allows an authorised administrator to manage:

- Product categories and the products inside each category
- The partner/brand section displayed on the home page
- Contact-page copy, contact details, and enquiry settings
- The administrator's username/email and password

The admin experience should use shadcn-style UI primitives: cards, tabs, inputs, selects, switches, tables, dialogs, alerts, and form validation. Payload remains the content API, persistence layer, media library, and authentication provider unless a later decision requires a separate admin application.

## Current state and constraints

- Payload CMS is already configured at `/admin`.
- Existing collections include `products`, `brands`, `pages`, `media`, `users`, and `site-settings`.
- `products` already has basic fields, but `category` is currently plain text and product detail content is not structured enough for dependable editing.
- The public product and home pages currently fall back to hardcoded content when no CMS URL is configured.
- The home page has no managed partner section yet.
- The contact page is hardcoded, including its hero copy, address, email, WhatsApp link, and form labels.
- There is one authenticated user collection, but there is no explicit one-user policy or dedicated profile/password workflow.
- Payload's admin UI is available, but the existing project does not yet include a shadcn component system. The shadcn visual language will therefore be introduced through reusable admin components and Payload admin customization rather than duplicating content storage in a second system.

## Target content model

### Product categories

Create a `product-categories` collection:

- name
- slug
- short description
- display order
- active/published status
- optional image

Update `products`:

- category relationship to `product-categories`
- name, slug, short description, and full description
- product image/gallery
- brand relationship
- origin country
- packaging and certifications
- featured status
- enquiry enabled
- published status and optional display order
- SEO fields

The public `/products` page will render categories and products from these records. Product detail pages will render the selected product and calculate related products from the same category, with a controlled fallback to other published products.

### Partners

Use the existing `brands` collection as the source of truth for partner records, extending it with:

- partner name
- slug
- short home-page description
- full profile description
- logo and optional cover image
- website/link
- featured on home page
- display order
- active/published status

The home page partner section will query featured, published partners and link to the existing brand detail pages. This avoids creating duplicate partner records.

### Contact page

Create a singleton-style `contact-page` global (or a dedicated single-record collection if the current Payload version makes globals more convenient) containing:

- eyebrow, title, highlighted title text, and intro
- hero image
- contact section heading and body copy
- address/location
- public email
- WhatsApp URL
- form heading, helper text, reason options, and success message
- SEO title and description

The enquiry endpoint remains separate from presentation content. Form submissions should continue to validate server-side and should not expose admin credentials or configuration.

### Home page content

For the first phase, manage the partner section and its ordering through `brands`. Keep the rest of the home page stable until the core CMS flow is proven. A later phase can migrate hero, divisions, categories, trust copy, and CTA content into a `home-page` global.

## Phased implementation plan

### Phase 0 — Decisions, access, and foundations

1. Confirm the admin URL (`/admin`) and the single administrator account policy.
2. Decide whether “username” means the login email, or whether a separate username is required. Recommended: use email as the login identifier because Payload auth already supports it.
3. Add the shadcn-compatible styling foundation and reusable form/table primitives for admin custom views.
4. Define publication rules: only records marked published/active appear publicly.
5. Confirm PostgreSQL, `PAYLOAD_SECRET`, media storage, and production environment values.

Deliverable: approved data model, access rules, and visual direction.

### Phase 1 — Products and categories

1. Add the `product-categories` collection.
2. Convert product category from free text to a relationship.
3. Add structured product detail fields, publication state, ordering, and SEO fields.
4. Update `/products` to load categories/products from Payload with safe fallback behaviour.
5. Update `/products/[slug]` to load the CMS record and show related products using category first.
6. Add admin list columns, filters, ordering, and validation for slugs and required fields.

Acceptance criteria: the administrator can create, edit, publish, unpublish, reorder, and delete a category or product, and the public pages reflect those changes without code edits.

### Phase 2 — Partners on the home page

1. Extend the existing `brands` collection with featured, published, ordering, and home-page copy fields.
2. Update the home page with a responsive “Our partners” section.
3. Use partner logos/images when available and a graceful text fallback when they are not.
4. Link each partner card to its brand detail page.
5. Add admin controls for featured status and display order.

Acceptance criteria: the administrator can change which partners appear on the home page and their order from the admin panel; no code or deployment is required.

### Phase 3 — Contact-page content management

1. Add the `contact-page` global/singleton.
2. Migrate the current contact-page copy and details into it.
3. Update the contact page to read the global content with fallback defaults.
4. Make enquiry reason options and confirmation text editable.
5. Add validation and a preview-friendly admin layout.

Acceptance criteria: the administrator can change contact copy, address, email, WhatsApp URL, hero image, form labels, and success text from the admin panel.

### Phase 4 — Single-user account controls and security

1. Enforce one administrator account through access hooks and/or a create-user restriction.
2. Hide or disable user creation for the single-user deployment.
3. Add a profile/settings view with editable login email and display name.
4. Add a password reset/change form requiring the current password for an authenticated change.
5. Add a secure forgotten-password flow using configured email delivery, or document the deployment-safe recovery procedure if email is not available yet.
6. Add session/logout controls and rate-limit or protect auth endpoints at the deployment layer.

Acceptance criteria: only one admin account can exist; the administrator can change the login email and password; an unauthorised user cannot access content management; recovery is documented and tested.

### Phase 5 — Admin polish, QA, and handoff

1. Complete shadcn-style list, edit, upload, confirmation, empty, loading, and error states.
2. Add preview links from admin records to public product, partner, and contact pages.
3. Test mobile and desktop admin usage.
4. Test draft/unpublished visibility, invalid slugs, missing images, and CMS unavailability.
5. Run lint, TypeScript, production build, and a manual content-management acceptance test.
6. Document deployment variables, first-user setup, backups, media storage, and password recovery.

## Admin navigation proposal

- Dashboard
- Products
  - Categories
  - Products
- Partners
- Contact page
- Media
- Account settings

The dashboard can remain lightweight: content counts, unpublished records, and shortcuts to create a product/category/partner. It should not become a second analytics product in this phase.

## Security and operational notes

- Never use the development fallback secret in production.
- Keep the admin route protected by Payload authentication and do not index it.
- Enforce published/active filters in server-side queries, not only in the UI.
- Validate uploaded media type and size and use persistent production storage.
- Use environment variables for database, secret, site URL, contact delivery, and CMS URL.
- Back up the database and media together; restoring only the database can leave product and partner images missing.
- Do not expose password-reset tokens, database credentials, or admin API keys to client components.

## Recommended delivery order

Implement Phase 0, then Phase 1 through Phase 4 in order. Phase 2 can be delivered immediately after Phase 1 because it reuses the existing brands collection. Phase 5 should be completed before production launch.

## Definition of done for the first release

The first release is complete when one administrator can manage published product categories/products, choose home-page partners, edit all contact-page content, and change their login email/password from the shadcn-styled admin experience, with public pages updating from CMS data and safe fallback/error handling in place.
