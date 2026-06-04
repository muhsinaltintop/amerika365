import Image from "next/image";
import Link from "next/link";
import { NewsBadge } from "../atoms/NewsBadge";
import { Icon } from "../atoms/Icon";

interface ImmigrationItemProps {
  icon: string;
  title: string;
  badgeLabel: string;
  slug: string;
  badgeVariant?: "primary" | "muted" | "soft";
  imageSrc?: string;
  imageAlt?: string;
}

export function ImmigrationItem({ icon, title, badgeLabel, slug, badgeVariant = "primary", imageSrc, imageAlt }: ImmigrationItemProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group flex cursor-pointer flex-col gap-3 rounded-lg bg-[#f7fbfd] p-4 transition-colors hover:bg-[#0756b0]/5 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-800"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            width={80}
            height={56}
            className="h-14 w-20 rounded-lg object-cover shadow-sm ring-1 ring-slate-200 transition-transform group-hover:scale-[1.03] dark:ring-slate-700"
          />
        ) : (
          <Icon name={icon} className="text-slate-400 transition-colors group-hover:text-[#0756b0]" />
        )}
        <span className="text-sm font-semibold text-[#1b1a6b] sm:text-base dark:text-slate-200">{title}</span>
      </div>
      <NewsBadge label={badgeLabel} variant={badgeVariant} />
    </Link>
  );
}
