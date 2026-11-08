export interface Milestone {
  date: string;
  title: string;
  description: string;
  status: "verified" | "presented" | "ongoing" | "archived";
}

const statusBadges: Record<Milestone["status"], { label: string; className: string }> = {
  verified: {
    label: "Accepted",
    className: "border-sky-500/40 bg-sky-950/40 text-sky-300",
  },
  presented: {
    label: "Presented",
    className: "border-emerald-500/40 bg-emerald-950/40 text-emerald-300",
  },
  ongoing: {
    label: "Active Focus",
    className: "border-indigo-500/40 bg-indigo-950/40 text-indigo-300",
  },
  archived: {
    label: "Retrospective",
    className: "border-neutral-700 bg-neutral-900 text-neutral-400",
  },
};

export function TimelineStepTracker({
  milestones,
  className = "",
}: {
  milestones: readonly Milestone[];
  className?: string;
}) {
  return (
    <div className={`space-y-6 font-mono text-xs ${className}`}>
      <div className="relative border-l border-neutral-800 ml-3 pl-6 space-y-8">
        {milestones.map((m, idx) => {
          const badge = statusBadges[m.status];
          return (
            <div key={idx} className="relative group">
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border border-neutral-700 bg-neutral-900 group-hover:border-white transition-colors" />

              <div className="flex flex-wrap items-center gap-3">
                <time className="text-neutral-400 font-semibold">{m.date}</time>
                <span
                  className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>

              <h4 className="mt-1.5 font-serif text-base font-normal text-white">{m.title}</h4>

              <p className="mt-1 font-sans text-xs text-neutral-300 leading-relaxed max-w-xl">
                {m.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
