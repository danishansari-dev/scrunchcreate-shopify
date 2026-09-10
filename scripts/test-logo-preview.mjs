import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const logoBase64 = fs.readFileSync('theme/assets/scrunch-logo.png').toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF8F5; }
        .header-wrapper {
          background: #ffffff;
          border-bottom: 1px solid rgba(54, 45, 39, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 18px rgba(42, 34, 29, 0.04);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1440px;
          margin: 0 auto;
          padding: 10px 32px;
          min-height: 64px;
        }
        .header__heading-logo-wrapper {
          display: inline-flex;
          align-items: center;
        }
        .header__heading-logo {
          width: 160px;
          height: auto;
          display: block;
          object-fit: contain;
          transition: transform 200ms ease, opacity 200ms ease;
        }
        .header__heading-logo:hover {
          opacity: 0.92;
          transform: scale(1.015);
        }
        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          text-decoration: none;
          color: #24201e;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.02em;
        }
        .nav-links a:hover {
          color: #c76f7e;
        }
        .actions {
          display: flex;
          gap: 16px;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          color: #24201e;
        }
        .badge {
          background: #24201e;
          color: white;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 12px;
        }
        .hero {
          padding: 80px 32px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .hero h1 {
          font-size: 44px;
          font-weight: 800;
          color: #24201e;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .hero p {
          font-size: 18px;
          color: #665c56;
          margin: 0;
        }
        .footer {
          background: #f4ede7;
          border-top: 1px solid rgba(54, 45, 39, 0.08);
          padding: 48px 32px 32px;
          margin-top: 60px;
        }
        .footer-grid {
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .footer-brand img {
          width: 175px;
          height: auto;
          display: block;
          margin-bottom: 14px;
        }
        .footer-brand p {
          color: #5e534e;
          font-size: 14px;
          line-height: 1.6;
          max-width: 320px;
          margin: 0;
        }
        @media (max-width: 768px) {
          .header {
            padding: 8px 16px;
          }
          .nav-links {
            display: none;
          }
          .header__heading-logo {
            width: 135px;
            max-height: 48px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header-wrapper">
        <header class="header">
          <div class="header__heading-logo-wrapper">
            <img src="${logoDataUri}" alt="Scrunch & Create" class="header__heading-logo">
          </div>
          <ul class="nav-links">
            <li><a href="#">Scrunchies</a></li>
            <li><a href="#">Hair Bows</a></li>
            <li><a href="#">Gift Hampers</a></li>
            <li><a href="#">Flower Jewellery</a></li>
            <li><a href="#">Hairclips</a></li>
          </ul>
          <div class="actions">
            <span>Search</span>
            <span>Account</span>
            <span>Bag <span class="badge">0</span></span>
          </div>
        </header>
      </div>

      <div class="hero">
        <h1>Handcrafted Luxury Hair Accessories</h1>
        <p>Premium Satin Silk Scrunchies & Bespoke Gift Hampers — Made to Make You Shine</p>
      </div>

      <footer class="footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${logoDataUri}" alt="Scrunch & Create">
            <p>Premium handmade hair accessories crafted in India for everyday polish, gifting, and occasion styling.</p>
          </div>
          <div>
            <h4 style="margin: 0 0 12px; color: #24201e;">Shop</h4>
            <div style="font-size: 14px; color: #5e534e; line-height: 1.8;">Scrunchies<br>Hair Bows<br>Gift Hampers</div>
          </div>
          <div>
            <h4 style="margin: 0 0 12px; color: #24201e;">Policies</h4>
            <div style="font-size: 14px; color: #5e534e; line-height: 1.8;">Shipping & Delivery<br>Refunds & Returns<br>Terms of Service</div>
          </div>
          <div>
            <h4 style="margin: 0 0 12px; color: #24201e;">Connect</h4>
            <div style="font-size: 14px; color: #5e534e; line-height: 1.8;">@scrunch_and_create<br>+91 73009 69491</div>
          </div>
        </div>
      </footer>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(500);

  const artifactDir = 'C:/Users/daans/.gemini/antigravity-ide/brain/ba34bc25-3db6-4edb-8ae5-33300fadec85';
  await page.screenshot({ path: `${artifactDir}/desktop_logo_preview.png` });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${artifactDir}/mobile_logo_preview.png` });

  await browser.close();
  console.log('Visual preview screenshots generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
