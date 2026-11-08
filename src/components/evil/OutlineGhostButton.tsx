import React from "react";

export function OutlineGhostButton({
  children,
  onClick,
  href,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const baseClasses = `relative inline-flex items-center justify-center overflow-hidden rounded-full border border-neutral-700/80 px-4 py-2 font-mono text-xs text-neutral-300 transition-colors duration-300 hover:border-white hover:text-black group ${className}`;

  const innerContent = (
    <>
      <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={baseClasses}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
}
