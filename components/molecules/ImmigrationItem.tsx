import { NewsBadge } from "../atoms/NewsBadge";
import { Icon } from "../atoms/Icon";

interface ImmigrationItemProps {
  icon: string;
  title: string;
  badgeLabel: string;
  badgeVariant?: "primary" | "muted" | "soft";
}

export function ImmigrationItem({ icon, title, badgeLabel, badgeVariant = "primary" }: ImmigrationItemProps) {
  return (
    <div className="group flex cursor-pointer flex-col gap-3 rounded-lg bg-[#f7fbfd] p-4 transition-colors hover:bg-[#0756b0]/5 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-800">
      <div className="flex items-center gap-3 sm:gap-4">
        <Icon name={icon} className="text-slate-400 transition-colors group-hover:text-[#0756b0]" />
        <span className="text-sm font-semibold text-[#1b1a6b] sm:text-base dark:text-slate-200">{title}</span>
      </div>
      <NewsBadge label={badgeLabel} variant={badgeVariant} />
    </div>
  );
}
