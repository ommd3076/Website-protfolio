import { useEffect, useState } from "react";
import { Kbd } from "../boardui/Kbd";

export interface CommandItem {
  id: string;
  label: string;
  category: "Sections" | "Research & Projects" | "Actions";
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: CommandItem[] = [
    {
      id: "sec-top",
      label: "Jump to: Top of Page (#top)",
      category: "Sections",
      shortcut: "T",
      onSelect: () => {
        window.location.hash = "#top";
      },
    },
    {
      id: "sec-work",
      label: "Jump to: Selected Work (#work)",
      category: "Sections",
      shortcut: "W",
      onSelect: () => {
        window.location.hash = "#work";
      },
    },
    {
      id: "sec-about",
      label: "Jump to: Background & Methodology (#about)",
      category: "Sections",
      shortcut: "A",
      onSelect: () => {
        window.location.hash = "#about";
      },
    },
    {
      id: "sec-contact",
      label: "Jump to: Direct Contact (#contact)",
      category: "Sections",
      shortcut: "C",
      onSelect: () => {
        window.location.hash = "#contact";
      },
    },
    {
      id: "proj-prism",
      label: "PRISM: Local-First Model Inference",
      category: "Research & Projects",
      onSelect: () => {
        window.location.hash = "#work";
      },
    },
    {
      id: "proj-drl",
      label: "Deep RL: Policy Optimization (IEEE AIEI)",
      category: "Research & Projects",
      onSelect: () => {
        window.location.hash = "#work";
      },
    },
    {
      id: "proj-cerenetics",
      label: "Cerenetics: Applied Software Solutions",
      category: "Research & Projects",
      onSelect: () => {
        window.location.hash = "#work";
      },
    },
    {
      id: "proj-eva",
      label: "Project EVA: Hackathon Retrospective",
      category: "Research & Projects",
      onSelect: () => {
        window.location.hash = "#work";
      },
    },
    {
      id: "act-copy-email",
      label: "Copy Email: ommd3076@gmail.com",
      category: "Actions",
      shortcut: "E",
      onSelect: () => {
        navigator.clipboard?.writeText("ommd3076@gmail.com");
      },
    },
    {
      id: "act-github",
      label: "Open GitHub Profile (@ommd3076) ↗",
      category: "Actions",
      shortcut: "G",
      onSelect: () => {
        window.open("https://github.com/ommd3076", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "act-linkedin",
      label: "Open LinkedIn Profile (Om M. Doddamani) ↗",
      category: "Actions",
      shortcut: "L",
      onSelect: () => {
        window.open("https://www.linkedin.com/in/om-m-doddamani/", "_blank", "noopener,noreferrer");
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].onSelect();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filtered, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[150] flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-950 p-4 shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 px-2">
          <span className="text-neutral-500">⌘</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, route, or project name..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <Kbd>Esc</Kbd>
        </div>

        <div className="mt-3 max-h-72 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-neutral-500">
              No matching commands or projects.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect();
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                    isSelected
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-300 hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                      [{item.category}]
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.shortcut && <Kbd>{item.shortcut}</Kbd>}
                </button>
              );
            })
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500 px-2">
          <span>Use ↑ ↓ to navigate</span>
          <span>↵ to execute</span>
        </div>
      </div>
    </div>
  );
}
