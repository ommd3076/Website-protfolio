import React from "react";

export interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  statusBadge?: string;
  trend?: "positive" | "neutral" | "negative";
}

export function StatCard({ stat, className = "" }: { stat: StatItem; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-950/70 p-5 font-mono ${className}`}
    >
      <div className="flex items-center justify-between text-neutral-400">
        <span className="text-[11px] uppercase tracking-wider font-medium">{stat.label}</span>
        {stat.statusBadge && (
          <span className="inline-flex items-center rounded border border-neutral-700 bg-neutral-900/60 px-1.5 py-0.5 text-[10px] text-neutral-300">
            {stat.statusBadge}
          </span>
        )}
      </div>

      <div className="mt-3 text-2xl font-serif text-white tracking-tight">{stat.value}</div>

      {stat.subtext && (
        <div className="mt-1.5 text-xs text-neutral-400 font-sans leading-relaxed">
          {stat.subtext}
        </div>
      )}
    </div>
  );
}

export function StatGrid({
  stats,
  columns = 3,
  className = "",
}: {
  stats: readonly StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-3";

  return (
    <div className={`grid gap-4 ${colClass} ${className}`}>
      {stats.map((s) => (
        <StatCard key={s.id} stat={s} />
      ))}
    </div>
  );
}
