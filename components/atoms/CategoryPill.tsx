interface CategoryPillProps {
  label: string;
}

export function CategoryPill({ label }: CategoryPillProps) {
  return (
    <span className="whitespace-nowrap rounded-full border border-[#0756b0]/10 bg-white/80 px-3 py-1 text-xs font-medium text-[#1b1a6b] dark:bg-slate-800 dark:text-slate-300">
      # {label}
    </span>
  );
}
