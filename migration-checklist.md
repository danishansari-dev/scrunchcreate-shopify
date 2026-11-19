# Scrunch & Create — Master Store Migration Checklist
**Target Active Store: My Store 3 (`diqk8z-gb.myshopify.com` / `https://admin.shopify.com/store/diqk8z-gb/`)**
*(Old normal store `scrunchcreate` has been deleted; My Store 3 is now the single source of truth).*

---

## Safety Protocol & Rules of Engagement

> [!IMPORTANT]
> **Strict Migration Safeguards:**
> - **Zero Destructive Actions:** Do not delete or overwrite live assets without verification.
> - **Single Source of Truth:** All operations, development, and configurations target **My Store 3** (`diqk8z-gb.myshopify.com`).
> - **DNS Lock:** Custom domain `scrunchcreate.com` will NOT be pointed until destination store passes all end-to-end checkout and layout tests.
> - **Ownership & Subscriptions:** Do not change store ownership or activate paid plans until the merchant explicitly requests it.
> - **Rollback Ready:** Keep `migration/source-theme-backup-test-data.zip` and catalog CSVs preserved at all times.

---

## Phase 1: Audit & Pre-Migration Backup (Completed)

- [x] **1.1 Store Identification & Endpoint Reachability**
  - [x] Old normal store `scrunchcreate.myshopify.com` (DELETED by merchant).
  - [x] Verify Destination domain: **My Store 3** (`diqk8z-gb.myshopify.com`, Admin: `https://admin.shopify.com/store/diqk8z-gb/`).
  - [x] Confirmed HTTP 200 reachability and active live theme.
- [x] **1.2 Complete Theme Backup**
  - [x] Export complete theme backup to [`migration/source-theme-backup-test-data.zip`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/source-theme-backup-test-data.zip) (8.38 MB).
  - [x] Verify theme structure: layouts, templates, sections, snippets, assets, config (`settings_data.json`).
- [x] **1.3 Catalog & Data Export**
  - [x] Export product catalog to [`migration/shopify_products_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_products_import.csv) (677 rows).
  - [x] Export inventory mapping to [`migration/shopify_inventory_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_inventory_import.csv).
- [x] **1.4 Theme Import & Activation on My Store 3**
  - [x] Merchant uploaded customized Scrunch theme to **My Store 3**.
  - [x] Confirmed live theme is `theme-export-scrunchcreate-40u8sjz9-myshopify` (Theme ID `190676009279`).
- [x] **1.5 Audit Documentation**
  - [x] Generate comprehensive [`migration-report.md`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration-report.md).
  - [x] Generate executable [`migration-checklist.md`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration-checklist.md).

---

## Phase 2: Theme Setup & Validation on My Store 3 (Completed)

- [x] **2.1 Publish Theme on My Store 3**
  - [x] Live theme ID `190676009279` is published and active.
- [x] **2.2 Inspect Theme Assets & Brand Styles**
  - [x] Confirmed `assets/scrunch-custom.css` is serving on `diqk8z-gb.myshopify.com`.
  - [x] Confirmed brand colors: Primary (`#E78592`), Hover (`#D96B7A`), Heading Plum (`#4A1C40`).
- [ ] **2.3 Test Custom Liquid Sections on Storefront**
  - [ ] Check Hero Carousel (Desktop slider & mobile touch hero).
  - [ ] Check Dynamic Mega Menu (`scrunch-nav-mega-menu.liquid`).
  - [ ] Check Product Card Badges (Ratings, Stock Notes, Category Badges).
  - [ ] Check Footer (Newsletter band, 4-column layout, Instagram showcase).
  - [ ] Verify typography: `Plus Jakarta Sans` body font and headings.
- [ ] **2.3 Test Custom Liquid Sections**
  - [ ] Check Hero Carousel (Desktop slider & mobile touch hero).
  - [ ] Check Dynamic Mega Menu (`scrunch-nav-mega-menu.liquid`).
  - [ ] Check Product Card Badges (Ratings, Stock Notes, Category Badges).
  - [ ] Check Footer (Newsletter band, 4-column layout, Instagram showcase).

---

## Phase 3: Product Catalog & Collection Migration (Pending Approval)

- [x] **3.1 Import Products CSV**
  - [x] Navigate to **Products** in destination store admin.
  - [x] Upload [`migration/shopify_products_import.csv`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/migration/shopify_products_import.csv).
  - [x] Confirm image CDN mapping from Cloudinary.
  - [x] Verify 677 rows processed and published live.
- [x] **3.2 Import / Synchronize Inventory**
  - [x] Inventory levels and SKUs successfully initialized via product import.
- [x] **3.3 Set Up Automated Collections**
  - [x] Created `Scrunchies` (Condition: Product Type equals `Scrunchie`).
  - [x] Created `Hair Bows` (Condition: Product Type equals `HairBow`).
  - [x] Created `Flower Jewellery` (Condition: Product Type equals `FlowerJewellery`).
  - [x] Created `Gift Hampers` (Condition: Product Type equals `GiftHamper`).
  - [x] Created `Hair Clips` (Condition: Product Type equals `Hairclip`).

---

## Phase 4: Navigation, Pages & Legal Policies (Completed)

- [x] **4.1 Create Custom Pages**
  - [x] Created **Track Order** page (`/pages/track-order`) and assigned theme template `page.track-order` (Visibility set to Visible).
- [ ] **4.2 Populate Store Policies**
  - [ ] Populate **Refund Policy**.
  - [ ] Populate **Privacy Policy**.
  - [ ] Populate **Terms of Service**.
  - [ ] Populate **Shipping Policy**.
  - [ ] Populate **Contact Information**.
- [x] **4.3 Configure Navigation Menus**
  - [x] Configured **Main Menu**:
    - Home (`/`)
    - Shop All (`/collections/all`)
    - Scrunchies (`/collections/scrunchies`)
    - Hair Bows (`/collections/hair-bows`)
    - Flower Jewellery (`/collections/flower-jewellery`)
    - Gift Hampers (`/collections/gift-hampers`)
    - Hair Clips (`/collections/hair-clips`)
    - Track Order (`/pages/track-order`)

---

## Phase 5: Payments, Shipping & Courier Integration (Completed)

- [x] **5.1 Configure Shipping Profiles**
  - [x] Domestic India Rate configured: Flat rate ₹49.00 for orders under ₹499.
  - [x] Free Shipping configured: ₹0 for orders ₹499.00 and above.
- [x] **5.2 Connect Payment Gateway**
  - [x] Payment provider and Cash on Delivery (COD) configured.
- [x] **5.3 Install & Connect Delhivery One App**
  - [x] Delhivery integration linked for fulfillment.

---

## Phase 6: End-to-End Storefront Verification (In Progress)

- [ ] **6.1 Automated Playwright Multi-Viewport Audit**
  - [ ] Run storefront audit against `https://scrunchcreate.com` / `scrunchcreate-40u8sjz9.myshopify.com`.
- [ ] **6.2 PDP Variant Swatch & Image Switching**
  - [ ] Verify color selection auto-slides main gallery image.
- [ ] **6.3 Cart Drawer & Free Shipping Progress Bar**
  - [ ] Test order total under ₹499 (shows ₹49 shipping).
  - [ ] Test order total &ge; ₹499 (shows Free Shipping unlock).

---

## Phase 7: Domain Cutover & Final Handoff (Final Step)

- [x] **7.1 Add Custom Domain to Destination Store**
  - [x] Domain `scrunchcreate.com` added in Settings &rarr; Domains.
- [ ] **7.2 Set Primary Domain & Verify SSL**
  - [ ] Confirm SSL Certificate status is Active (green checkmark).
  - [ ] Ensure `scrunchcreate.com` is set as Primary domain.
- [ ] **7.3 Remove Storefront Password**
  - [ ] Go to Online Store &rarr; Preferences &rarr; Uncheck password protection to launch publicly.

