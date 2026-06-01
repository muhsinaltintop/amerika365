import Link from "next/link";
import { getCategoryNavItems } from "@/lib/articles";

export async function NavMenu() {
  const items = await getCategoryNavItems();

  return (
    <nav className="hidden items-center gap-6 md:flex lg:gap-8">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/kategori/${item.slug}`}
          className="text-sm font-semibold text-[#1b1a6b]/80 transition-colors hover:text-[#0756b0] dark:text-slate-300"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
