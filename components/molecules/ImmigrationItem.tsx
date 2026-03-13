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
    <div className="group flex cursor-pointer items-center justify-between rounded-lg bg-[#f7fbfd] p-4 transition-colors hover:bg-[#0756b0]/5 dark:bg-slate-800">
      <div className="flex items-center gap-4">
        <Icon name={icon} className="text-slate-400 transition-colors group-hover:text-[#0756b0]" />
        <span className="font-semibold text-[#1b1a6b] dark:text-slate-200">{title}</span>
      </div>
      <NewsBadge label={badgeLabel} variant={badgeVariant} />
    </div>
  );
}
