interface CategoryPillProps {
  label: string;
}

export function CategoryPill({ label }: CategoryPillProps) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white/92 uppercase backdrop-blur-sm">
      # {label}
    </span>
  );
}
