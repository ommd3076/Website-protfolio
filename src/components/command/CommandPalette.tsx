import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Kbd } from "../boardui/Kbd";

export interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Research & Projects" | "Actions";
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const items: CommandItem[] = [
    {
      id: "nav-home",
      label: "Navigate to Home (/)",
      category: "Navigation",
      shortcut: "H",
      onSelect: () => {
        void navigate({ to: "/" });
        onClose();
      },
    },
    {
      id: "nav-work",
      label: "Navigate to Work (/work) — Systems, Narratives & 27 Repos",
      category: "Navigation",
      shortcut: "W",
      onSelect: () => {
        void navigate({ to: "/work" });
        onClose();
      },
    },
    {
      id: "nav-about",
      label: "Navigate to About (/about) — Background & Principles",
      category: "Navigation",
      shortcut: "A",
      onSelect: () => {
        void navigate({ to: "/about" });
        onClose();
      },
    },
    {
      id: "nav-notes",
      label: "Navigate to Notes (/notes) — Instruments & Capability",
      category: "Navigation",
      shortcut: "N",
      onSelect: () => {
        void navigate({ to: "/notes" });
        onClose();
      },
    },
    {
      id: "nav-contact",
      label: "Navigate to Contact (/contact) — Direct Communication",
      category: "Navigation",
      shortcut: "C",
      onSelect: () => {
        void navigate({ to: "/contact" });
        onClose();
      },
    },
    {
      id: "proj-offline-ai",
      label: "Offline AI: Private On-Device Systems (Work)",
      category: "Research & Projects",
      onSelect: () => {
        void navigate({ to: "/work" });
        onClose();
      },
    },
    {
      id: "proj-drl",
      label: "Deep RL: Policy Optimization IEEE AIEI (Work)",
      category: "Research & Projects",
      onSelect: () => {
        void navigate({ to: "/work" });
        onClose();
      },
    },
    {
      id: "proj-cerenetics",
      label: "Cerenetics: Applied Systems Architecture (Work)",
      category: "Research & Projects",
      onSelect: () => {
        void navigate({ to: "/work" });
        onClose();
      },
    },
    {
      id: "proj-eva",
      label: "Project EVA: Hackathon Retrospective (Work)",
      category: "Research & Projects",
      onSelect: () => {
        void navigate({ to: "/work" });
        onClose();
      },
    },
    {
      id: "act-copy-email",
      label: "Copy Email: ommd3076@gmail.com",
      category: "Actions",
      shortcut: "E",
      onSelect: () => {
        if (navigator.clipboard) {
          void navigator.clipboard.writeText("ommd3076@gmail.com");
        }
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].onSelect();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-[250] flex items-start justify-center bg-black/80 p-4 pt-20 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-3 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center border-b border-neutral-800/80 px-3 pb-3">
          <span className="font-mono text-sm text-neutral-500 mr-2">⌘</span>
          <input
            type="text"
            autoFocus
            placeholder="Type a command, route, or project name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-neutral-500 hover:text-white"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-neutral-500">
              No matching commands or routes found.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onSelect}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-mono text-xs transition-colors ${
                  idx === selectedIndex
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase text-neutral-600 w-24">
                    {item.category}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.shortcut && <Kbd>{item.shortcut}</Kbd>}
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800/60 px-3 pt-2.5 text-[10.5px] font-mono text-neutral-500">
          <span>Navigation & Actions</span>
          <div className="flex items-center gap-2">
            <span>Select: ↵</span>
            <span>Navigate: ↑↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
