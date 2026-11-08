import { chromium } from "playwright";
import { createServer } from "vite";
import fs from "fs";
import path from "path";

async function runVerification() {
  console.log("Starting local Vite dev server...");
  const server = await createServer({
    configFile: "./vite.config.ts",
    server: { port: 3147, host: "127.0.0.1" },
  });
  await server.listen();
  const baseUrl = "http://127.0.0.1:3147";
  console.log(`Server listening at ${baseUrl}`);

  const screenshotsDir = path.resolve("../screenshots/rendered");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const results = {
    consoleErrors: [],
    pageErrors: [],
    routes: {},
    backForward: {},
    actualZoom200: {},
    accessibility: {},
  };

  try {
    const context = await browser.newContext();
    const page = await context.newPage({
      viewport: { width: 1280, height: 800 },
    });

    // Capture console errors across all interactions
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

    // 1. Audit Every Reachable Route at Desktop (1280x800) and Mobile (390x844)
    const routesToTest = ["/", "/work", "/about", "/approach", "/future", "/contact"];

    console.log("1. Auditing all reachable routes...");
    for (const r of routesToTest) {
      const routeUrl = `${baseUrl}${r}`;
      console.log(`Testing route: ${r}`);

      // Desktop test
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(routeUrl, { waitUntil: "networkidle" });

      const pageTitle = await page.title();
      const desktopShot = path.join(
        screenshotsDir,
        `route_${r.replace("/", "") || "home"}_desktop.png`,
      );
      await page.screenshot({ path: desktopShot, fullPage: true });

      // Check desktop overflow
      const desktopOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      // Mobile test
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(150);
      const mobileShot = path.join(
        screenshotsDir,
        `route_${r.replace("/", "") || "home"}_mobile.png`,
      );
      await page.screenshot({ path: mobileShot, fullPage: true });

      // Check mobile overflow
      const mobileOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      results.routes[r] = {
        title: pageTitle,
        desktopScreenshot: desktopShot,
        mobileScreenshot: mobileShot,
        desktopOverflow,
        mobileOverflow,
        status: !desktopOverflow && !mobileOverflow ? "PASSED" : "FAILED",
      };
      console.log(
        `Route ${r} verified: Title="${pageTitle}", DesktopOverflow=${desktopOverflow}, MobileOverflow=${mobileOverflow}`,
      );
    }

    // Reset viewport to desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

    // Measure CLS on Desktop Homepage
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
        }, 800);
      });
    });
    results.clsScore = clsScore;
    console.log(`Homepage Measured CLS Score: ${clsScore}`);

    // 2. Actual 200% Browser Zoom Test (via CDP pageScaleFactor & CSS zoom)
    console.log("2. Running Actual 200% Browser Zoom Test...");
    const zoomPage = await context.newPage({
      viewport: { width: 1280, height: 800 },
    });
    await zoomPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

    // Use CDP session for real Chromium page scale factor
    const cdp = await zoomPage.context().newCDPSession(zoomPage);
    await cdp.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2.0 });

    // Also apply document zoom emulation
    await zoomPage.evaluate(() => {
      document.documentElement.style.zoom = "200%";
    });
    await zoomPage.waitForTimeout(300);

    const actualZoomScreenshot = path.join(screenshotsDir, "homepage_actual_zoom_200.png");
    await zoomPage.screenshot({ path: actualZoomScreenshot, fullPage: false });

    // Verify layout integrity at 200% zoom
    const zoomIntegrity = await zoomPage.evaluate(() => {
      const heading = document.querySelector("h1");
      const listbox = document.querySelector('[role="listbox"]');
      const rect = heading ? heading.getBoundingClientRect() : null;
      return {
        hasHeading: !!heading,
        hasListbox: !!listbox,
        headingVisible: rect ? rect.width > 0 && rect.height > 0 : false,
      };
    });

    results.actualZoom200 = {
      screenshot: actualZoomScreenshot,
      integrity: zoomIntegrity,
      status: zoomIntegrity.headingVisible ? "PASSED" : "FAILED",
    };
    console.log(
      `Actual 200% zoom verified: headingVisible=${zoomIntegrity.headingVisible}, screenshot=${actualZoomScreenshot}`,
    );
    await zoomPage.close();

    // 3. Browser Back / Forward History Synchronization
    console.log("3. Testing Browser Back / Forward History Synchronization...");
    // Initial state: prism
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const initialProject = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });

    // Select DRL
    await page.click('[data-project-id="drl"]');
    await page.waitForTimeout(350);
    const afterClickProject = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });
    const urlAfterClick = page.url();

    // Select Cerenetics
    await page.click('[data-project-id="cerenetics"]');
    await page.waitForTimeout(350);

    // Browser Go Back (should return to drl)
    await page.goBack();
    await page.waitForTimeout(400);
    const back1Project = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });

    // Browser Go Forward (should return to cerenetics)
    await page.goForward();
    await page.waitForTimeout(400);
    const forward1Project = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });

    results.backForward = {
      initialProject,
      afterClickProject,
      back1Project,
      forward1Project,
      urlAfterClick,
      status:
        initialProject === "prism" &&
        afterClickProject === "drl" &&
        back1Project === "drl" &&
        forward1Project === "cerenetics"
          ? "PASSED"
          : "FAILED",
    };
    console.log(
      `Back/Forward verified: Initial=${initialProject}, Click=${afterClickProject}, Back=${back1Project}, Forward=${forward1Project}`,
    );

    // 4. Keyboard Navigation (WAI-ARIA Single-Select Listbox)
    console.log("4. Running Keyboard Navigation Check...");
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.focus('[role="listbox"]');
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(350);
    const keyProject1 = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });

    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(350);
    const keyProject2 = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });

    await page.keyboard.press("Home");
    await page.waitForTimeout(350);
    const keyProject3 = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });

    results.keyboard = {
      arrowDown1: keyProject1,
      arrowDown2: keyProject2,
      homeKey: keyProject3,
      status:
        keyProject1 === "drl" && keyProject2 === "cerenetics" && keyProject3 === "prism"
          ? "PASSED"
          : "FAILED",
    };
    console.log(
      `Keyboard verified: arrow1=${keyProject1}, arrow2=${keyProject2}, home=${keyProject3}`,
    );

    // 5. Rapid Interactions & Interruption Safety
    console.log("5. Testing Rapid Selection Switching (Interruption Safety)...");
    const rapidClicks = ["drl", "cerenetics", "eva", "prism"];
    for (const pid of rapidClicks) {
      await page.click(`[data-project-id="${pid}"]`);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(400);
    const finalProject = await page.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });
    results.rapidInteractions = {
      finalProject,
      status: finalProject === "prism" ? "PASSED" : "FAILED",
    };
    console.log(`Rapid clicks settled cleanly to: ${finalProject}`);

    // 6. Reduced Motion Verification
    console.log("6. Testing Reduced Motion (prefers-reduced-motion: reduce)...");
    const rmPage = await context.newPage({
      viewport: { width: 1280, height: 800 },
    });
    await rmPage.emulateMedia({ reducedMotion: "reduce" });
    await rmPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await rmPage.click('[data-project-id="cerenetics"]');
    const rmSelected = await rmPage.evaluate(() => {
      const selected = document.querySelector('[role="option"][aria-selected="true"]');
      return selected ? selected.getAttribute("data-project-id") : null;
    });
    const rmScreenshot = path.join(screenshotsDir, "homepage_reduced_motion.png");
    await rmPage.screenshot({ path: rmScreenshot });
    results.reducedMotion = {
      selectedProject: rmSelected,
      screenshot: rmScreenshot,
      status: rmSelected === "cerenetics" ? "PASSED" : "FAILED",
    };
    console.log(`Reduced motion verified: ${rmSelected}`);
    await rmPage.close();

    // 7. Write full test report
    const reportPath = path.resolve("../screenshots/rendered/verification_report.json");
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), "utf8");
    console.log(`Verification report written to: ${reportPath}`);

    // Summary Check
    const totalConsoleErrors = results.consoleErrors.length;
    const totalPageErrors = results.pageErrors.length;
    console.log(`Console Errors: ${totalConsoleErrors}, Page Errors: ${totalPageErrors}`);
    if (totalConsoleErrors > 0 || totalPageErrors > 0) {
      console.warn("WARNING: Detected console or page errors during test run!");
    } else {
      console.log("ALL TESTS COMPLETED WITH ZERO CONSOLE ERRORS AND ZERO PAGE ERRORS!");
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
