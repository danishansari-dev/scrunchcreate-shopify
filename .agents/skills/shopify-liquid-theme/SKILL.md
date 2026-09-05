---
name: shopify-liquid-theme
description: >-
  Develop, refactor, and maintain Shopify Liquid themes. Use when creating or modifying
  Liquid templates, sections, snippets, blocks, theme settings schema, or when running
  theme linting (Theme Check) and live theme deployments via Shopify CLI.
---

# Shopify Liquid Theme Engineering

This skill guides development, modification, linting, and deployment of Shopify Liquid themes. It is tailored for modern Shopify Online Store 2.0 theme architecture (e.g., Dawn and custom themes like Scrunch & Create).

---

## 1. Directory Structure

A compliant Shopify theme adheres to the following layout:

```text
shopify-theme/
├── assets/             # CSS, JS, SVGs, and brand images
├── config/
│   ├── settings_data.json    # Store customizer settings and active values
│   └── settings_schema.json  # Schema defining theme settings in admin customizer
├── layout/
│   └── theme.liquid          # Master wrapper layout file
├── locales/
│   ├── en.default.json       # Default localization strings
│   └── *.json                # Additional language translations
├── sections/           # Modular, reorderable page sections (with {% schema %})
├── snippets/           # Reusable micro-components (no {% schema %})
└── templates/          # JSON templates defining section order and section settings
    ├── index.json
    ├── product.json
    ├── collection.json
    ├── cart.json
    └── 404.json
```

---

## 2. Core Development Workflows

### 2.1. CLI Commands

Run these commands from the `shopify-theme/` directory:

```bash
# Check theme code for syntax errors and best practices
npx @shopify/cli theme check

# Automatically fix autofixable Theme Check offenses
npx @shopify/cli theme check --auto-correct

# Preview theme in local development server with hot-reload
npx @shopify/cli theme dev --store scrunchcreate.myshopify.com

# Push changes to the live theme (Requires confirmation or --allow-live)
npx @shopify/cli theme push --store scrunchcreate.myshopify.com --allow-live --live

# Pull latest customizer settings from live store
npx @shopify/cli theme pull --store scrunchcreate.myshopify.com --live
```

---

## 3. Liquid Best Practices & Standards

### 3.1. Clean Template & Section Architecture
- **Use JSON templates** (`templates/*.json`) rather than deprecated `.liquid` templates for all primary pages.
- Keep `sections/` focused on self-contained blocks with clear `{% schema %}` definitions.
- Keep `snippets/` modular, passing parameters explicitly using `{% render 'snippet-name', prop: value %}`. Avoid `{% include %}`.

### 3.2. Section Schema Definition

Every section that should appear in the Theme Customizer must include a valid `{% schema %}` block:

```liquid
{% schema %}
{
  "name": "Featured Promotion",
  "tag": "section",
  "class": "section-featured-promotion",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Special Offer"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#fbf8f5"
    }
  ],
  "presets": [
    {
      "name": "Featured Promotion"
    }
  ]
}
{% endschema %}
```

### 3.3. Section Rendering API
When building dynamic components like cart updates, filters, or quick-views without full page reloads:
```javascript
// Fetch fresh HTML for specific sections dynamically
const response = await fetch(`/?section_id=cart-drawer`);
const html = await response.text();
const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const newContent = doc.getElementById('CartDrawer').innerHTML;
document.getElementById('CartDrawer').innerHTML = newContent;
```

---

## 4. Theme Quality & Linting Checklist

Before pushing changes to production:
1. Run `npx @shopify/cli theme check` to ensure `0` errors.
2. Verify all asset URLs use the `| asset_url` filter.
3. Ensure all translatable strings reference locale keys (`| t`).
4. Check that responsive image helpers (`image_tag` or `srcset`) include explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
5. Verify mobile drawer and desktop navigation both function correctly without horizontal overflow.
