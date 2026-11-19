import { chromium } from 'playwright';

/**
 * Validates live SEO tags, Open Graph metadata, canonical links, and Schema.org JSON-LD structured data.
 * @danishansari-dev targetUrl - The live store URL to crawl and audit
 * @returns {Promise<object>} Extracted SEO metadata and schema validation results
 */
async function auditLiveSeo(targetUrl) {
  // Why this exists: Uses system Chrome/Edge to bypass bot challenges and test real production DOM rendering.
  // Tricky logic: Falls back through installed browser channels.
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  console.log(`\n🔍 Fetching live DOM for: ${targetUrl}`);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
  await page.waitForTimeout(2000);

  // Extract critical SEO tags
  const title = await page.title();
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content').catch(() => null);
  const robots = await page.locator('meta[name="robots"]').getAttribute('content').catch(() => null);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content').catch(() => null);
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content').catch(() => null);

  // Extract all JSON-LD schemas
  const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
  const schemas = [];

  for (const script of jsonLdScripts) {
    const text = await script.textContent();
    try {
      const parsed = JSON.parse(text);
      schemas.push(parsed);
    } catch (e) {
      schemas.push({ error: 'Failed to parse JSON-LD', raw: text.slice(0, 100) });
    }
  }

  await browser.close();

  return {
    url: targetUrl,
    title,
    metaDescription,
    robots,
    canonical,
    ogTitle,
    ogImage,
    schemaCount: schemas.length,
    schemas
  };
}

/**
 * Runner function orchestrating homepage, collection, and product page audits.
 * @returns {Promise<void>}
 */
async function runAudits() {
  const urls = [
    'https://scrunchcreate.com/',
    'https://scrunchcreate.com/collections/all'
  ];

  for (const url of urls) {
    try {
      const result = await auditLiveSeo(url);
      console.log(`\n========================================`);
      console.log(`URL: ${result.url}`);
      console.log(`Title: ${result.title}`);
      console.log(`Meta Description: ${result.metaDescription}`);
      console.log(`Robots: ${result.robots}`);
      console.log(`Canonical: ${result.canonical}`);
      console.log(`OG Title: ${result.ogTitle}`);
      console.log(`Schema Count: ${result.schemaCount}`);
      console.log(`Schema Types: ${result.schemas.map(s => s['@type']).join(', ')}`);
      console.log(`========================================`);
    } catch (err) {
      console.error(`Audit error for ${url}:`, err.message);
    }
  }
}

runAudits();
