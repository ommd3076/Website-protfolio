export interface ArchivalMetadata {
  date: string;
  revision?: string;
  verificationTier?:
    "peer-reviewed" | "conference-accepted" | "empirical-benchmark" | "retrospective";
  readingEstimate?: string;
  scope?: string;
}

const tierLabels: Record<
  NonNullable<ArchivalMetadata["verificationTier"]>,
  { label: string; badgeClass: string }
> = {
  "peer-reviewed": {
    label: "Peer-Reviewed",
    badgeClass: "border-emerald-500/30 bg-emerald-950/40 text-emerald-300",
  },
  "conference-accepted": {
    label: "Accepted for Presentation",
    badgeClass: "border-sky-500/30 bg-sky-950/40 text-sky-300",
  },
  "empirical-benchmark": {
    label: "Empirical Prototype",
    badgeClass: "border-amber-500/30 bg-amber-950/40 text-amber-300",
  },
  retrospective: {
    label: "Candid Retrospective",
    badgeClass: "border-neutral-700 bg-neutral-900/60 text-neutral-400",
  },
};

export function ArchivalMetadataRow({
  metadata,
  className = "",
}: {
  metadata: ArchivalMetadata;
  className?: string;
}) {
  const tier = metadata.verificationTier ? tierLabels[metadata.verificationTier] : null;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-neutral-800/80 pb-3 font-mono text-[11px] text-neutral-500 ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-neutral-400">Date:</span>
        <time dateTime={metadata.date} className="text-neutral-300">
          {metadata.date}
        </time>
      </div>

      {tier && (
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">Status:</span>
          <span
            className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium border ${tier.badgeClass}`}
          >
            {tier.label}
          </span>
        </div>
      )}

      {metadata.readingEstimate && (
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">Read:</span>
          <span className="text-neutral-300">{metadata.readingEstimate}</span>
        </div>
      )}

      {metadata.revision && (
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">Rev:</span>
          <code className="text-neutral-300">{metadata.revision}</code>
        </div>
      )}

      {metadata.scope && (
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-neutral-400">
          <span>Scope: {metadata.scope}</span>
        </div>
      )}
    </div>
  );
}
