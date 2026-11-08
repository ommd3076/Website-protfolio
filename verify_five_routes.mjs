import { chromium } from "playwright";
import path from "path";

const ARTIFACT_DIR =
  "C:/Users/ommd3/.gemini/antigravity/brain/7a236f52-3e92-4a3f-b2b5-a34e20970554";

async function verify() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const results = {
    pages: {},
    overflows: {},
    errors: [],
  };

  // 1. Desktop Verification (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      results.errors.push(`Console Error: ${msg.text()}`);
    }
  });

  const routes = [
    { path: "/", name: "home" },
    { path: "/work", name: "work" },
    { path: "/about", name: "about" },
    { path: "/notes", name: "notes" },
    { path: "/contact", name: "contact" },
  ];

  for (const r of routes) {
    await page.goto(`http://localhost:8081${r.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Verify live page text matches current source
    const pageText = await page.evaluate(() => {
      const h1 = document.querySelector("h1")?.textContent?.trim() || "";
      const body = document.body.innerText || "";
      return { h1, body };
    });

    if (r.name === "home") {
      if (pageText.body.includes("Engineer, researcher")) {
        results.errors.push("Home page contains unverified 'Engineer, researcher' copy!");
      }
    }
    if (r.name === "work") {
      if (pageText.h1 !== "Engineering Systems & Repositories") {
        results.errors.push(`Work page H1 mismatch: expected 'Engineering Systems & Repositories', got '${pageText.h1}'`);
      }
      if (pageText.body.includes("4 Curated Domain Stories / 27 Public Repositories")) {
        results.errors.push("Work page still contains stale statistics strip!");
      }
      if (pageText.body.includes("delay-risk")) {
        results.errors.push("Work page contains unverified 'delay-risk' claim!");
      }
      if (pageText.body.includes("zero webcam")) {
        results.errors.push("Work page contains unverified 'zero webcam' claim!");
      }
    }
    if (r.name === "about") {
      if (
        pageText.body.includes("scan --auto") ||
        pageText.body.includes("SCAN_001") ||
        pageText.body.includes("[SYSTEM_LATTICE]") ||
        pageText.body.includes("VERIFIED NODES")
      ) {
        results.errors.push("About page contains prohibited fake telemetry labels!");
      }
      const canvasDim = await page.evaluate(() => {
        const c = document.querySelector("canvas");
        const frame = c?.parentElement?.parentElement;
        if (!c || !frame) return null;
        const cb = c.getBoundingClientRect();
        const fb = frame.getBoundingClientRect();
        return {
          canvasW: cb.width,
          canvasH: cb.height,
          frameW: fb.width,
          frameH: fb.height,
          ratioW: (cb.width / fb.width).toFixed(2),
          ratioH: (cb.height / fb.height).toFixed(2),
        };
      });
      results.about_canvas_geometry = canvasDim;
    }
    if (r.name === "notes") {
      if (pageText.body.includes("Authored Note") || pageText.body.includes("2026 · Mysuru, India")) {
        results.errors.push("Notes page contains unverified authorship/date claims!");
      }
      if (
        pageText.body.includes("Newton") ||
        pageText.body.includes("fluxions") ||
        pageText.body.includes("Passing a compiler") ||
        pageText.body.includes("Workbench")
      ) {
        results.errors.push("Notes page contains unverified essay text!");
      }
    }
    if (r.name === "contact") {
      if (pageText.body.includes("Engineer & Researcher")) {
        results.errors.push("Contact page contains unverified 'Engineer & Researcher' copy!");
      }
      if (pageText.body.includes("Available")) {
        results.errors.push("Contact page contains unsupported 'Available' status claim!");
      }
    }

    // Scroll down sequentially to trigger ScrollTrigger reveals
    await page.evaluate(async () => {
      const distance = 400;
      const delay = 80;
      while (
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
      ) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      document.scrollingElement.scrollTop = 0;
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    // Check overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    results.overflows[`desktop_${r.name}`] = overflow;

    // Capture screenshot
    const screenshotPath = path.join(ARTIFACT_DIR, `verify_desktop_${r.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.pages[`desktop_${r.name}`] = screenshotPath;
    console.log(`Saved desktop_${r.name}: ${screenshotPath} (H1: "${pageText.h1}")`);
  }

  // Interactive Reversible Hand-Off Test on /work
  await page.goto("http://localhost:8081/work", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  // 1. Click 'Inspect in 27-repo catalog ↓'
  const inspectBtn = await page.getByRole("button", { name: "Inspect in 27-repo catalog ↓" }).first();
  if (inspectBtn) {
    await inspectBtn.click();
    await page.waitForTimeout(600);
    const isVisibleInViewport = await page.evaluate(() => {
      const el = document.getElementById("repo-silver-computing-machine");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    results.handoff_to_index_visible = isVisibleInViewport;
  }

  // 2. Click '↑ Return to story' from inside #repo-silver-computing-machine specifically
  const repoSilverCard = await page.$("#repo-silver-computing-machine");
  const returnBtn = await repoSilverCard?.$('button:has-text("↑ Return to story")');
  if (returnBtn) {
    await returnBtn.click();
    await page.waitForTimeout(600);
    const isStoryVisible = await page.evaluate(() => {
      const el = document.getElementById("story-01");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    results.handoff_return_to_story_visible = isStoryVisible;
  }

  // Rapid pointer interaction test on /about
  await page.goto("http://localhost:8081/about", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const canvas = await page.$("canvas");
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      for (let i = 0; i < 20; i++) {
        await page.mouse.move(box.x + ((i * 10) % box.width), box.y + ((i * 15) % box.height));
      }
    }
  }

  // 2. Mobile Verification (390x844 - iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  for (const r of routes) {
    await mobilePage.goto(`http://localhost:8081${r.path}`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(600);

    // Scroll down sequentially to trigger ScrollTrigger reveals
    await mobilePage.evaluate(async () => {
      const distance = 400;
      const delay = 80;
      while (
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
      ) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      document.scrollingElement.scrollTop = 0;
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    const overflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    results.overflows[`mobile_${r.name}`] = overflow;

    const screenshotPath = path.join(ARTIFACT_DIR, `verify_mobile_${r.name}.png`);
    await mobilePage.screenshot({ path: screenshotPath, fullPage: true });
    results.pages[`mobile_${r.name}`] = screenshotPath;
    console.log(`Saved mobile_${r.name}: ${screenshotPath}`);
  }

  // 3. Reduced Motion Test
  const reducedMotionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rmPage = await reducedMotionContext.newPage();
  await rmPage.goto("http://localhost:8081/work", { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(400);
  const rmWorkScreenshot = path.join(ARTIFACT_DIR, "verify_reduced_motion_work.png");
  await rmPage.screenshot({ path: rmWorkScreenshot, fullPage: true });

  await rmPage.goto("http://localhost:8081/about", { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(400);
  const rmAboutScreenshot = path.join(ARTIFACT_DIR, "verify_reduced_motion_about.png");
  await rmPage.screenshot({ path: rmAboutScreenshot, fullPage: true });

  await browser.close();
  console.log("Verification summary:", JSON.stringify(results, null, 2));
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
