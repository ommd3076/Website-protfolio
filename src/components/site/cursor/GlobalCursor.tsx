import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorState = "default" | "action" | "media" | "contained" | "native";

const ACTION_SELECTOR = "a,button,[role='button'],summary";
const NATIVE_SELECTOR =
  "input,textarea,select,iframe,[contenteditable='true'],[data-cursor='native']";
const TEXT_SELECTOR = "h1,h2,h3,h4,p,li,blockquote,figcaption";

function resolveCursorState(target: Element | null): {
  state: CursorState;
  label: string;
  tone: string;
} {
  if (!target) return { state: "default", label: "", tone: "" };
  const explicit = target.closest<HTMLElement>("[data-cursor]");
  const cursor = explicit?.dataset["cursor"];

  if (cursor === "hidden" || cursor === "native" || target.closest(NATIVE_SELECTOR)) {
    return { state: "native", label: "", tone: "" };
  }
  if (cursor === "cta") return { state: "contained", label: "", tone: "" };
  if (cursor === "media") {
    return {
      state: "media",
      label: explicit?.dataset["cursorLabel"] ?? "VIEW",
      tone: explicit?.dataset["cursorTone"] ?? "dark",
    };
  }
  if (cursor === "action" || cursor === "pointer" || target.closest(ACTION_SELECTOR)) {
    return { state: "action", label: "", tone: "" };
  }
  if (target.closest(TEXT_SELECTOR)) return { state: "native", label: "", tone: "" };
  return { state: "default", label: "", tone: "" };
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [tone, setTone] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const visual = visualRef.current;
    if (!cursor || !visual) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = false;
    let positioned = false;
    let cleanupListeners: (() => void) | undefined;

    const enable = () => {
      if (active || !pointerQuery.matches || motionQuery.matches) return;
      active = true;
      document.documentElement.classList.add("has-custom-cursor");
      gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

      const move = (event: PointerEvent) => {
        if (!positioned) {
          positioned = true;
          gsap.set(cursor, { x: event.clientX, y: event.clientY, opacity: 1 });
        } else {
          xTo(event.clientX);
          yTo(event.clientY);
        }
        const next = resolveCursorState(document.elementFromPoint(event.clientX, event.clientY));
        setState(next.state);
        setLabel(next.label);
        setTone(next.tone);
      };
      const press = () => gsap.to(visual, { scale: 0.88, duration: 0.12, overwrite: true });
      const release = () => gsap.to(visual, { scale: 1, duration: 0.2, ease: "power3.out" });
      const hide = () => gsap.to(cursor, { opacity: 0, duration: 0.16, overwrite: true });
      const show = () => positioned && gsap.to(cursor, { opacity: 1, duration: 0.18 });
      const visibility = () => (document.hidden ? hide() : show());

      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerdown", press, { passive: true });
      window.addEventListener("pointerup", release, { passive: true });
      window.addEventListener("pointercancel", release, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      document.documentElement.addEventListener("pointerenter", show);
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", visibility);

      cleanupListeners = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerdown", press);
        window.removeEventListener("pointerup", release);
        window.removeEventListener("pointercancel", release);
        document.documentElement.removeEventListener("pointerleave", hide);
        document.documentElement.removeEventListener("pointerenter", show);
        window.removeEventListener("blur", hide);
        document.removeEventListener("visibilitychange", visibility);
      };
    };

    const disable = () => {
      if (!active) return;
      active = false;
      positioned = false;
      cleanupListeners?.();
      cleanupListeners = undefined;
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.killTweensOf([cursor, visual]);
      gsap.set(cursor, { opacity: 0 });
      setState("default");
      setLabel("");
      setTone("");
    };
    const sync = () => {
      if (pointerQuery.matches && !motionQuery.matches) enable();
      else disable();
    };

    pointerQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    sync();
    return () => {
      pointerQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return (
    <>
      {children}
      <div
        ref={cursorRef}
        className="site-cursor"
        data-state={state}
        data-tone={tone || undefined}
        aria-hidden="true"
      >
        <div ref={visualRef} className="site-cursor__visual">
          <span className="site-cursor__dot" />
          <span className="site-cursor__label">{label}</span>
        </div>
      </div>
    </>
  );
}
