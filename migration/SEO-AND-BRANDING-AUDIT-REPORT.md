# Scrunch & Create — Comprehensive SEO & Branding Audit Report
**Production Store: `scrunchcreate.com` (`diqk8z-gb.myshopify.com`)**
**Date:** November 20, 2026

---

## 1. Executive Summary & Critical Findings

A comprehensive SEO and brand audit was conducted across the live production store `https://scrunchcreate.com/` (Shopify store: `diqk8z-gb.myshopify.com`). While the storefront structure and products are active, several critical branding and technical SEO issues were identified that directly impact search engine indexing and brand perception.

### Summary of Audit Findings

| Category | Item | Current State (Audit) | Target State (Optimized) | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Store Identity** | Store Name | `"My Store 3"` | **`"Scrunch & Create"`** | ❌ Needs Update |
| **Search Engine Title** | `<title>` Tag | `"My Store 3"` | **`Scrunch & Create \| Handmade Hair Accessories, Scrunchies & Hair Bows`** | ❌ Needs Update |
| **Meta Description** | `<meta name="description">` | Missing / Empty | **Descriptive, keyword-rich brand summary (~155 chars)** | ❌ Needs Update |
| **Social Media Sharing** | Open Graph `og:site_name` | `"My Store 3"` | **`"Scrunch & Create"`** | ❌ Needs Update |
| **Social Media Sharing** | Open Graph `og:title` | `"My Store 3"` | **`Scrunch & Create \| Handmade Hair Accessories, Scrunchies & Hair Bows`** | ❌ Needs Update |
| **Social Media Sharing** | Open Graph `og:description`| `"My Store 3"` | **Curated description for WhatsApp, Instagram, Facebook previews** | ❌ Needs Update |
| **Structured Data** | Organization Schema | `"name": "My Store 3"` | **`"name": "Scrunch & Create"` with complete Schema.org `OnlineStore`** | ❌ Needs Update |
| **Heading Hierarchy** | Homepage `<h1>` | Empty / Logo only | **Semantic `<h1>` with keyword-rich accessible title** | ⚠️ Needs Polish |
| **Image Alt Text** | Product Media Gallery | Missing if image un-tagged | **Auto-fallback: `<Product Title> - Handcrafted Hair Accessories by Scrunch & Create`** | ⚠️ Needs Polish |
| **Technical SEO** | Canonical Tags | `<link rel="canonical" href="https://scrunchcreate.com/">` | **Enforced clean canonical URLs on all templates** | ✅ Verified Active |
| **Technical SEO** | Sitemaps & Robots | `/sitemap.xml` & `/robots.txt` HTTP 200 | **Valid XML index for pages, collections, products, blogs** | ✅ Verified Active |
| **Crawl Control** | Noindex on Utility Pages | Search, Cart, Account pages | **Enforced `<meta name="robots" content="noindex, follow">`** | ✅ Implemented |

---

## 2. Store-Level SEO & Branding Audit

### 2.1. Brand Identity Inconsistencies
- In Shopify Admin **Settings &rarr; General (Store details)**, the store name was registered as **`My Store 3`**.
- This leaks into:
  - Browser tab titles
  - Shopify automated order confirmation emails
  - Shopify customer invoices and shipping slips
  - Open Graph social share cards
  - Default JSON-LD schema blocks

### 2.2. Homepage Search Appearance
- **Title Tag:** Currently outputting bare `My Store 3` (10 characters), wasting prime SERP real estate.
- **Recommended SEO Title (60–65 characters):**
  ```text
  Scrunch & Create | Handmade Hair Accessories, Scrunchies & Hair Bows
  ```
- **Recommended Meta Description (150–160 characters):**
  ```text
  Shop beautiful handmade hair accessories at Scrunch & Create. Discover premium satin scrunchies, elegant hair bows, headbands and more. Stylish accessories crafted with love and delivered across India.
  ```

---

## 3. On-Page & Technical SEO Analysis

### 3.1. Heading Hierarchy (`H1` & `H2`)
- **Current Issue:** The homepage `<h1 class="header__heading">` wraps the header logo. Because the logo `alt` defaults to `shop.name`, the H1 literally reads `"My Store 3"` to search engine crawlers.
- **Fix:** Update the header template to provide both an accurate brand alt text and an accessible visually hidden `<span>` text:
  `Scrunch & Create - Handmade Hair Accessories, Scrunchies & Hair Bows`.
- Hero banner slides will maintain structured `<h2>` headings for *New Collection*, *Gift Something Special*, and *Customer Favourites*.

### 3.2. Structured Data (JSON-LD)
- The theme includes a master structured data engine: [`theme/snippets/scrunch-seo-schema.liquid`](file:///c:/Users/daans/Desktop/scrunchcreate-shopify/theme/snippets/scrunch-seo-schema.liquid).
- It injects:
  1. **`OnlineStore` / `Organization` Schema:** Brand name, official studio address (Bisalpur, UP), customer care phone (`+91 73009 69491`), email (`scrunchcreate@gmail.com`), price range (`₹30 - ₹999`), and social profiles.
  2. **`WebSite` Schema with Sitelinks SearchBox:** Enables direct search box in Google results.
  3. **`Product` & `Offer` Schema:** Compliant with Google Search Central guidelines (real INR prices, variant SKUs, InStock status, delivery details, zero fabricated ratings).
  4. **`BreadcrumbList` Schema:** Breadcrumbs for `/collections/...` and `/products/...`.

### 3.3. Product Image Alt Optimization
- Search engines rely heavily on descriptive image alt attributes for Google Image Search discovery.
- All product media without manual alt text will receive a dynamic fallback:
  `{{ media.alt | default: product.title | append: ' - Handcrafted Hair Accessories by Scrunch & Create' | escape }}`.

---

## 4. Phased Implementation Roadmap

- [x] **Phase 1: Comprehensive Audit & Pre-Work Theme Backup**
  - [x] Theme backed up to `migration/theme-backup-before-seo-branding-2026-11-20.zip` (8.39 MB).
  - [x] Live storefront crawled and inspected.
- [ ] **Phase 2: Store Identity & Branding Fixes**
  - [ ] Update Store Name to `Scrunch & Create` in Shopify Admin.
  - [ ] Set Homepage Title and Meta Description in Online Store &rarr; Preferences.
  - [ ] Update theme settings (`settings_data.json`) with brand story and social links.
- [ ] **Phase 3: Theme Code & Technical SEO Enhancements**
  - [ ] Enhance Header `<h1>` semantic text and logo alt.
  - [ ] Enhance Product Media gallery image alt fallback.
  - [ ] Ensure `scrunch-seo-schema.liquid` is pushed and active.
- [ ] **Phase 4: Push to Shopify Live Theme & Browser Validation**
  - [ ] Push updated theme files using Shopify CLI to theme `#190676009279`.
  - [ ] Re-audit `https://scrunchcreate.com/` live HTML.
  - [ ] Verify Open Graph previews and JSON-LD schema validity.
