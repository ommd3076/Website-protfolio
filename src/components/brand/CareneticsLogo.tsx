import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export type LogoMode = "static" | "reveal" | "reactive";

export interface CareneticsLogoRef {
  /** Trigger or replay the reveal sequence timeline */
  playReveal: () => void;
  /** Instantly reset to neutral resting state */
  reset: () => void;
  /** Pulse/rotate the starburst accent */
  pulseStarburst: () => void;
  /** The container SVG element */
  svgElement: SVGSVGElement | null;
}

export interface CareneticsLogoProps extends React.SVGProps<SVGSVGElement> {
  /** Motion mode: "static" (zero animation overhead), "reveal" (entrance sequence), "reactive" (micro hover/proximity response) */
  mode?: LogoMode;
  /** Primary color for frame and crescents. Defaults to "currentColor" */
  color?: string;
  /** Accent color for starburst. Defaults to color or theme accent */
  accentColor?: string;
  /** Secondary fill color if needed */
  secondaryColor?: string;
  /** Display size in pixels or CSS units (e.g. 32, "2rem", "100%") */
  size?: number | string;
  /** Auto-start reveal timeline on mount (Reveal mode only). Defaults to true */
  autoPlay?: boolean;
  /** Callback fired when reveal sequence finishes */
  onRevealComplete?: () => void;
}

// Exact Path Math from Source-of-Truth SVG Asset (782x618 viewBox)
export const CARENETICS_PATHS = {
  // 1. Outer Square Frame with Inner Rectangular Cutout Void
  outerFrame:
    "M0.16 0.16C260.72 0.16 521.28 0.16 781.84 0.16C781.84 206.13 781.84 412.11 781.84 618.08C521.28 618.08 260.72 618.08 0.16 618.08C0.16 412.11 0.16 206.13 0.16 0.16ZM293.01 172.57C403.17 172.57 513.33 172.57 623.49 172.57C623.49 282.78 623.49 392.99 623.49 503.19C513.33 503.19 403.17 503.19 293.01 503.19C293.01 392.99 293.01 282.78 293.01 172.57Z",

  // 2. Large Crescent Outer Arc Form
  largeCrescent:
    "M320.34 108.22C319.46 108.94 318.57 109.65 317.69 110.37C314.7 109.21 312.24 106.42 309.59 104.58C305.18 101.51 300.48 98.62 295.57 96.37C280.83 89.59 264.07 86.73 247.87 88.27C236.05 89.39 224.51 93.36 214 98.77C204.68 103.58 196.69 109.2 189.21 116.55C141 163.93 171.87 241.16 215.24 280.18C231.04 294.4 250.33 304.99 271.44 308.25C277.22 309.14 283.85 310.4 289.66 309.44C289.66 262.87 289.66 216.31 289.66 169.75C293.98 167.82 308.95 169.1 314.51 169.1C334.19 169.1 353.87 169.1 373.54 169.1C433 169.1 492.45 169.1 551.91 169.1C569.26 169.1 586.61 169.1 603.96 169.1C610.05 169.1 621.58 167.6 626.91 169.73C626.91 281.73 626.91 393.74 626.91 505.74C622.23 507.64 603.21 506.37 596.97 506.37C573.91 506.37 550.85 506.37 527.79 506.37C475.1 506.37 422.42 506.37 369.74 506.37C352.18 506.37 334.61 506.37 317.05 506.37C307.99 506.37 298.69 506.95 289.66 506.21C289.66 445.27 289.66 384.34 289.66 323.4C283.98 323.61 274.69 326.92 268.18 327.68C253.23 329.45 237.73 328.54 223.19 324.82C167.42 310.56 131.43 240.55 142.03 186.29C152.36 133.43 191.29 98.52 239.95 79.67C253.14 74.56 266.59 71.07 280.5 68.84C284.96 68.13 295.45 66.57 299.48 68.35C302.07 69.49 303.99 75.41 305.25 77.8C308.71 84.35 311.94 91.01 315.27 97.61C316.97 100.97 319.54 104.58 320.34 108.22Z",

  // 3. Inner Arc Form
  innerArc:
    "M376.72 212.82C381.64 223.02 384.02 234.53 388.12 245.08C389.22 247.92 393.11 255.72 392.58 258.58C392.24 260.35 389.6 262.43 388.41 263.69C384.14 268.2 379.96 272.51 375.28 276.59C355.72 293.59 325.54 312.31 300.55 319.5C298.98 316.99 299.54 312.29 299.91 309.32C303.42 307.08 316.45 304.92 321.97 302.59C340.08 294.91 355.53 283.14 364.65 265.34C371.03 252.9 373.44 238.26 373.1 224.38C372.99 220.05 370.53 212.51 376.72 212.82Z",

  // 4. Starburst Accent Form
  starburstAccent:
    "M499.22 338.38C502.19 345.04 505.15 351.7 508.11 358.35C511.07 351.68 514.03 345.01 517 338.34C523.55 340.96 530.11 343.59 536.67 346.22C534.13 353.12 531.59 360.03 529.06 366.94C536.14 366 542.91 359.38 550 359.42C552.63 365.82 555.26 372.22 557.9 378.62C551.07 381.58 544.25 384.55 537.42 387.51C541.71 392.4 552.61 392.74 557.75 397.03C554.95 403.63 552.16 410.22 549.37 416.82C542.57 414.03 535.77 411.24 528.97 408.46C531.54 415.38 534.11 422.31 536.67 429.23C534.02 431.58 520.45 437.09 517 437.06C514.03 430.51 511.07 423.97 508.11 417.43C505.15 423.96 502.19 430.5 499.22 437.04C495.95 437.13 481.93 431.5 479.55 429.19C482.2 422.28 484.86 415.37 487.51 408.46C480.63 411.16 473.74 413.87 466.85 416.58C464.33 413.56 458.64 400.08 459.23 396.4C463.78 394.77 476.05 390.8 478.88 387.51C472.18 384.55 465.49 381.58 458.8 378.62C461.48 372.14 464.17 365.65 466.85 359.16C473.62 361.82 480.39 364.47 487.16 367.13C484.62 360.17 482.08 353.21 479.54 346.25C486.1 343.63 492.66 341.01 499.22 338.38Z",
};

export const CareneticsLogo = forwardRef<CareneticsLogoRef, CareneticsLogoProps>(
  (
    {
      mode = "static",
      color = "currentColor",
      accentColor,
      secondaryColor,
      size,
      autoPlay = true,
      onRevealComplete,
      className = "",
      style,
      ...props
    },
    ref,
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const frameRef = useRef<SVGGElement>(null);
    const crescentRef = useRef<SVGGElement>(null);
    const innerArcRef = useRef<SVGGElement>(null);
    const starburstRef = useRef<SVGGElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const pulseRef = useRef<gsap.core.Tween | null>(null);
    const reactiveCleanupRef = useRef<(() => void) | null>(null);

    // Color defaults
    const mainFill = color;
    const starburstFill = accentColor || color;
    const secondaryFill = secondaryColor || color;

    // Imperative control handle
    useImperativeHandle(ref, () => ({
      playReveal: () => {
        if (timelineRef.current) {
          timelineRef.current.restart();
        }
      },
      reset: () => {
        timelineRef.current?.pause();
        pulseRef.current?.kill();
        gsap.set([frameRef.current, crescentRef.current, innerArcRef.current], {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
        });
        gsap.set(starburstRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
        });
      },
      pulseStarburst: () => {
        if (
          starburstRef.current &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          pulseRef.current?.kill();
          pulseRef.current = gsap.to(starburstRef.current, {
            rotation: "+=45",
            scale: 1.15,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
            transformOrigin: "508.35px 387.7px",
          });
        }
      },
      get svgElement() {
        return svgRef.current;
      },
    }));

    // Animation & Motion management
    useEffect(() => {
      const svg = svgRef.current;
      const frame = frameRef.current;
      const crescent = crescentRef.current;
      const innerArc = innerArcRef.current;
      const starburst = starburstRef.current;

      if (!svg || !frame || !crescent || !innerArc || !starburst) return;

      // Check reduced motion preference
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (mode === "static" || isReduced) {
        // Clear any inline styles from previous animations
        gsap.set([frame, crescent, innerArc, starburst], { clearProps: "all" });
        return;
      }

      const ctx = gsap.context(() => {
        if (mode === "reveal") {
          // Set transform origins
          gsap.set(frame, { transformOrigin: "391px 309px" });
          gsap.set(crescent, { transformOrigin: "384px 287px" });
          gsap.set(innerArc, { transformOrigin: "346px 266px" });
          gsap.set(starburst, { transformOrigin: "508.35px 387.7px" });

          // Restrained premium reveal timeline sequence
          const tl = gsap.timeline({
            paused: !autoPlay,
            onComplete: () => {
              onRevealComplete?.();
            },
          });

          timelineRef.current = tl;

          // 0. Setup hidden states
          tl.set([frame, crescent, innerArc, starburst], { opacity: 0 });

          // 1. Frame draws/fades in first
          tl.fromTo(
            frame,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
            0,
          );

          // 2. Large crescent arc reveals second with graceful curve entry
          tl.fromTo(
            crescent,
            { opacity: 0, scale: 0.92, y: -12 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power4.out" },
            0.22,
          );

          // 3. Inner arc reveals third
          tl.fromTo(
            innerArc,
            { opacity: 0, scale: 0.9, x: -8 },
            { opacity: 1, scale: 1, x: 0, duration: 0.55, ease: "power3.out" },
            0.42,
          );

          // 4. Starburst accent appears last with a tiny rotate pop
          tl.fromTo(
            starburst,
            { opacity: 0, scale: 0.2, rotation: -35 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.8)" },
            0.62,
          );
        } else if (mode === "reactive") {
          // Reset to full visibility
          gsap.set([frame, crescent, innerArc, starburst], {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
          });
          gsap.set(starburst, { transformOrigin: "508.35px 387.7px" });
          gsap.set(innerArc, { transformOrigin: "346px 266px" });
          gsap.set(crescent, { transformOrigin: "384px 287px" });

          const onPointerEnter = () => {
            gsap.to(starburst, {
              rotation: 22.5,
              scale: 1.12,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(innerArc, {
              x: 3,
              y: -2,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(crescent, {
              scale: 1.01,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const onPointerLeave = () => {
            gsap.to(starburst, {
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
            gsap.to(innerArc, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
            gsap.to(crescent, {
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          const parent = svg.parentElement;
          if (parent) {
            parent.addEventListener("pointerenter", onPointerEnter);
            parent.addEventListener("pointerleave", onPointerLeave);
            reactiveCleanupRef.current = () => {
              parent.removeEventListener("pointerenter", onPointerEnter);
              parent.removeEventListener("pointerleave", onPointerLeave);
            };
          }
        }
      }, svg);

      return () => {
        reactiveCleanupRef.current?.();
        reactiveCleanupRef.current = null;
        pulseRef.current?.kill();
        pulseRef.current = null;
        timelineRef.current = null;
        ctx.revert();
      };
    }, [mode, autoPlay, onRevealComplete]);

    // Handle width & height formatting
    const computedWidth = size ? (typeof size === "number" ? `${size}px` : size) : undefined;
    const computedHeight = size
      ? typeof size === "number"
        ? `${Math.round(size * (618 / 782))}px`
        : "auto"
      : undefined;

    return (
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 782 618"
        width={computedWidth || props.width || "782"}
        height={computedHeight || props.height || "618"}
        className={`carenetics-logo select-none inline-block vector-effect-non-scaling-stroke ${className}`}
        style={{
          aspectRatio: "782/618",
          maxWidth: "100%",
          height: "auto",
          verticalAlign: "middle",
          ...style,
        }}
        {...props}
      >
        {props["aria-hidden"] !== true && props["aria-hidden"] !== "true" && (
          <title>Carenetics</title>
        )}
        {/* 1. Outer Square Frame */}
        <g ref={frameRef} data-part="outer-frame" className="carenetics-part-frame">
          <path
            d={CARENETICS_PATHS.outerFrame}
            fill={mainFill}
            fillRule="evenodd"
            stroke={mainFill}
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
        </g>

        {/* 2. Large Crescent Arc Form */}
        <g ref={crescentRef} data-part="large-crescent" className="carenetics-part-crescent">
          <path
            d={CARENETICS_PATHS.largeCrescent}
            fill={secondaryFill}
            fillRule="evenodd"
            stroke={secondaryFill}
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
        </g>

        {/* 3. Inner Arc Form */}
        <g ref={innerArcRef} data-part="inner-arc" className="carenetics-part-inner-arc">
          <path
            d={CARENETICS_PATHS.innerArc}
            fill={secondaryFill}
            fillRule="evenodd"
            stroke={secondaryFill}
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
        </g>

        {/* 4. Starburst Accent Form */}
        <g ref={starburstRef} data-part="starburst-accent" className="carenetics-part-starburst">
          <path
            d={CARENETICS_PATHS.starburstAccent}
            fill={starburstFill}
            fillRule="evenodd"
            stroke={starburstFill}
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  },
);

CareneticsLogo.displayName = "CareneticsLogo";
