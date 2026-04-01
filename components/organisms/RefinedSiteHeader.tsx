import Image from "next/image";
import Link from "next/link";
import { Icon } from "../atoms/Icon";

const items = ["Gundem", "Politika", "Gocmenlik", "Ekonomi", "Toplum", "Rehber", "Spor"];

export function RefinedSiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(255,250,243,0.82)] px-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[1240px] items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="hidden md:block">
            <Image src="/amerika365logo.png" width="168" height="100" alt="Amerika 365 Logo" />
          </div>
          <div className="ml-1 block md:hidden">
            <Image src="/365logo.png" width="50" height="50" alt="Amerika 365 Logo" />
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {items.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-semibold tracking-[0.02em] text-[color:var(--navy)]/78 transition-colors hover:text-[color:var(--accent)]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="rounded-full border border-[color:var(--line)] p-2 text-[color:var(--navy)] transition-colors hover:bg-white/70 md:hidden"
            aria-label="Menu"
          >
            <Icon name="menu" className="text-[color:var(--navy)]" />
          </button>
          <button className="rounded-full border border-[color:var(--line)] p-2 text-[color:var(--navy)] transition-colors hover:bg-white/70">
            <Icon name="search" className="text-[color:var(--navy)]" />
          </button>
          <button className="hidden rounded-full bg-[color:var(--navy)] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 lg:block">
            Bultene Katil
          </button>
        </div>
      </div>
    </header>
  );
}
