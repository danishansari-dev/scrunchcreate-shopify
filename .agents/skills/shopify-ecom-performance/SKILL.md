---
name: shopify-ecom-performance
description: >-
  Optimize Shopify storefront performance and Core Web Vitals (LCP, CLS, INP). Use when
  diagnosing slow page loads, optimizing Liquid loops, implementing responsive images with
  image_tag, preloading critical fonts, and eliminating render-blocking scripts.
---

# Shopify Storefront Performance & Core Web Vitals Optimization

This skill guides engineering fast Shopify storefronts that achieve green Core Web Vitals scores (LCP < 2.5s, CLS < 0.1, INP < 200ms) on both mobile and desktop.

---

## 1. Largest Contentful Paint (LCP) Optimization

The LCP element on an e-commerce page is almost always the hero banner (homepage) or the first product gallery image (PDP).

### 1.1. High-Priority Image Loading
Never lazy-load above-the-fold or hero images. Use `fetchpriority="high"` and `loading="eager"`:
```liquid
{% if forloop.first %}
  {{ media | image_url: width: 1440 | image_tag:
    loading: 'eager',
    fetchpriority: 'high',
    widths: '375, 550, 750, 1100, 1440',
    sizes: '(min-width: 990px) 50vw, 100vw',
    alt: media.alt | escape
  }}
{% else %}
  {{ media | image_url: width: 1440 | image_tag:
    loading: 'lazy',
    widths: '375, 550, 750, 1100, 1440',
    sizes: '(min-width: 990px) 50vw, 100vw',
    alt: media.alt | escape
  }}
{% endif %}
```

### 1.2. Font Preloading
Preload primary brand fonts in `layout/theme.liquid` using Shopify CDN URL filters:
```liquid
<link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
<link rel="dns-prefetch" href="https://cdn.shopify.com">
{%- unless settings.type_header_font.system? -%}
  <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
{%- endunless -%}
```

---

## 2. Cumulative Layout Shift (CLS) Prevention

CLS occurs when images, banners, or dynamic elements inject content without pre-allocated dimensions.

### 2.1. Aspect Ratio Containers
Always set explicit CSS aspect ratios on media wrappers:
```css
.card-media-wrapper,
.product-media-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1; /* Or match image ratio: 4 / 5 */
  overflow: hidden;
  background-color: #f7f5f3; /* Placeholder background color while loading */
}

.card-media-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 2.2. Reserve Space for Dynamic Components
- Announcement bars, sticky headers, and variant notices must have reserved height in CSS so surrounding elements do not jump when rendered.

---

## 3. Interaction to Next Paint (INP) & JavaScript

### 3.1. Non-Blocking Event Handlers
- Use passive event listeners for scroll, wheel, and touch listeners (`{ passive: true }`).
- Debounce expensive calculations (e.g. search inputs, mega-menu hover switches) using `requestAnimationFrame` or `setTimeout` debouncers (100–180ms).

### 3.2. Script Execution Strategy
- Load analytical pixels and non-critical trackers using `defer` or `async`.
- Avoid loading heavy third-party libraries (e.g., jQuery) when native vanilla JavaScript DOM APIs can accomplish the same task.

---

## 4. Liquid Performance & Rendering Loops

- **Avoid N+1 Loops:** Avoid looping through `collections['all'].products` repeatedly inside nested loops. Group and cache into local Liquid variables once at section top.
- **Limit Collection Loop Counts:** Always paginate product listings using `{% paginate collection.products by 24 %}`.
- **Avoid Expensive String Manipulations in Loops:** Keep regex or heavy string replacements outside repetitive iterations.
