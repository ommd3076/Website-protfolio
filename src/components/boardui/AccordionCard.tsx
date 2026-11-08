import React, { useState } from "react";

export interface AccordionCardItem {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export function AccordionCard({
  items,
  className = "",
}: {
  items: readonly AccordionCardItem[];
  className?: string;
}) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [items[0]?.id ?? ""]: true,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-neutral-950 ${className}`}
    >
      {items.map((item) => {
        const isOpen = Boolean(openIds[item.id]);
        return (
          <div key={item.id} className="p-4 md:p-5">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-baseline justify-between gap-4 text-left font-serif text-base text-white hover:text-neutral-300 transition-colors"
            >
              <div>
                <span className="font-normal">{item.title}</span>
                {item.subtitle && (
                  <span className="block font-mono text-xs text-neutral-400 font-normal mt-0.5">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-neutral-400 select-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="mt-4 pt-3 border-t border-neutral-800/60 font-sans text-xs text-neutral-300 leading-relaxed space-y-2">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
