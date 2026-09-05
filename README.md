# Scrunch & Create — Shopify Storefront & Migration Suite

This repository contains the complete Shopify storefront, customized Liquid theme, catalog migration tools, automated audit scripts, and AI agent skills for **Scrunch & Create** ([scrunchcreate.myshopify.com](https://scrunchcreate.myshopify.com/)).

---

## 1. Repository Structure

```text
scrunchcreate-shopify/
├── theme/                      # Complete customized Shopify Dawn 16.0.0 Liquid theme
│   ├── assets/                 # Custom CSS (scrunch-custom.css) & brand styling tokens
│   ├── config/                 # settings_data.json, settings_schema.json
│   ├── layout/                 # theme.liquid, password.liquid
│   ├── locales/                # Multi-language locale files
│   ├── sections/               # Custom sections (mega-menu, collections, track-order, etc.)
│   ├── snippets/               # Swatches, cart drawer, WhatsApp relay, sticky ATC
│   ├── templates/              # JSON templates (policies, PDP, cart, track-order)
│   ├── .theme-check.yml        # Shopify Theme Check linter config
│   └── README.md
├── migration/                  # Migration documentation, audits, and import CSVs
│   ├── 00-MIGRATION-AUDIT-REPORT.md
│   ├── CONVERSATION-HISTORY-AND-DEVELOPMENT-GUIDE.md
│   ├── SHOPIFY-LAUNCH-CHECKLIST.md
│   ├── migration_audit_report.md
│   ├── shopify_inventory_import.csv
│   └── shopify_products_import.csv
├── scripts/                    # Operational and automation scripts
│   ├── audit-storefront.mjs    # Playwright end-to-end storefront auditor across 4 viewports
│   ├── export-shopify-csv.js   # Generates Shopify product import CSV from custom catalog
│   └── export-shopify-inventory-csv.js # Generates inventory import CSV
├── docs/                       # Operational guides and verification evidence
│   ├── TODO-NEXT-STEPS.md      # Launch roadmap, Delhivery sync & domain cutover checklist
│   └── screenshots/            # 12 verified browser test captures (cart, PDP, checkout)
├── .agents/                    # 8 specialized Shopify AI agent skills
│   ├── README.md
│   └── skills/                 # liquid-theme, cro, seo, catalog, performance, analytics, checkout, retention
├── .vscode/
│   └── settings.json           # Recommended workspace editor settings
├── .gitattributes              # Normalizes line endings (LF) across Liquid/JSON/JS
├── .gitignore                  # Ignores .shopify, .env, Playwright logs, and zip archives
└── .env.example                # Template for Shopify CLI & automation environment variables
```

---

## 2. Store & Environment Credentials

- **Store URL:** `https://scrunchcreate.myshopify.com/`
- **Active Theme Name:** `test-data`
- **Live Theme ID:** `186623852655`
- **Target Custom Domain:** `scrunchcreate.com`
- **Primary Courier Partner:** Delhivery One (Account: `moinaaaftab@gmail.com`)

---

## 3. Developer Workflow & Shopify CLI Commands

All Shopify theme development and deployment is managed using the official Shopify CLI (`@shopify/cli`).

### Prerequisites
- Node.js 18+ installed
- Shopify CLI access to `scrunchcreate.myshopify.com`

### Common CLI Commands (Run from `theme/` directory)

```bash
# Navigate to the theme directory
cd theme

# Run Theme Check to lint Liquid and JSON syntax
npx @shopify/cli theme check

# Start local live preview / dev server
npx @shopify/cli theme dev --store scrunchcreate.myshopify.com

# Deploy / push changes directly to the live store
npx @shopify/cli theme push --store scrunchcreate.myshopify.com --allow-live --live
```

---

## 4. External Dependencies & Catalog Source

> [!IMPORTANT]
> **Catalog Data Dependency:**
> The migration scripts in `scripts/` (`export-shopify-csv.js` and `export-shopify-inventory-csv.js`) were designed to extract product and inventory records from the original custom website catalog located at:
> - `../src/data/products.json`
> - `../scripts/cloudinary-url-map.json`
>
> If you run these scripts in an isolated repository without the custom website present:
> 1. Copy `src/data/products.json` and `cloudinary-url-map.json` into a local `data/` directory.
> 2. Update the input paths at the top of `scripts/export-shopify-csv.js` and `scripts/export-shopify-inventory-csv.js`.
> 3. Generated import CSVs are committed in `migration/` and ready for direct import via **Shopify Admin -> Products -> Import**.

---

## 5. Automated Storefront Audits

The script `scripts/audit-storefront.mjs` executes an end-to-end audit of `https://scrunchcreate.myshopify.com` using Playwright:
- Tests 4 viewports: Desktop Large (1440x900), Tablet iPad (768x1024), Mobile iPhone (390x844), Mobile Compact (360x740).
- Verifies navigation, search modals, dynamic mega menu hover states, color swatches, cart drawer subtotal & progress bar, and mobile menu drawers.
- Detects console errors and network request failures.

```bash
# Run the automated storefront audit
node scripts/audit-storefront.mjs
```

---

## 6. AI Agent Skills Suite (`.agents/`)

The `.agents/` directory provides workspace-level capabilities for AI assistants operating on this repository:
1. **`shopify-liquid-theme`**: Liquid templates, section schemas, blocks, Theme Check linting & CLI deployment.
2. **`shopify-ecom-cro`**: Conversion rate optimization, PDP layout, color swatches, sticky ATC & cart drawer.
3. **`shopify-ecom-seo`**: Technical SEO, JSON-LD schemas (`Product`, `Offer`, `BreadcrumbList`), canonicals & meta tags.
4. **`shopify-ecom-catalog`**: Product & variant modeling, CSV schemas, and image-to-variant mapping.
5. **`shopify-ecom-performance`**: Core Web Vitals (LCP, CLS, INP), responsive `image_tag`, font preloads.
6. **`shopify-ecom-analytics`**: Web Pixels API, GA4 e-commerce events, Meta Pixel / CAPI & privacy consent.
7. **`shopify-checkout-and-payments`**: Razorpay, PhonePe, UPI, COD, shipping profiles & courier tracking.
8. **`shopify-ecom-retention`**: Customer reviews, abandoned cart recovery, and post-purchase customer journeys.
