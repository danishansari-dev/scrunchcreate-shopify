---
name: shopify-ecom-cro
description: >-
  Apply e-commerce Conversion Rate Optimization (CRO) and UX patterns to Shopify storefronts.
  Use when designing or optimizing product detail pages (PDP), sticky add-to-cart bars,
  variant color swatches, cart drawers, free shipping progress bars, trust badges, and quick-purchase flows.
---

# Shopify E-Commerce Conversion Rate Optimization (CRO) & UX

This skill provides proven patterns, UI components, and psychological triggers to maximize conversion rates, Average Order Value (AOV), and customer checkout completion on Shopify stores.

---

## 1. Product Detail Page (PDP) Conversion Pillars

### 1.1. Color Swatches with Instant Image Synchronization
- Always match variant option selections (e.g., "Lavender", "Blush Pink") instantly to the primary gallery image and thumbnail carousel without full page reloads.
- Pre-normalize string inputs (strip hyphens, spaces, and case) when matching filenames to swatches.
- Ensure swatches feature visual accessibility indicators (focus ring, high-contrast selected border, and active text label).

### 1.2. Pricing Hierarchy & Savings Display
- Render compare-at prices with clear strike-through styling.
- Display explicit percentage or amount saved badges (e.g., `Save 25%` or `Save ₹100`).
- Render tax and shipping clarity immediately under the price (e.g., `Tax included. Free shipping above ₹499`).

### 1.3. Urgency, Stock & Dispatch Reassurance
- For handmade or fast-moving boutique inventory, display live reassurance badges:
  - `In stock, ready to ship • Dispatches within 24-48 hours`
  - Star ratings with review counts: `★★★★★ 4.9 (120+ reviews)`
- Provide a quick pincode delivery estimator or WhatsApp support trigger directly beside the purchase button.

### 1.4. Sticky Mobile Add-to-Cart (ATC)
When the primary Add-to-Cart button scrolls out of view on mobile viewports:
- Display a fixed bottom bar (`position: fixed; bottom: 0; left: 0; right: 0; z-index: 100`).
- Contain: thumbnail thumbnail image, truncated title, active variant name, price, and a full-width CTA button.
- Ensure proper safe-area padding for iOS devices (`env(safe-area-inset-bottom)`).

---

## 2. Slide-out Cart Drawer & AOV Optimization

### 2.1. Free Shipping Progress Bar
Provide an interactive progress meter encouraging customers to add more items to reach free shipping:
```liquid
{% assign free_shipping_threshold = 49900 %}
{% assign cart_total = cart.total_price %}
{% assign remaining = free_shipping_threshold | minus: cart_total %}

<div class="cart-free-shipping-meter">
  {% if remaining > 0 %}
    <p>Add <strong>{{ remaining | money }}</strong> more to unlock <strong>FREE Shipping</strong>!</p>
    <div class="progress-bar">
      <div class="progress-fill" style="width: {{ cart_total | times: 100 | divided_by: free_shipping_threshold | at_most: 100 }}%;"></div>
    </div>
  {% else %}
    <p class="free-shipping-unlocked">🎉 You have unlocked <strong>FREE Shipping</strong>!</p>
  {% endif %}
</div>
```

### 2.2. In-Cart Upsells & Bundle Recommendations
- Display 1 to 2 complementary products directly within the cart drawer (e.g., "Complete your gift with a Satin Scrunchie").
- Allow 1-click addition (`/cart/add.js`) without navigating away from the cart.

### 2.3. Frictionless Checkout Access
- Prominently display primary Checkout CTA button in brand color (`#e78592`).
- Include trust badges below the checkout button: SSL Secured Checkout, UPI / Razorpay, Easy 7-Day Replacement.

---

## 3. Navigation & Search UX

- **Multi-column Mega Menu:** Group categories logically with visual thumbnail cues and color options.
- **Persistent Header Search:** Provide predictive instant search showing matching product thumbnails and prices.
- **Empty States:** On empty search results or empty cart, provide direct links to "Best Sellers" and "New Drops".
