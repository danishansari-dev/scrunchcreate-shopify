---
name: shopify-checkout-and-payments
description: >-
  Configure Shopify checkout, payment gateways, and shipping logistics. Use when setting up
  payment processors (Razorpay, PhonePe, Cashfree, UPI, COD), checkout customization,
  shipping profiles, delivery rates, and courier integrations (Shiprocket, Delhivery).
---

# Shopify Checkout, Payment Gateways & Shipping Logistics

This skill guides configuration of checkout settings, payment gateway integrations (with India and international support), Cash on Delivery (COD) management, and shipping logistics.

---

## 1. Payment Gateway Configuration (India & Global)

### 1.1. Gateway Providers
- **Razorpay for Shopify:** Most widely adopted in India. Supports UPI (Google Pay, PhonePe, Paytm, CRED), Credit/Debit Cards, Net Banking, and Wallets.
- **PhonePe Payment Gateway:** High success rates for mobile UPI intent checkouts.
- **Cashfree / Paytm:** Popular alternative and redundancy options.

### 1.2. Setup Procedure
1. Navigate to **Shopify Admin > Settings > Payments**.
2. Under **Supported payment methods**, choose **Add payment methods** > **Search by provider**.
3. Select your provider (e.g. **Razorpay**).
4. Enter production API credentials:
   - `Key ID`
   - `Key Secret`
5. Ensure test mode is unchecked for production. Perform a live ₹1–₹10 UPI test transaction and verify the refund webhook.

### 1.3. Cash on Delivery (COD) Management
- Navigate to **Manual payment methods** > **Cash on Delivery (COD)**.
- Add clear customer instructions: *"Cash payment upon delivery. Please ensure exact change is available."*
- To prevent RTO (Return to Origin) losses on COD:
  - Add OTP verification using apps like Kwikpass or Shiprocket Checkout.
  - Set up automated WhatsApp confirmation for COD orders before dispatch.

---

## 2. Shipping Profiles, Rates & Zones

### 2.1. Standard Tier Architecture

| Tier | Price Range | Shipping Fee | Display Name in Checkout |
|:---|:---|:---|:---|
| Free Delivery | Orders ₹499 and above | **₹0.00** | Free Standard Delivery (3–5 Days) |
| Standard Flat Rate | Orders under ₹499 | **₹49.00** | Standard Shipping (3–5 Days) |
| Express Air (Optional)| Any order value | **₹99.00** | Express Priority Air (1–2 Days) |

### 2.2. Saved Package Sizes
In **Settings > Shipping and delivery > Saved packages**:
- Standard Mailer / Box: `15 x 15 x 5 cm` (Tare weight: `50 g`).
- Gift Hamper Box: `25 x 20 x 10 cm` (Tare weight: `150 g`).

### 2.3. Courier & 3PL Integration
- Connect **Shiprocket**, **Delhivery**, or **Pickrr** via their official Shopify apps.
- Configure automatic order sync to push orders upon payment confirmation.
- Configure automatic AWB generation, label generation, and reverse-pickup flows for customer replacements.

---

## 3. Checkout Customization & Branding

In **Shopify Admin > Settings > Checkout**:
- **Customer contact method:** Select *"Phone number or email"* (crucial for mobile-first shoppers in India).
- **Shipping address phone number:** Set to **Required** for carrier delivery SMS and WhatsApp notifications.
- **Checkout branding:**
  - Logo: High-res transparent PNG.
  - Primary button color: Brand pink (`#e78592`).
  - Accent / Link color: `#d96b7a`.
  - Font: Clean sans-serif matching storefront typography.
