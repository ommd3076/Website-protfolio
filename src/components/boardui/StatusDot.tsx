export type StatusState = "active" | "accepted" | "completed" | "discontinued" | "planned";

const statusConfig: Record<StatusState, { label: string; dotClass: string; ping: boolean }> = {
  active: {
    label: "Active Research",
    dotClass: "bg-emerald-400",
    ping: true,
  },
  accepted: {
    label: "Accepted / Verified",
    dotClass: "bg-sky-400",
    ping: false,
  },
  completed: {
    label: "Completed",
    dotClass: "bg-neutral-300",
    ping: false,
  },
  discontinued: {
    label: "Discontinued / Learned",
    dotClass: "bg-amber-400",
    ping: false,
  },
  planned: {
    label: "Planned Horizon",
    dotClass: "bg-indigo-400",
    ping: false,
  },
};

export function StatusDot({
  status,
  showLabel = true,
  className = "",
}: {
  status: StatusState;
  showLabel?: boolean;
  className?: string;
}) {
  const cfg = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] text-neutral-300 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {cfg.ping && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping motion-reduce:hidden ${cfg.dotClass}`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${cfg.dotClass}`} />
      </span>
      {showLabel && <span>{cfg.label}</span>}
    </span>
  );
}
