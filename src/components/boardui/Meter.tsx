export function Meter({
  label,
  value,
  max = 100,
  min = 0,
  valueText,
  className = "",
}: {
  label: string;
  value: number;
  max?: number;
  min?: number;
  valueText?: string;
  className?: string;
}) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={`space-y-1.5 font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between text-neutral-400">
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
        <span className="text-white font-medium">{valueText ?? `${value} / ${max}`}</span>
      </div>

      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-900 border border-neutral-800"
      >
        <div
          className="h-full bg-neutral-300 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
