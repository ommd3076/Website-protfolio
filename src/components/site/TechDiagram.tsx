import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ensureGsap, prefersReduced } from "./motion";

const nodes = [
  {
    id: "audience",
    x: 90,
    y: 60,
    label: "Audience",
    note: "Who decides, and what they already believe.",
  },
  {
    id: "argument",
    x: 330,
    y: 42,
    label: "Argument",
    note: "The single claim the site has to land.",
  },
  {
    id: "structure",
    x: 330,
    y: 168,
    label: "Structure",
    note: "Sequence, hierarchy, and what never becomes a page.",
  },
  {
    id: "surface",
    x: 570,
    y: 78,
    label: "Surface",
    note: "Type, space, motion — resolved as one system.",
  },
  {
    id: "launch",
    x: 570,
    y: 200,
    label: "Launch",
    note: "The release, then the considered second week.",
  },
];

const links: [string, string][] = [
  ["audience", "argument"],
  ["audience", "structure"],
  ["argument", "surface"],
  ["structure", "surface"],
  ["structure", "launch"],
  ["surface", "launch"],
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

/** Interactive technical diagram of how a Cerenetics engagement resolves. */
export function TechDiagram() {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReduced() || !window.matchMedia("(min-width: 768px)").matches) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      const paths = el.querySelectorAll<SVGPathElement>("[data-diagram-link]");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .to(paths, { strokeDashoffset: 0, duration: 1.05, stagger: 0.08, ease: "power2.inOut" })
        .fromTo(
          el.querySelectorAll("[data-diagram-node]"),
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.46, stagger: 0.055, ease: "power3.out" },
          "-=0.72",
        );
    }, el);
    return () => ctx.revert();
  }, []);

  const current = active ? byId(active) : null;

  return (
    <div ref={scope} className="relative">
      <div className="grid gap-3 md:hidden">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            aria-pressed={active === node.id}
            onClick={() => setActive(active === node.id ? null : node.id)}
            className="border-l border-border py-2 pl-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="block text-sm font-medium">{node.label}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
              {node.note}
            </span>
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 660 260"
        className="hidden w-full md:block"
        aria-label="Interactive engagement diagram"
      >
        {links.map(([a, b]) => {
          const A = byId(a);
          const B = byId(b);
          const on = active === a || active === b;
          return (
            <path
              key={`${a}-${b}`}
              data-diagram-link
              d={`M${A.x} ${A.y} C ${(A.x + B.x) / 2} ${A.y}, ${(A.x + B.x) / 2} ${B.y}, ${B.x} ${B.y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={on ? 1.4 : 0.8}
              className={on ? "text-accent-deep" : "text-border"}
              style={{ transition: "stroke-width .3s" }}
            />
          );
        })}
        {nodes.map((n) => (
          <g
            key={n.id}
            data-diagram-node
            data-cursor="pointer"
            role="button"
            tabIndex={0}
            aria-label={`${n.label}: ${n.note}`}
            className="focus:outline-none focus-visible:outline-2 focus-visible:outline-accent-deep"
            onPointerEnter={() => setActive(n.id)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === n.id ? null : n.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActive(active === n.id ? null : n.id);
              }
            }}
          >
            <circle cx={n.x} cy={n.y} r={16} fill="transparent" />
            <circle
              cx={n.x}
              cy={n.y}
              r={active === n.id ? 5 : 3.4}
              className={active === n.id ? "fill-accent-deep" : "fill-foreground"}
              style={{ transition: "r .3s" }}
            />
            <text
              x={n.x + 12}
              y={n.y + 4}
              className="fill-current text-[10px] tracking-[0.06em] uppercase"
              style={{ fontSize: 9, letterSpacing: "0.14em" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-6 min-h-[3rem] max-w-[46ch] text-[0.88rem] leading-[1.7] text-muted-foreground">
        {current ? current.note : "Select a node — every engagement resolves through these five."}
      </p>
    </div>
  );
}
