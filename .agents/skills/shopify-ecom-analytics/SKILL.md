---
name: shopify-ecom-analytics
description: >-
  Configure analytics, tracking pixels, and e-commerce event measurement for Shopify.
  Use when setting up or auditing Google Analytics 4 (GA4), Meta Pixel, Google Tag Manager (GTM),
  or Shopify Web Pixels for e-commerce funnel events.
---

# Shopify E-Commerce Analytics & Conversion Tracking

This skill guides the implementation of tracking architectures, the modern Shopify Web Pixels API, Google Analytics 4 (GA4) e-commerce events, and Meta Conversions API (CAPI).

---

## 1. Shopify Web Pixels API Architecture

Modern Shopify uses the **Web Pixels API** (running in a sandboxed Web Worker) to reliably capture customer events across the storefront and checkout without risking script blocking or checkout errors.

### 1.1. Core Customer Events Subscription
In your pixel extension or theme tracking script:
```javascript
// Example pixel integration capturing all core e-commerce events
analytics.subscribe('page_viewed', (event) => {
  console.log('Page Viewed:', event.context.document.location.href);
});

analytics.subscribe('product_viewed', (event) => {
  const product = event.data.productVariant;
  gtag('event', 'view_item', {
    currency: event.data.productVariant.price.currencyCode,
    value: event.data.productVariant.price.amount,
    items: [{
      item_id: product.sku || product.id,
      item_name: product.product.title,
      item_variant: product.title,
      price: product.price.amount
    }]
  });
});

analytics.subscribe('product_added_to_cart', (event) => {
  const item = event.data.cartLine.merchandise;
  gtag('event', 'add_to_cart', {
    currency: item.price.currencyCode,
    value: item.price.amount * event.data.cartLine.quantity,
    items: [{
      item_id: item.sku || item.id,
      item_name: item.product.title,
      item_variant: item.title,
      price: item.price.amount,
      quantity: event.data.cartLine.quantity
    }]
  });
});

analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;
  gtag('event', 'purchase', {
    transaction_id: checkout.order.id,
    value: checkout.totalPrice.amount,
    currency: checkout.currencyCode,
    shipping: checkout.shippingLine?.price?.amount || 0,
    tax: checkout.totalTax?.amount || 0,
    items: checkout.lineItems.map(line => ({
      item_id: line.variant?.sku || line.variant?.id,
      item_name: line.title,
      price: line.variant?.price?.amount,
      quantity: line.quantity
    }))
  });
});
```

---

## 2. GA4 Standard E-Commerce Funnel Mapping

| Step | Standard GA4 Event | Trigger Point in Shopify |
|:---|:---|:---|
| 1. Discovery | `view_item_list` | Browsing collection pages or category sliders |
| 2. Engagement | `select_item` | Clicking a product card in collection grid |
| 3. Consideration | `view_item` | Loading a Product Detail Page (PDP) |
| 4. Intent | `add_to_cart` | Clicking "Add to Cart" or quick add |
| 5. Cart Review | `view_cart` | Opening Slide-out Cart Drawer or `/cart` |
| 6. Checkout Start | `begin_checkout` | Clicking "Checkout" button |
| 7. Shipping Info | `add_shipping_info`| Submitting shipping address in checkout |
| 8. Payment Info | `add_payment_info` | Selecting payment method (UPI, Card, COD) |
| 9. Conversion | `purchase` | Order confirmation / "Thank You" page |

---

## 3. Meta (Facebook) Pixel & CAPI

- **Recommended Setup:** Install the official **Facebook & Instagram** app in Shopify Admin to ensure server-side Conversions API (CAPI) deduplication with browser events.
- **Key Meta Events:** `PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase`.
- Always transmit customer data parameters (hashed email, phone, city, postal code) to achieve high Event Quality Match scores (target: > 8.0/10).

---

## 4. Privacy & Consent Compliance

- Respect regional privacy rules (GDPR, CCPA, and India DPDP Act).
- Integrate with Shopify's built-in Customer Privacy API (`window.Shopify.customerPrivacy`) before firing tracking pixels for EU/EEA visitors.
