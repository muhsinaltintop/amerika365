import Link from "next/link";
import { NewsBadge } from "../atoms/NewsBadge";
import { Icon } from "../atoms/Icon";

interface ImmigrationItemProps {
  icon: string;
  title: string;
  badgeLabel: string;
  slug: string;
  badgeVariant?: "primary" | "muted" | "soft";
}

export function ImmigrationItem({ icon, title, badgeLabel, slug, badgeVariant = "primary" }: ImmigrationItemProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group flex cursor-pointer flex-col gap-3 rounded-[1.4rem] border border-[color:var(--line)] bg-white/72 p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--accent)]/50 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <Icon name={icon} className="text-slate-400 transition-colors group-hover:text-[color:var(--accent)]" />
        <span className="text-sm font-semibold text-[color:var(--navy)] sm:text-base">{title}</span>
      </div>
      <NewsBadge label={badgeLabel} variant={badgeVariant} />
    </Link>
  );
}
