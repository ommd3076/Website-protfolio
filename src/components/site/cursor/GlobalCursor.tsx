import { useEffect } from "react";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";
import "./carenetics-cursor.css";

type CursorInstance = {
  addState: (state: string) => void;
  destroy: () => void;
  hide: () => void;
  removeState: (state: string) => void;
  removeVideo: () => void;
  setVideo: (src: string) => void;
  show: () => void;
  __logoCleanup?: () => void;
};

/** One client-only Cuberto Mouse Follower instance for the persistent app shell. */
export function CursorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cursor: CursorInstance | null = null;
    let disposed = false;
    let loading = false;

    const destroy = () => {
      cursor?.destroy();
      cursor?.__logoCleanup?.();
      cursor = null;
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("pointerover", mediaOver);
      document.removeEventListener("pointerout", mediaOut);
    };
    const hide = () => cursor?.hide();
    const show = () => cursor?.show();
    const mediaSelector = "[data-cursor-media]:not([data-cursor-media='false'])";
    const mediaOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(mediaSelector);
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      const src = target.dataset["cursorMediaSrc"];
      if (src) cursor?.setVideo(src);
      else cursor?.addState("media");
    };
    const mediaOut = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(mediaSelector);
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      if (target.dataset["cursorMediaSrc"]) cursor?.removeVideo();
      else cursor?.removeState("media");
    };

    const create = async () => {
      if (cursor || loading || disposed || !pointerQuery.matches || motionQuery.matches) return;
      loading = true;
      const { default: MouseFollower } = await import("mouse-follower");
      loading = false;
      if (disposed || !pointerQuery.matches || motionQuery.matches) return;

      MouseFollower.registerGSAP(gsap);
      cursor = new MouseFollower({
        container: document.body,
        speed: 0.35, // Faster response (lower = faster) - Apple-like response ~0.35s
        ease: "power3.out", // Apple-like easing for cursor
        visible: true,
        visibleOnState: false,
        skewing: 2.0, // Reduced skewing for more precise feel
        skewingText: 2.8,
        skewingIcon: 2.8,
        skewingMedia: 3.0,
        skewingDelta: 0.001,
        skewingDeltaMax: 0.08,
        stickDelta: 0.12,
        hideTimeout: 200,
        stateDetection: {
          pointer:
            "a:not([data-cursor]),button:not([data-cursor]),[role='button']:not([data-cursor]),summary:not([data-cursor])",
          inverse: "h1,h2,h3,h4,p,li,blockquote",
          "-hidden":
            "iframe,input,textarea,select,[contenteditable='true'],[data-cursor='-hidden']",
        },
      }) as CursorInstance;
      document.documentElement.classList.add("has-custom-cursor");
      window.addEventListener("blur", hide);
      window.addEventListener("focus", show);
      document.addEventListener("pointerover", mediaOver);
      document.addEventListener("pointerout", mediaOut);

      // Logo boundary handling - hide cursor when over logo
      const logoSelector = "[data-brand-slot], [data-brand-mark], [data-logo]";
      const handleLogoEnter = (e: PointerEvent) => {
        const target = (e.target as Element | null)?.closest<HTMLElement>(logoSelector);
        if (!target || target.contains(e.relatedTarget as Node | null)) return;
        cursor?.addState("-hidden");
      };
      const handleLogoLeave = (e: PointerEvent) => {
        const target = (e.target as Element | null)?.closest<HTMLElement>(logoSelector);
        if (!target || target.contains(e.relatedTarget as Node | null)) return;
        cursor?.removeState("-hidden");
      };
      document.addEventListener("pointerover", handleLogoEnter);
      document.addEventListener("pointerout", handleLogoLeave);

      // Cleanup function for logo handlers
      const cleanupLogo = () => {
        document.removeEventListener("pointerover", handleLogoEnter);
        document.removeEventListener("pointerout", handleLogoLeave);
      };
      cursor.__logoCleanup = cleanupLogo;
    };

    const sync = () => {
      if (pointerQuery.matches && !motionQuery.matches) void create();
      else destroy();
    };

    pointerQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    sync();

    return () => {
      disposed = true;
      pointerQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
      destroy();
    };
  }, []);

  return children;
}
