import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2 | 3;
}

interface TableOfContentsProps {
  items: readonly TocItem[];
  className?: string;
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0% -60% 0%",
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Table of contents"
      className={`space-y-3 font-mono text-xs text-neutral-400 ${className}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
        Contents
      </p>
      <ul className="space-y-1.5 border-l border-neutral-800 pl-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 2 ? "pl-2" : ""}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`text-left transition-colors duration-200 block w-full truncate py-0.5 ${
                  isActive
                    ? "text-white font-medium -ml-[13px] border-l-2 border-white pl-2.5"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
