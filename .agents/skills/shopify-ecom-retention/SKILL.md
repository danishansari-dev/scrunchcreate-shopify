---
name: shopify-ecom-retention
description: >-
  Implement e-commerce customer retention, review systems, and post-purchase marketing.
  Use when setting up product reviews, wishlist persistence, abandoned cart email/WhatsApp recovery,
  and customer lifecycle communication flows.
---

# Shopify Customer Retention, Reviews & Post-Purchase Marketing

This skill establishes retention strategies, review collection mechanisms, abandoned checkout recovery, and post-purchase notification systems for Shopify e-commerce brands.

---

## 1. Abandoned Checkout Recovery Workflows

60–75% of online shoppers abandon their shopping carts before completing checkout. Automating recovery can reclaim 10–18% of lost revenue.

### 1.1. Native Shopify Email Recovery
1. Navigate to **Shopify Admin > Settings > Checkout > Abandoned checkout emails**.
2. Set automation to trigger **10 hours** after cart abandonment.
3. Configure subject line: *"Did you leave your handcrafted favorites behind at Scrunch & Create?"*
4. Include dynamic cart items, images, and an automated discount link (e.g. `WELCOME10` for 10% off).

### 1.2. WhatsApp Abandoned Cart Automation
- For high mobile traffic (especially in India), install **Wati**, **BiteSpeed**, or **Interakt**.
- Send an automated WhatsApp notification 30–60 minutes after abandonment with direct 1-tap checkout link.

---

## 2. Product Reviews & Social Proof

Customer reviews with photos increase PDP conversion rates by 270%.

### 2.1. Review Apps & Widgets
- Recommended apps: **Judge.me**, **Loox**, or **Yotpo**.
- Embed review star badges on product cards in `snippets/card-product.liquid`:
```liquid
<!-- Star rating badge on product card -->
<div class="card-product-reviews">
  <span class="stars" aria-hidden="true">★★★★★</span>
  <span class="rating-text">4.9</span>
</div>
```
- Embed full reviews widget at the bottom of PDP (`templates/product.json`).

### 2.2. Post-Purchase Review Request Timing
- Schedule automatic review request email/SMS **5–7 days after order delivery** (not order date), ensuring the customer has experienced the product.
- Offer a coupon incentive (e.g. 15% off next order) for photo/video reviews.

---

## 3. Wishlist & Customer Accounts

### 3.1. Wishlist Persistence
- In theme header, provide a quick wishlist heart icon linking to the customer's saved items.
- Store wishlist items locally in `localStorage` for guest users and sync to customer metafields or database for logged-in users.

### 3.2. Customer Account Strategy
- Use **New Customer Accounts** (passwordless 6-digit email code login) for reduced friction.
- Enable order history lookup, 1-click reordering, and direct package tracking links.

---

## 4. Post-Purchase Customer Journey

1. **Immediate:** Instant Order Confirmation (Email + WhatsApp) with order summary and dispatch timeline.
2. **Day 1:** Shipping dispatch notification with AWB tracking link.
3. **Day 3–4:** Out for delivery alert.
4. **Day 5:** Delivery confirmation and product care guide (e.g., how to wash satin scrunchies).
5. **Day 10:** Review request with photo incentive.
6. **Day 25:** New drops and personalized replenishment recommendations.
