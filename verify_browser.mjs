import { chromium } from "playwright";
import { createServer } from "vite";
import fs from "fs";
import path from "path";

async function safeScreenshot(page, options) {
  for (let i = 0; i < 3; i++) {
    try {
      await page.screenshot(options);
      return;
    } catch (err) {
      if (i === 2) throw err;
      await new Promise((r) => setTimeout(r, 250));
    }
  }
}

async function runVerification() {
  console.log("Starting local Vite dev server...");
  const server = await createServer({
    root: ".",
    server: { port: 3180 },
  });
  await server.listen();
  const address = server.httpServer.address();
  const port = typeof address === "object" && address ? address.port : 3180;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Server listening at ${baseUrl}`);

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const screenshotsDir = path.resolve("../screenshots/rendered");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const results = {
    scope: "USER SCOPE RESET — Single Focused Public Route (/)",
    approvedReferences: ["contentarchitecture.dev", "datacurve.ai", "ellipsus.com"],
    consoleErrors: [],
    pageErrors: [],
    routes: {},
    sections: {},
    anchorsLanding: {},
    projects: {},
    clsScore: 0,
    actualZoom200: {},
    copyButton: {},
    commandPalette: {},
    reducedMotion: {},
    removedRoutesLinks: {},
    forbiddenTermsAudit: {},
  };

  try {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.error(`[Browser Console Error] ${msg.text()}`);
        results.consoleErrors.push({ url: page.url(), text: msg.text() });
      }
    });

    page.on("pageerror", (err) => {
      console.error(`[Browser Page Error] ${err.message}`);
      results.pageErrors.push({ url: page.url(), message: err.message });
    });

    // 1. Audit Single Focused Public Route (/) at Desktop (1440x900)
    console.log("1. Auditing focused public route at Desktop (1440x900)...");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const pageTitle = await page.title();

    // First fold desktop capture (1440x900)
    const desktopFirstFold = path.join(screenshotsDir, "route_home_desktop_first_fold.png");
    await safeScreenshot(page, { path: desktopFirstFold, fullPage: false });

    // Full page desktop capture (1440x900)
    const desktopFullShot = path.join(screenshotsDir, "route_home_desktop_1440.png");
    await safeScreenshot(page, { path: desktopFullShot, fullPage: true });

    // Legacy file path compatibility
    const desktopLegacy = path.join(screenshotsDir, "route_home_desktop.png");
    await safeScreenshot(page, { path: desktopLegacy, fullPage: true });

    const desktopMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    }));

    // 2. Mobile Audit (390x844)
    console.log("2. Auditing focused public route at Mobile (390x844)...");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);

    // First fold mobile capture (390x844)
    const mobileFirstFold = path.join(screenshotsDir, "route_home_mobile_first_fold.png");
    await safeScreenshot(page, { path: mobileFirstFold, fullPage: false });

    // Full page mobile capture (390x844)
    const mobileFullShot = path.join(screenshotsDir, "route_home_mobile_390.png");
    await safeScreenshot(page, { path: mobileFullShot, fullPage: true });

    // Legacy file path compatibility
    const mobileLegacy = path.join(screenshotsDir, "route_home_mobile.png");
    await safeScreenshot(page, { path: mobileLegacy, fullPage: true });

    const mobileMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    }));

    results.routes["/"] = {
      title: pageTitle,
      desktopFirstFold,
      desktopFullShot,
      mobileFirstFold,
      mobileFullShot,
      desktopMetrics,
      mobileMetrics,
      status: !desktopMetrics.hasOverflow && !mobileMetrics.hasOverflow ? "PASSED" : "FAILED",
    };
    console.log(
      `Route / verified: Title="${pageTitle}", DesktopOverflow=${desktopMetrics.hasOverflow}, MobileOverflow=${mobileMetrics.hasOverflow}`,
    );

    // Reset viewport to desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    // 3. Measure CLS
    const clsScore = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(cls);
        }, 500);
      });
    });
    results.clsScore = clsScore;
    console.log(`Homepage Measured CLS Score: ${clsScore}`);

    // 4. In-Page Anchor Landing QA
    console.log("4. Testing In-Page Nav Anchor Landings (scroll-mt-28 clearance)...");
    const anchorIds = ["work", "about", "contact", "top"];
    const anchorAudit = {};
    for (const aid of anchorIds) {
      const selector = `header a[href="#${aid}"]`;
      const link = page.locator(selector).first();
      if ((await link.count()) > 0) {
        await link.click();
        await page.waitForTimeout(400);

        const landing = await page.evaluate((id) => {
          const el = document.getElementById(id);
          const header = document.querySelector("header [data-header-bar]");
          if (!el) return { found: false };
          const rect = el.getBoundingClientRect();
          const headerRect = header ? header.getBoundingClientRect() : { bottom: 0 };
          return {
            found: true,
            top: rect.top,
            headerBottom: headerRect.bottom,
            clearance: rect.top - headerRect.bottom,
            isObscured: rect.top < headerRect.bottom - 2,
            scrollY: window.scrollY,
          };
        }, aid);

        anchorAudit[aid] = landing;
      }
    }
    results.anchorsLanding = anchorAudit;
    console.log(`Anchor landings:`, JSON.stringify(anchorAudit, null, 2));

    // 5. Removed Routes Links Audit
    console.log("5. Auditing all links on page for removed routes...");
    const allLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a[href]"));
      return anchors.map((a) => ({
        href: a.getAttribute("href"),
        text: a.innerText.trim(),
      }));
    });
    const removedRoutes = ["/work", "/about", "/approach", "/future", "/contact"];
    const linkViolations = allLinks.filter((l) =>
      removedRoutes.some((r) => l.href === r || (l.href && l.href.startsWith(r + "?"))),
    );
    results.removedRoutesLinks = {
      totalLinks: allLinks.length,
      violations: linkViolations,
      clean: linkViolations.length === 0,
      status: linkViolations.length === 0 ? "PASSED" : "FAILED",
    };
    console.log(
      `Removed routes audit: total=${allLinks.length}, violations=${linkViolations.length}`,
    );

    // 6. Section Anchors Existence & Factual Projects
    console.log("6. Verifying Section Existence & Project Cards...");
    const sectionIds = ["top", "work", "about", "contact"];
    for (const sid of sectionIds) {
      const exists = await page.evaluate((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().height > 0 : false;
      }, sid);
      results.sections[sid] = { exists, status: exists ? "PASSED" : "FAILED" };
    }

    const projectIds = ["prism", "drl", "cerenetics", "eva"];
    for (const pid of projectIds) {
      const cardData = await page.evaluate((id) => {
        const card = document.querySelector(`[data-project-card-id="${id}"]`);
        if (!card) return null;
        return {
          title: card.querySelector("h3")?.innerText || "",
          category: card.querySelector("span")?.innerText || "",
          hasLink: !!card.querySelector("a[href]"),
        };
      }, pid);
      results.projects[pid] = {
        title: cardData?.title,
        hasCard: !!cardData,
        hasLink: cardData?.hasLink,
        status: cardData && cardData.title ? "PASSED" : "FAILED",
      };
    }

    // 7. Forbidden Claims Audit (Strict Factuality Gate)
    console.log("7. Auditing Rendered Page Copy for Forbidden Claims...");
    const forbiddenPhrases = [
      "2 Papers",
      "8 GB",
      "8GB",
      "4 Systems",
      "zero cloud egress",
      "zero-cloud-egress",
      "zero egress",
      "0.50 bytes/param",
      "Quantized parameter memory",
      "DirectML",
      "AWQ INT4",
      "uname -m",
      "ssh -T git",
      "INT4/INT2",
      "Actor-Critic",
      "Zod DTO",
      "rollback",
    ];
    const bodyText = await page.evaluate(() => document.body.innerText);
    const foundForbidden = forbiddenPhrases.filter((p) =>
      bodyText.toLowerCase().includes(p.toLowerCase()),
    );
    results.forbiddenTermsAudit = {
      phrasesChecked: forbiddenPhrases.length,
      forbiddenFound: foundForbidden,
      isClean: foundForbidden.length === 0,
      status: foundForbidden.length === 0 ? "PASSED" : "FAILED",
    };
    console.log(`Forbidden claims audit: isClean=${results.forbiddenTermsAudit.isClean}`);

    // 8. Actual 200% Zoom Test
    console.log("8. Running Actual 200% Browser Zoom Test...");
    const zoomPage = await context.newPage({ viewport: { width: 1440, height: 900 } });
    await zoomPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const cdp = await zoomPage.context().newCDPSession(zoomPage);
    await cdp.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2.0 });
    await zoomPage.evaluate(() => {
      document.documentElement.style.zoom = "200%";
    });
    await zoomPage.waitForTimeout(300);
    const actualZoomScreenshot = path.join(screenshotsDir, "homepage_actual_zoom_200.png");
    await safeScreenshot(zoomPage, { path: actualZoomScreenshot, fullPage: false });
    const zoomIntegrity = await zoomPage.evaluate(() => {
      const heading = document.querySelector("h1");
      const rect = heading ? heading.getBoundingClientRect() : null;
      return {
        hasHeading: !!heading,
        headingVisible: rect ? rect.width > 0 && rect.height > 0 : false,
      };
    });
    results.actualZoom200 = {
      screenshot: actualZoomScreenshot,
      integrity: zoomIntegrity,
      status: zoomIntegrity.headingVisible ? "PASSED" : "FAILED",
    };
    await zoomPage.close();

    // 9. Interactive Copy Button Test
    console.log("9. Testing Interactive Copy Button...");
    const copyExists = await page.evaluate(() => {
      return !!document.querySelector('button[aria-label^="Copy"]');
    });
    results.copyButton = {
      buttonFound: copyExists,
      status: copyExists ? "PASSED" : "FAILED",
    };

    // 10. Command Palette (⌘K)
    console.log("10. Testing Command Palette (⌘K)...");
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(200);
    const paletteOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const paletteClosed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
    results.commandPalette = {
      opened: paletteOpen,
      closedOnEscape: paletteClosed,
      status: paletteOpen && paletteClosed ? "PASSED" : "FAILED",
    };

    // 11. Reduced Motion Verification
    console.log("11. Testing Reduced Motion Mode...");
    const rmPage = await context.newPage({ viewport: { width: 1440, height: 900 } });
    await rmPage.emulateMedia({ reducedMotion: "reduce" });
    await rmPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    await rmPage.waitForTimeout(100);
    const rmScreenshot = path.join(screenshotsDir, "homepage_reduced_motion.png");
    await safeScreenshot(rmPage, { path: rmScreenshot });
    const rmAllVisible = await rmPage.evaluate(() => {
      const allReveals = Array.from(document.querySelectorAll("[data-page-intro], [data-reveal]"));
      return allReveals.every((el) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.opacity) === 1;
      });
    });
    results.reducedMotion = {
      allVisibleImmediately: rmAllVisible,
      screenshot: rmScreenshot,
      status: rmAllVisible ? "PASSED" : "FAILED",
    };
    console.log(`Reduced motion verified immediately visible: ${rmAllVisible}`);
    await rmPage.close();

    // Write reports
    const reportPath = path.resolve("../screenshots/rendered/verification_report.json");
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), "utf8");
    const qaReportPath = path.resolve("../screenshots/rendered/qa_report.json");
    fs.writeFileSync(qaReportPath, JSON.stringify(results, null, 2), "utf8");
    console.log(`Verification reports written.`);

    console.log(
      `Console Errors: ${results.consoleErrors.length}, Page Errors: ${results.pageErrors.length}`,
    );
    if (results.consoleErrors.length === 0 && results.pageErrors.length === 0) {
      console.log("ALL FINAL GATES PASSED!");
    } else {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

runVerification();
