import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReduced } from "./motion";

interface ChunkyPixel {
  col: number;
  row: number;
  targetX: number;
  targetY: number;
  currX: number;
  currY: number;
  color: string;
  size: number;
  isAccent?: boolean;
}

export function DeterministicPixelParticles({
  className = "",
  width = 480,
  height = 300,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<ChunkyPixel[]>([]);

  // Stable mutable perturbation ref: NEVER reallocated, preventing orphaned GSAP tweens
  const perturbTarget = useRef<{ x: number; y: number; strength: number }>({
    x: 0,
    y: 0,
    strength: 0,
  });

  const { contextSafe } = useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const isReduced = prefersReduced();

      // =========================================================================
      // ETHIACK-CUE SOLID MINT PIXEL MATRIX (24 columns x 15 rows)
      // Stride = 16px (14px solid square pixel + 2px spacing)
      // Total silhouette span: 384px wide (80% of 480) x 240px tall (80% of 300)
      // =========================================================================
      const COLS = 24;
      const ROWS = 15;
      const PIXEL_SIZE = 14;
      const STRIDE = 16;
      const startX = Math.round((width - COLS * STRIDE) / 2);
      const startY = Math.round((height - ROWS * STRIDE) / 2);

      // Colors matching Screenshot 1 (Ethiack mint, pale cyan, titanium white)
      const C_MINT = "#a3e6cd";
      const C_MINT_LIGHT = "#bbf7d0";
      const C_MINT_BRIGHT = "#6ee7b7";
      const C_WHITE = "#ffffff";
      const C_TEAL = "#2dd4bf";

      // 24x15 Bitmap Matrix defining an authored, monolithic asymmetric pixel structure:
      // Solid stepped slabs, vertical pylons, and deliberate negative-space lightwells.
      // 1 = solid mint pixel, 2 = bright highlight, 3 = titanium white accent, 0 = negative space
      const BITMAP: number[][] = [
        // Row 0: Apex spires and asymmetric crowns
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 3, 3, 0, 0],
        // Row 1: Upper lintel connection
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 0],
        // Row 2: Broad horizontal canopy
        [0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1, 3, 3, 1, 0],
        // Row 3: Solid upper tier with central notch
        [0, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 2, 2, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 0],
        // Row 4: Stepped shelf
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        // Row 5: Asymmetric cantilever (heavy on left, open on center-right)
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        // Row 6: Massive central cross-beam spanning full width
        [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
        // Row 7: Solid mid-terrace with carved interior courtyard
        [1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
        // Row 8: Stepped pillars framing the courtyard
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // Row 9: Lower lintel joining pillars
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // Row 10: Heavy stepped pedestal
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        // Row 11: Stepped foundation
        [0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0],
        // Row 12: Base supports with asymmetric footing
        [0, 0, 0, 1, 1, 2, 2, 1, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0],
        // Row 13: Ground terrace
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        // Row 14: Monolithic footers
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      ];

      const pixels: ChunkyPixel[] = [];

      for (let r = 0; r < ROWS; r++) {
        const rowData = BITMAP[r];
        if (!rowData) continue;
        for (let c = 0; c < COLS; c++) {
          const val = rowData[c];
          if (!val || val === 0) continue;

          const tx = startX + c * STRIDE;
          const ty = startY + r * STRIDE;

          let color = C_MINT;
          let isAccent = false;
          if (val === 2) {
            color = C_MINT_BRIGHT;
          } else if (val === 3) {
            color = C_WHITE;
            isAccent = true;
          } else if ((r + c) % 5 === 0) {
            color = C_TEAL;
          } else if ((r + c) % 7 === 0) {
            color = C_MINT_LIGHT;
          }

          // Scattered initial positions for entrance
          const angle = (c * 17 + r * 31) * 0.2;
          const dist = 40 + ((c * 7 + r * 11) % 60);
          const initX = tx + Math.cos(angle) * dist;
          const initY = ty + Math.sin(angle) * dist;

          pixels.push({
            col: c,
            row: r,
            targetX: tx,
            targetY: ty,
            currX: isReduced ? tx : initX,
            currY: isReduced ? ty : initY,
            color,
            size: PIXEL_SIZE,
            isAccent,
          });
        }
      }

      pixelsRef.current = pixels;

      // Draw routine
      const render = () => {
        ctx.clearRect(0, 0, width, height);

        const pt = perturbTarget.current;
        const pxOff = pt.x * pt.strength;
        const pyOff = pt.y * pt.strength;

        for (const p of pixels) {
          // Bounded displacement with subtle parallax by row
          const factor = 0.4 + (p.row / ROWS) * 0.6;
          const drawX = Math.round(p.currX + pxOff * factor);
          const drawY = Math.round(p.currY + pyOff * factor);

          ctx.fillStyle = p.color;
          ctx.fillRect(drawX, drawY, p.size, p.size);

          // Subtle bright core on white accent pixels
          if (p.isAccent) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(drawX + 3, drawY + 3, p.size - 6, p.size - 6);
          }
        }
      };

      // Entrance animation: Assemble once and hold
      if (!isReduced) {
        gsap.to(pixels, {
          currX: (_i: number, target: ChunkyPixel) => target.targetX,
          currY: (_i: number, target: ChunkyPixel) => target.targetY,
          duration: 1.1,
          stagger: 0.003,
          ease: "expo.out",
          onUpdate: render,
          onComplete: () => {
            for (const p of pixels) {
              p.currX = p.targetX;
              p.currY = p.targetY;
            }
            render();
          },
        });
      } else {
        render();
      }

      // Cleanup
      return () => {
        gsap.killTweensOf(pixels);
        gsap.killTweensOf(perturbTarget.current);
        if (canvas) {
          canvas.width = 0;
          canvas.height = 0;
        }
      };
    },
    { scope: containerRef },
  );

  // Bounded pointer perturbation: Uses stable mutable ref and single tween
  const handlePointerMove = contextSafe((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced() || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    const target = perturbTarget.current;
    gsap.killTweensOf(target);

    target.x = relX * 16;
    target.y = relY * 12;

    gsap.to(target, {
      strength: 1,
      duration: 0.2,
      ease: "power2.out",
      onUpdate: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const pt = perturbTarget.current;
        const pxOff = pt.x * pt.strength;
        const pyOff = pt.y * pt.strength;

        const pixels = pixelsRef.current;
        for (const p of pixels) {
          const factor = 0.4 + (p.row / 15) * 0.6;
          const drawX = Math.round(p.currX + pxOff * factor);
          const drawY = Math.round(p.currY + pyOff * factor);

          ctx.fillStyle = p.color;
          ctx.fillRect(drawX, drawY, p.size, p.size);

          if (p.isAccent) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(drawX + 3, drawY + 3, p.size - 6, p.size - 6);
          }
        }
        ctx.restore();
      },
      onComplete: () => {
        gsap.to(target, {
          strength: 0,
          duration: 0.5,
          ease: "power3.out",
          onUpdate: () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            ctx.save();
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            const pt = perturbTarget.current;
            const pxOff = pt.x * pt.strength;
            const pyOff = pt.y * pt.strength;

            const pixels = pixelsRef.current;
            for (const p of pixels) {
              const factor = 0.4 + (p.row / 15) * 0.6;
              const drawX = Math.round(p.currX + pxOff * factor);
              const drawY = Math.round(p.currY + pyOff * factor);

              ctx.fillStyle = p.color;
              ctx.fillRect(drawX, drawY, p.size, p.size);
            }
            ctx.restore();
          },
        });
      },
    });
  });

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`relative inline-block touch-none select-none ${className}`}
      style={{ width, height }}
      aria-label="Authored solid mint pixel systems architecture silhouette"
    >
      <canvas
        ref={canvasRef}
        style={{ width, height }}
        className="block"
        role="img"
        aria-label="Authored chunky mint pixel silhouette"
      />
    </div>
  );
}
