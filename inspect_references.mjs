import { chromium } from "playwright";
import path from "path";

const ARTIFACT_DIR =
  "C:/Users/ommd3/.gemini/antigravity/brain/7a236f52-3e92-4a3f-b2b5-a34e20970554";

async function inspectRefs() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const refs = [
    { name: "ref_contentarchitecture", url: "https://contentarchitecture.dev" },
    { name: "ref_datacurve", url: "https://datacurve.ai" },
    { name: "ref_ellipsus", url: "https://ellipsus.com" },
  ];

  for (const r of refs) {
    try {
      console.log(`Navigating to ${r.url}...`);
      await page.goto(r.url, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(2000);
      const shotPath = path.join(ARTIFACT_DIR, `${r.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`Saved ${r.name} to ${shotPath}`);

      // Extract typography and color tokens
      const info = await page.evaluate(() => {
        const bodyStyle = window.getComputedStyle(document.body);
        const h1 = document.querySelector("h1");
        const h1Style = h1 ? window.getComputedStyle(h1) : null;
        return {
          bodyBg: bodyStyle.backgroundColor,
          bodyColor: bodyStyle.color,
          fontFamily: bodyStyle.fontFamily,
          h1Font: h1Style ? h1Style.fontFamily : null,
          h1Size: h1Style ? h1Style.fontSize : null,
          h1Weight: h1Style ? h1Style.fontWeight : null,
          h1LineHeight: h1Style ? h1Style.lineHeight : null,
        };
      });
      console.log(`${r.name} design tokens:`, JSON.stringify(info, null, 2));
    } catch (e) {
      console.error(`Failed to inspect ${r.url}:`, e.message);
    }
  }

  await browser.close();
}

inspectRefs();
