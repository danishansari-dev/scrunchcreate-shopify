---
name: shopify-ecom-catalog
description: >-
  Manage Shopify product catalog, options, variants, inventory, collections, and metafields.
  Use when importing/exporting product CSVs, synchronizing inventory, structuring parent-variant
  relationships, or setting up automated collections and media galleries.
---

# Shopify Product Catalog, Variant & Inventory Management

This skill covers product modeling, variant structures, bulk CSV operations, smart collections, and inventory policy enforcement for Shopify e-commerce operations.

---

## 1. Product & Variant Modeling

### 1.1. Option Types & Variants
- Shopify allows up to **3 option dimensions** (e.g. `Color`, `Size`, `Style`) and up to **100 variants** per product.
- For handmade accessories:
  - **Option 1:** `Color` or `Style` (e.g., `White`, `Lavender`, `Blush Pink`, `Emerald Green`).
  - **Option 2:** `Size` or `Pack` (e.g., `Single`, `Combo of 3`, `Gift Box`).

### 1.2. Media-to-Variant Filename Matching
To ensure seamless visual switching on the storefront:
- Follow a consistent filename convention for product gallery media:
  - `producthandle-colorname-1.webp` (e.g., `classic-scrunchie-lavender-1.webp`).
- In theme JavaScript (`product-info.js`), match variant title (normalized without hyphens or spaces) to image filenames.

---

## 2. Bulk Product & Inventory CSV Standards

### 2.1. Essential CSV Columns (Shopify Import Schema)

| Column Name | Description | Example |
|:---|:---|:---|
| `Handle` | Unique URL-friendly slug (identifies product rows) | `satin-scrunchie` |
| `Title` | Product title (first row only) | `Classic Satin Scrunchie` |
| `Body (HTML)` | Product description | `<p>Handcrafted 100% pure satin...</p>` |
| `Vendor` | Brand/Vendor name | `Scrunch & Create` |
| `Product Category` | Shopify standard taxonomy category | `Apparel & Accessories > Hair Accessories` |
| `Type` | Custom product type | `Scrunchie` |
| `Tags` | Comma-separated search & filter tags | `Satin, Handmade, Best Seller, Gift` |
| `Published` | Publication state | `TRUE` |
| `Option1 Name` | First option dimension | `Color` |
| `Option1 Value` | Value for this variant row | `Lavender` |
| `Variant SKU` | Stock keeping unit | `SC-SAT-LAV-01` |
| `Variant Grams` | Weight in grams | `25` |
| `Variant Inventory Tracker` | Inventory system | `shopify` |
| `Variant Inventory Qty` | Stock quantity | `20` |
| `Variant Inventory Policy` | Deny or continue when out of stock | `deny` |
| `Variant Fulfillment Service`| Fulfillment type | `manual` |
| `Variant Price` | Retail selling price | `149.00` |
| `Variant Compare At Price` | Original price before discount | `199.00` |
| `Variant Requires Shipping`| Physical item shipping requirement | `TRUE` |
| `Image Src` | CDN URL to product image | `https://cdn.shopify.com/...` |

### 2.2. Rules for Multi-Variant CSVs
1. The first row contains `Title`, `Body (HTML)`, `Vendor`, `Type`, `Tags`.
2. Subsequent variant rows for the same product must have the **same `Handle`**, but leave `Title`, `Body`, and `Tags` blank.
3. Every variant must have distinct `Option Value` combinations.

---

## 3. Collections Strategy

### 3.1. Automated Smart Collections
Create collections automatically driven by conditions:
- **Hair Bows:** Product Type is equal to `HairBow` OR Product Tag contains `Hair Bow`.
- **Scrunchies:** Product Type is equal to `Scrunchie`.
- **Gift Hampers:** Product Type is equal to `GiftHamper`.
- **Under ₹299:** Product Price is less than `299`.

### 3.2. Collection Sorting
- Best-performing collections use `Manual` or `Best Selling` sorting.
- Maintain consistent aspect ratios (recommended: 1:1 square or 4:5 portrait) across all collection images.

---

## 4. Metafields & Metaobjects

Use Shopify metafields to store structured custom attributes:
- `custom.materials`: String or list (e.g. `100% Mulberry Silk / High-Grade Satin`).
- `custom.care_guide`: Rich text (e.g. `Hand wash in cold water with mild detergent`).
- `custom.shipping_lead_time`: Single line text (e.g. `24-48 hours`).
