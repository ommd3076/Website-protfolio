import React, { useState } from "react";

export function AnnouncementBanner({
  badge,
  message,
  linkText,
  href,
  className = "",
}: {
  badge: string;
  message: string;
  linkText?: string;
  href?: string;
  className?: string;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Recent milestone announcement"
      className={`relative flex items-center justify-between gap-4 border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 font-mono text-xs text-neutral-300 rounded-lg ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white font-medium">
          {badge}
        </span>
        <span className="text-neutral-300">{message}</span>
        {linkText && href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-white underline underline-offset-4 decoration-neutral-600 hover:decoration-white transition-colors"
          >
            {linkText} ↗
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="text-neutral-500 hover:text-white transition-colors px-1"
      >
        ✕
      </button>
    </aside>
  );
}
