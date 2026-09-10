# Scrunch & Create — Master Next Steps & Action Plan

This document outlines the step-by-step roadmap and operational checklist to complete fulfillment, launch publicly, automate multi-channel notifications, and scale customer retention.

---

## Priority Overview

| Phase | Category | Urgency | Key Owner | Estimated Time |
|---|---|---|---|---|
| **Phase 1** | Immediate Fulfillment (Order #1001) | **Critical (Today)** | Merchant | 15 mins |
| **Phase 2** | Storefront Public Launch & Domain | **High (Pre-Launch)** | Merchant | 10 mins |
| **Phase 3** | Automated Notifications (WhatsApp, Email) | **High (Launch Week)** | Merchant / Developer | 30 mins |
| **Phase 4** | Theme Polish & Customizer Verification | **Medium** | Merchant / Developer | 15 mins |
| **Phase 5** | Reviews & Retention Optimization | **Medium (Post-Launch)** | Merchant | Ongoing |

---

## Phase 1: Immediate Fulfillment (Order #1001)

- [ ] **Step 1.1: Log in to Delhivery One**
  - Navigate to [https://one.delhivery.com](https://one.delhivery.com).
  - Confirm logged in as `moinaaaftab@gmail.com` (Moina Khatun, Scrunch & Create).
- [ ] **Step 1.2: Generate AWB for Order #1001**
  - Go to **Forward Orders** &rarr; **Pending AWB**.
  - Locate Order `#1001` (Customer: Danish Ansari, ₹514.00, 7 items).
  - Verify package dimensions & weight (Default: 0.5 kg, approx 15x10x5 cm for scrunchies).
  - Click **"Get AWB / Create Shipment"**.
- [ ] **Step 1.3: Print Shipping Label & Pack Order**
  - Download and print the shipping label (Thermal 4x6 or A4 sticker format).
  - Pack the 7 handcrafted scrunchies (Classic + Tulip Sheer).
  - Affix the label securely on the outer waterproof poly mailer / box.
- [ ] **Step 1.4: Confirm Shopify Fulfillment Sync**
  - Open [Shopify Admin Orders](https://admin.shopify.com/store/scrunchcreate/orders).
  - Verify that the Delhivery app has automatically marked Order `#1001` as **Fulfilled** and linked the new AWB number with carrier set to `Delhivery`.
- [ ] **Step 1.5: Test Live AWB on Storefront**
  - Visit `https://scrunchcreate.myshopify.com/pages/track-order`.
  - Enter the new AWB into the "By Courier AWB" tab to verify live checkpoint retrieval.
- [ ] **Step 1.6: Handover to Courier**
  - Delhivery pickup agent will arrive at `Scrunch & Create, Bisalpur, Uttar Pradesh 262201`.
  - Hand over parcel and obtain digital/physical pickup scan receipt.

---

## Phase 2: Storefront Public Launch & Domain

- [ ] **Step 2.1: Remove Storefront Password**
  - Go to **Shopify Admin** &rarr; **Online Store** &rarr; **Preferences**.
  - Scroll to **Password protection**.
  - Uncheck **"Restrict store access to visitors with password"**.
  - Click **Save**.
- [ ] **Step 2.2: Verify Custom Primary Domain**
  - Go to **Shopify Admin** &rarr; **Settings** &rarr; **Domains**.
  - Ensure `scrunchcreate.com` is configured as the **Primary Domain**.
  - Verify that SSL Certificate status is **Active** (green checkmark).
  - Test visiting `https://scrunchcreate.com/pages/track-order` in an incognito window.
- [ ] **Step 2.3: Verify Payment Gateways**
  - Go to **Shopify Admin** &rarr; **Settings** &rarr; **Payments**.
  - Confirm active payment provider (e.g., Razorpay, PhonePe, or Cashfree) is in **Live Mode** (not Test Mode).
  - Run a ₹1 live purchase test on mobile to verify instant UPI auto-redirection and confirmation.
- [ ] **Step 2.4: Set Shipping Rates & Free Shipping Rule**
  - Go to **Settings** &rarr; **Shipping and delivery**.
  - Ensure standard shipping is configured across India (e.g. ₹49 flat rate).
  - Ensure Free Shipping applies automatically on carts &ge; ₹499 (matches our cart drawer progress bar).
- [ ] **Step 2.5: Populate Shopify Admin Policies**
  - Go to **Settings** &rarr; **Policies**.
  - Resolve the orange **"Required"** badge on **Purchase options cancellation policy** and populate the remaining policies using pre-formatted text in [`docs/SHOPIFY-LEGAL-POLICIES.md`](SHOPIFY-LEGAL-POLICIES.md).
  - Ensures policy links render cleanly in checkout footer and prevents compliance warnings.

---

## Phase 3: Automated Notifications Setup

### 3.1 WhatsApp Automation (Highest ROI: ~98% Open Rate)
- [ ] **Option A (Recommended — Turnkey Shopify App):**
  - Install **Interakt** or **Wati** or **BiteSpeed** from the [Shopify App Store](https://apps.shopify.com/).
  - Connect WhatsApp Business number (`+91 73009 69491`).
  - Enable pre-approved WhatsApp message templates:
    1. *Order Confirmation* (Sent instantly upon checkout).
    2. *Shipping & AWB Tracking* (Triggered when Delhivery generates AWB, links directly to `https://scrunchcreate.com/pages/track-order`).
    3. *Out for Delivery* (Triggered on morning of delivery).
    4. *Delivery Confirmation & Review Request* (Triggered upon package delivery).
- [ ] **Option B (Direct Meta Cloud API — Custom Server):**
  - If hosting a custom server using `src/services/notificationService.js`:
    - Register on [Meta for Developers](https://developers.facebook.com/).
    - Create a WhatsApp Business App and generate System User Permanent Token.
    - Set environment variables: `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`.

### 3.2 Email Notification Templates
- [ ] **Brand Customization in Shopify Admin:**
  - Go to **Settings** &rarr; **Notifications** &rarr; **Customer notifications**.
  - Click **Customize email templates**.
  - Upload brand logo (Scrunch & Create).
  - Set accent color to `#e78592`.
  - Ensure the **Shipping confirmation** email includes a prominent button:  
    `Track Your Order → https://scrunchcreate.com/pages/track-order?order={{ order.name }}`.

### 3.3 Transactional SMS (India DLT Compliance)
- [ ] Complete TRAI DLT registration on Vilpower/Jio/Airtel if branded SMS sender ID (e.g., `SCRCRT`) is desired.
- [ ] *Note:* Because DLT registration involves document verification and template approval fees, prioritizing WhatsApp notifications is recommended first.

---

## Phase 4: Theme Polish & Customizer Verification

- [ ] **Verify Theme Settings in Shopify Customizer:**
  - Go to **Online Store** &rarr; **Themes** &rarr; Click **Customize** on `test-data`.
  - Navigate to **Pages** &rarr; **track-order**.
  - Verify section settings:
    - *Page Heading:* "Track Your Order"
    - *Page Subheading:* "Real-time updates on your handcrafted scrunchies & gifts."
    - *Support Phone:* `+91 73009 69491`
- [ ] **Verify Header & Footer Links:**
  - Open storefront desktop view &rarr; click **"Track Order"** in top header navigation.
  - Open storefront mobile view &rarr; tap hamburger drawer &rarr; click **"Track Order"**.
  - Scroll to footer &rarr; click **"Track Your Order"** under Policies.

---

## Phase 5: Reviews, Retention & Customer Delight

- [ ] **Install Product Reviews App:**
  - Install **Judge.me Product Reviews** (Free plan available) or **Loox**.
  - Add review widget on product pages and post-purchase thank you page.
- [ ] **Configure Automated Review Request:**
  - Set schedule to send review request email / WhatsApp message 5 days after order delivery.
  - Offer a 10% discount code on the next purchase for submitting a photo review.
- [ ] **Enable Abandoned Cart Recovery:**
  - Go to **Shopify Admin** &rarr; **Marketing** &rarr; **Automations**.
  - Turn on **Abandoned checkout email automation** (scheduled at 1 hour and 24 hours).
- [ ] **Packaging Inserts & Brand Love:**
  - Include handwritten thank you card or branded packaging slip inside every parcel.
  - Include QR code on thank-you card pointing directly to `https://scrunchcreate.com/pages/track-order` and Instagram `@scrunchcreate`.

---

*Last Updated: September 2026 | Scrunch & Create Engineering*
