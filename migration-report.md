# Scrunch & Create — Store Migration Audit Report
**Phase 1: Audit and Backup Assessment**

---

## 1. Executive Summary

This audit report documents the comprehensive inspection, store verification, and pre-migration backup for migrating **Scrunch & Create** from the initial development/legacy setup to the active primary production store **My Store 3**.

| Attribute | Legacy Store (Deleted) | Active Production Store (My Store 3) |
| :--- | :--- | :--- |
| **Store Name** | `scrunchcreate` | `My Store 3` |
| **Store Type** | Legacy Store (Deleted) | Primary Production Store |
| **Shopify Domain** | `scrunchcreate.myshopify.com` (DELETED) | `diqk8z-gb.myshopify.com` |
| **Shopify Admin URL** | N/A | `https://admin.shopify.com/store/diqk8z-gb/` |
| **Custom Domain** | `https://scrunchcreate.com/` | *Pending DNS Cutover* |
| **Storefront State** | N/A (Deleted) | Active (HTTP 200 OK) |
| **Active Theme** | `test-data` (Theme ID: `186623852655`) | `theme-export-scrunchcreate-40u8sjz9-myshopify` (Theme ID: `190676009279`) |
| **Backup Status** | Complete ZIP Backup generated (`8.38 MB`) | Preserved in `migration/source-theme-backup-test-data.zip` |

---

## 2. Store Verification & Identification

Stores queried and verified via direct network protocol inspection and Shopify CLI:

### Active Production Store (My Store 3)
- **myshopify Domain:** `diqk8z-gb.myshopify.com`
- **Shopify Admin URL:** `https://admin.shopify.com/store/diqk8z-gb/`
- **Active Live Theme ID:** `190676009279` (`theme-export-scrunchcreate-40u8sjz9-myshopify`)
- **HTTP Reachability:** 200 OK confirmed
- **Assets Serving:** `scrunch-custom.css`, `base.css`, `component-cart-drawer.css`
- **CLI Connection Status:** Authenticated & Set as default themeStore in Shopify CLI (`@shopify/cli`)

### Legacy Store (Deleted)
- **myshopify Domain:** `scrunchcreate.myshopify.com`
- **Status:** Permanently deleted by merchant. All active development shifted to My Store 3.

---

## 3. Source Store Inspection & Resource Audit

### 3.1. Active Theme & Theme Architecture
- **Theme Name:** `test-data` (Shopify Dawn v16.0.0 foundation, heavily customized)
- **Live Theme ID:** `186623852655`
- **Core Custom Components:**
  1. **Dynamic Hover Mega Menu:** [`theme/snippets/scrunch-nav-mega-menu.liquid`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/snippets/scrunch-nav-mega-menu.liquid)
     - Dynamically traverses `collections['all'].products` with zero hardcoding.
     - Categorizes items into HairBows, Scrunchies, GiftHampers, FlowerJewellery, and Hairclips.
     - Displays color swatches with direct variant deep links (`?variant=<id>`) and 180ms hover debounce.
  2. **PDP Variant-to-Image Controller:** [`theme/assets/product-info.js`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/assets/product-info.js) & [`theme/snippets/product-media-gallery.liquid`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/snippets/product-media-gallery.liquid)
     - Automatically matches active color selection against gallery image filenames and syncs thumbnail carousel slides.
  3. **Branded Footer & Newsletter Band:** [`theme/sections/footer.liquid`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/sections/footer.liquid)
     - 4-column brand grid, 4-tile Instagram showcase linking to `@scrunch_and_create`, and handcrafted in India badge.
  4. **Product Card Enhancements:** [`theme/snippets/card-product.liquid`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/snippets/card-product.liquid)
     - Uppercase category badge, 4.9-star rating badge, and dispatch reassurance note (`In stock, ready to ship • 2-4 days`).
  5. **Custom Courier Order Tracker:** [`theme/templates/page.track-order.json`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/templates/page.track-order.json) & [`theme/sections/main-track-order.liquid`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/sections/main-track-order.liquid)
     - Live Delhivery courier integration tab and Order Number tracking tab.
  6. **Design System Tokens:** [`theme/assets/scrunch-custom.css`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/assets/scrunch-custom.css)
     - Primary Pink: `#E78592`, Hover: `#D96B7A`, Deep Plum: `#4A1C40`, Light Surface: `#FAF5F7`.

### 3.2. Products, Variants & Inventory
- **Product Catalog Size:** ~8 core categories, 677 total variant and media mapping rows.
- **Exported Product Data:** Committed in [`migration/shopify_products_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_products_import.csv) (154 KB).
- **Exported Inventory Data:** Committed in [`migration/shopify_inventory_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_inventory_import.csv) (17 KB).
- **Categories:**
  - Scrunchies (Classic, Combo, Satin-Mini, Tulip, Tulip-Sheer, Satin-Printed)
  - Hair Bows (Classic, Velvet, Organza, Linen)
  - Flower Jewellery (Rose, Jasmine, Haldi/Mehndi Sets)
  - Gift Hampers (Curated festive & bridesmaid kits)
  - Hair Clips, Earrings, Paraandis
- **Pricing Strategy:**
  - Base offer prices (e.g. ₹199 to ₹499)
  - Compare-at prices (original MRP)
  - Free shipping threshold configured at ₹499

### 3.3. Product Images & CDN
- **Asset Storage:** High-resolution WebP product images hosted on Cloudinary CDN (`res.cloudinary.com/duu26sqog/...`), mapped 1:1 to product handles and color variants in `shopify_products_import.csv`.
- **Local Theme Assets:** 12 verified browser test captures and marketing banner sliders in `public/assets/marketing/` and `theme/assets/`.

### 3.4. Collections & Navigation
- **Automated Collections:** All, Scrunchies, Hair Bows, Flower Jewellery, Gift Hampers, Hair Clips, New Arrivals (`isNew`), Best Sellers.
- **Navigation Menus:**
  - Main menu: Shop All, Scrunchies, Hair Bows, Flower Jewellery, Gift Hampers, Track Order.
  - Footer menu: Quick Links, Policies, About, Instagram.

### 3.5. Pages & Policies
- Custom Pages: `track-order` (`/pages/track-order`).
- Standard Policy Templates: Privacy Policy, Refund Policy, Terms of Service, Shipping Policy.

### 3.6. Store Settings, Shipping & Integrations
- **Primary Courier:** Delhivery One (Account: `moinaaaftab@gmail.com`).
- **Shipping Profile:**
  - Standard India Delivery: ₹49 flat rate.
  - Free Shipping: Orders ₹499 and above.
  - Cash on Delivery (COD) surcharge: ₹30.
- **WhatsApp Relay:** Direct order routing to merchant phone (+91 73009 69491).

---

## 4. Destination Store Inspection

- **Store Domain:** `scrunchcreate-40u8sjz9.myshopify.com`
- **Shop ID:** `86218113243`
- **Current State:**
  - The merchant has successfully downloaded the `test-data` theme ZIP from development and imported it into the destination store.
  - The destination store theme is ready to be published as the live theme.
  - Products, collections, pages, policies, and payment/shipping settings are awaiting Phase 2 migration tasks.

---

## 5. Backup & Export Artifacts Created

1. **Complete Theme Archive Backup:**
   - File: [`migration/source-theme-backup-test-data.zip`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/source-theme-backup-test-data.zip)
   - Size: `8,388,518 bytes` (~8.38 MB)
   - Scope: Complete theme repository including `assets/`, `config/settings_data.json`, `config/settings_schema.json`, `layout/`, `locales/`, `sections/`, `snippets/`, and `templates/`.
2. **Product Catalog Export:**
   - File: [`migration/shopify_products_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_products_import.csv)
   - Scope: 677 rows covering all product titles, handles, descriptions, variants, prices, compare-at prices, image URLs, and inventory policies.
3. **Inventory Levels Export:**
   - File: [`migration/shopify_inventory_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_inventory_import.csv)
   - Scope: SKU inventory tracking quantities per variant.

---

## 6. Shopify MCP & CLI Independent Connection Guide

If you wish to grant the AI assistant direct Admin GraphQL access to both stores simultaneously, Shopify requires independent store credentials:

### Method 1: Shopify Custom App / Admin API Access Tokens (Recommended)
Because Shopify CLI only maintains one active store session at a time in the local terminal, connecting to both stores independently without interactive prompts requires Admin API access tokens:
1. In **Source Store Admin** (`scrunchcreate.myshopify.com`):
   - Go to **Settings** &rarr; **Apps and sales channels** &rarr; **Develop apps**.
   - Create an app named `Migration Auditor`.
   - Grant scopes: `read_products`, `read_themes`, `read_content`, `read_orders`.
   - Install the app and copy the **Admin API access token** (`shpat_...`).
2. In **Destination Store Admin** (`scrunchcreate-40u8sjz9.myshopify.com`):
   - Repeat the same steps in the destination store admin.
   - Grant scopes: `read_products`, `write_products`, `read_themes`, `write_themes`, `read_content`, `write_content`.
   - Copy the destination **Admin API access token**.
3. Place both tokens in `.env`:
   ```bash
   SOURCE_SHOPIFY_STORE=scrunchcreate.myshopify.com
   SOURCE_SHOPIFY_ACCESS_TOKEN=shpat_source_...
   DEST_SHOPIFY_STORE=scrunchcreate-40u8sjz9.myshopify.com
   DEST_SHOPIFY_ACCESS_TOKEN=shpat_dest_...
   ```

### Method 2: Shopify CLI Switch
To run CLI commands against the destination store:
```bash
shopify theme push --store scrunchcreate-40u8sjz9.myshopify.com
```
This triggers an in-browser device login prompt (`accounts.shopify.com/activate-with-code`) to link the destination store session.

