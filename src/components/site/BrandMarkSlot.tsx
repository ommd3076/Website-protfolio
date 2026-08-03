import { Link } from "@tanstack/react-router";
import logoAsset from "../../../Screenshot 2026-08-03 141135.svg";

export function BrandMarkSlot({
  label = "Carenetics",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label={label}
      data-brand-slot
      data-cursor="pointer"
      className="group flex min-h-9 shrink-0 items-center gap-[9px] rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 md:gap-2.5"
    >
      <img
        src={logoAsset}
        alt=""
        aria-hidden="true"
        width={25}
        height={20}
        className="-translate-y-px h-auto w-[25px] opacity-95 transition-opacity duration-200 group-hover:opacity-75 max-sm:w-[22px]"
      />
      <span
        className={`${compact ? "hidden sm:inline" : "inline"} select-none text-[0.94rem] font-medium tracking-[-0.025em]`}
      >
        {label}
      </span>
    </Link>
  );
}
