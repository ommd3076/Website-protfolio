import type { ReactNode } from "react";

export interface FilterOption<Value extends string> {
  id: Value;
  label: string;
}

interface FilterGroupProps<Value extends string> {
  label: string;
  options: readonly FilterOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
}

/** Single-select, keyboard-native filter chips adapted from BoardUI TagGroup patterns. */
export function FilterGroup<Value extends string>({
  label,
  options,
  value,
  onChange,
}: FilterGroupProps<Value>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
              selected
                ? "bg-white text-black font-medium"
                : "border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

interface StatusLabelProps {
  children: ReactNode;
}

/** Neutral status chip adapted from BoardUI Chip's compact caption treatment. */
export function StatusLabel({ children }: StatusLabelProps) {
  return (
    <span className="inline-flex max-w-full items-center rounded border border-neutral-700 px-2 py-1 text-xs leading-tight text-neutral-300">
      {children}
    </span>
  );
}
