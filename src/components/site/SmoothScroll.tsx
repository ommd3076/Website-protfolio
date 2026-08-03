import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap, prefersReduced, requestScrollRefresh } from "./motion";

/**
 * Root-level smooth scrolling. Lenis drives the scroll position and GSAP's
 * ticker drives Lenis, so ScrollTrigger and Lenis share one time base.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReduced()) return;
    ensureGsap();

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (typeof value === "number") lenis.scrollTo(value, { immediate: true });
        return lenis.scroll;
      },
    });
    requestScrollRefresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (typeof value === "number") window.scrollTo(0, value);
          return window.scrollY;
        },
      });
      requestScrollRefresh();
    };
  }, []);

  return <>{children}</>;
}
