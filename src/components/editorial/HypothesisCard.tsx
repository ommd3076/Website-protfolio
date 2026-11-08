export interface HypothesisStage {
  step: string;
  title: string;
  observation: string;
  hypothesis: string;
  empiricalTest: string;
  outcome: string;
}

export function HypothesisCard({
  stage,
  className = "",
}: {
  stage: HypothesisStage;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-950/70 p-6 font-sans space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          Stage {stage.step}
        </span>
        <span className="font-mono text-[11px] text-neutral-400">Hypothesis Validation</span>
      </div>

      <h3 className="font-serif text-lg font-normal text-white tracking-tight">{stage.title}</h3>

      <div className="grid gap-3 text-xs leading-relaxed font-sans sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/30 p-3.5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
            01 · Observation
          </span>
          <p className="text-neutral-300">{stage.observation}</p>
        </div>

        <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/30 p-3.5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
            02 · Testable Hypothesis
          </span>
          <p className="text-neutral-300">{stage.hypothesis}</p>
        </div>

        <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/30 p-3.5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
            03 · Empirical Test
          </span>
          <p className="text-neutral-300">{stage.empiricalTest}</p>
        </div>

        <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/30 p-3.5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
            04 · Verified Outcome
          </span>
          <p className="text-neutral-300">{stage.outcome}</p>
        </div>
      </div>
    </div>
  );
}
