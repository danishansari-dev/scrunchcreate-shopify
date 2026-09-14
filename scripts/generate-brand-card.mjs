import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

/**
 * Generates high-resolution OpenGraph social card for Scrunch & Create.
 * Why: Social platforms (WhatsApp, Facebook, Twitter/X, iMessage, Pinterest)
 * require an explicit, brand-consistent image card with optimal contrast and
 * padding so brand assets do not get cropped or distorted in previews.
 *
 * @danishansari-dev userId - Danish Ansari (Theme Architect)
 * @returns {Promise<void>}
 */
async function generateSocialCard() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  // Read base64 data URI of the canonical primary full-color logo
  const logoPath = path.resolve('brand-pack/SCRUNCH_CREATE_LOGOS_FINAL/01_PRIMARY_LOGO/Full_Color/scrunch-create-logo-primary-full-color.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  // Tricky logic: Use official brand background (#FCF7F3 Warm Cream) with subtle border
  // to ensure stunning rendering on both dark mode and light mode messenger clients.
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1200px;
          height: 630px;
          background-color: #FCF7F3;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .outer-frame {
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(196, 141, 136, 0.25);
          border-radius: 16px;
          pointer-events: none;
        }
        .logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 60px;
        }
        .logo-img {
          max-width: 520px;
          max-height: 520px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 6px 16px rgba(43, 43, 43, 0.05));
        }
      </style>
    </head>
    <body>
      <div class="outer-frame"></div>
      <div class="logo-wrapper">
        <img src="${logoDataUri}" alt="Scrunch & Create" class="logo-img" />
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle' });

  // Save to theme/assets/scrunch-stacked-card.jpg
  const targetThemeCard = path.resolve('theme/assets/scrunch-stacked-card.jpg');
  await page.screenshot({ path: targetThemeCard, type: 'jpeg', quality: 95 });

  // Also update brand-pack/01-stacked-master/scrunch-stacked-card.jpg
  const targetBrandCard = path.resolve('brand-pack/01-stacked-master/scrunch-stacked-card.jpg');
  fs.copyFileSync(targetThemeCard, targetBrandCard);

  console.log('Successfully generated OpenGraph card at:', targetThemeCard);
  await browser.close();
}

generateSocialCard().catch((err) => {
  console.error('Failed to generate social card:', err);
  process.exit(1);
});
