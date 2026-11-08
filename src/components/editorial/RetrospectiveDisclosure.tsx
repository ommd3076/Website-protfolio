export interface RetrospectiveProps {
  projectTitle: string;
  context: string;
  initialAssumption: string;
  operationalReality: string;
  architecturalLesson: string;
  className?: string;
}

export function RetrospectiveDisclosure({
  projectTitle,
  context,
  initialAssumption,
  operationalReality,
  architecturalLesson,
  className = "",
}: RetrospectiveProps) {
  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 md:p-8 space-y-6 ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-800 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Candid Retrospective
          </span>
          <h3 className="font-serif text-xl font-normal text-white tracking-tight mt-1">
            {projectTitle}
          </h3>
        </div>
        <span className="font-mono text-xs text-neutral-400">{context}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2 border-l border-neutral-800 pl-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            01 · Initial Assumption
          </span>
          <p className="text-xs font-serif leading-relaxed text-neutral-300">{initialAssumption}</p>
        </div>

        <div className="space-y-2 border-l border-amber-900/60 pl-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-medium">
            02 · Operational Reality
          </span>
          <p className="text-xs font-serif leading-relaxed text-neutral-300">
            {operationalReality}
          </p>
        </div>

        <div className="space-y-2 border-l border-emerald-900/60 pl-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-medium">
            03 · Architectural Lesson
          </span>
          <p className="text-xs font-serif leading-relaxed text-neutral-200 font-medium">
            {architecturalLesson}
          </p>
        </div>
      </div>
    </div>
  );
}
