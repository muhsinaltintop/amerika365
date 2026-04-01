interface NewsBadgeProps {
  label: string;
  variant?: "primary" | "muted" | "soft";
}

const variants = {
  primary: "bg-[color:var(--navy)] text-white",
  muted: "bg-slate-200 text-slate-600",
  soft: "bg-[color:var(--accent-soft)] text-[color:var(--navy)]",
};

export function NewsBadge({ label, variant = "primary" }: NewsBadgeProps) {
  return <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${variants[variant]}`}>{label}</span>;
}
