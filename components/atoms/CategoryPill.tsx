import Link from "next/link";

interface CategoryPillProps {
  label: string;
  href?: string;
}

const pillClassName =
  "whitespace-nowrap rounded-full border border-[#0756b0]/10 bg-white/80 px-3 py-1 text-xs font-medium text-[#1b1a6b] transition-colors hover:border-[#0756b0]/30 hover:text-[#0756b0] dark:bg-slate-800 dark:text-slate-300 dark:hover:text-[#4fc5db]";

export function CategoryPill({ label, href }: CategoryPillProps) {
  const content = `# ${label}`;

  if (href) {
    return (
      <Link href={href} className={pillClassName} aria-label={`${label} kategorisindeki haberleri görüntüle`}>
        {content}
      </Link>
    );
  }

  return <span className={pillClassName}>{content}</span>;
}
