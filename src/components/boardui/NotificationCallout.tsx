import React from "react";

export type NotificationLevel = "info" | "warning" | "verified";

const levelStyles: Record<
  NotificationLevel,
  { border: string; bg: string; titleColor: string; label: string }
> = {
  info: {
    border: "border-neutral-800",
    bg: "bg-neutral-950/60",
    titleColor: "text-neutral-300",
    label: "Notice",
  },
  warning: {
    border: "border-amber-900/50",
    bg: "bg-amber-950/20",
    titleColor: "text-amber-300",
    label: "Scope Note",
  },
  verified: {
    border: "border-sky-900/50",
    bg: "bg-sky-950/20",
    titleColor: "text-sky-300",
    label: "Verified Evidence",
  },
};

export function NotificationCallout({
  level = "info",
  title,
  children,
  className = "",
}: {
  level?: NotificationLevel;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cfg = levelStyles[level];

  return (
    <div
      role="note"
      className={`rounded-lg border ${cfg.border} ${cfg.bg} p-4 font-mono text-xs ${className}`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-[10px] uppercase tracking-wider font-semibold ${cfg.titleColor}`}>
          {cfg.label}
        </span>
        {title && <span className="text-white font-medium">— {title}</span>}
      </div>
      <div className="font-sans text-xs text-neutral-300 leading-relaxed">{children}</div>
    </div>
  );
}
