export function Arc({
  className = "",
  ...rest
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 200"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      {...rest}
    >
      <path d="M2 198C2 89.8 91.8 2 200 2s198 87.8 198 196" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
