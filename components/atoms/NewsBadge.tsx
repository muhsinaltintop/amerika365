interface NewsBadgeProps {
  label: string;
  variant?: "primary" | "muted" | "soft";
}

const variants = {
  primary: "bg-[#0756b0] text-white",
  muted: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
  soft: "bg-[#0756b0]/20 text-[#0756b0]",
};

export function NewsBadge({ label, variant = "primary" }: NewsBadgeProps) {
  return <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${variants[variant]}`}>{label}</span>;
}
