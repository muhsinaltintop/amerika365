import { Icon } from "../atoms/Icon";
import { NavMenu } from "../molecules/NavMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-center border-b border-[#e6eef5] bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0756b0] text-white">
            <Icon name="newspaper" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1b1a6b] dark:text-white">Amerika 365</h1>
        </div>
        <NavMenu />
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <Icon name="search" className="text-[#1b1a6b] dark:text-white" />
          </button>
          <button className="hidden rounded-lg bg-[#0756b0] px-5 py-2 text-sm font-bold text-white lg:block">Abone Ol</button>
        </div>
      </div>
    </header>
  );
}
