import { Icon } from "../atoms/Icon";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-4">
        <div className="col-span-1 space-y-6 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0756b0] text-white">
              <Icon name="newspaper" className="text-sm" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1b1a6b] dark:text-white">Amerika 365</h2>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400">
            ABD&apos;deki Türk toplumunun en güvenilir haber ve bilgi kaynağı. Güncel gelişmeler, vize rehberleri ve yaşam haberleri tek adreste.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-[#1b1a6b] dark:text-white">Kategoriler</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            {['Haberler', 'Göçmenlik', 'Vize Rehberi', 'Yaşam'].map((item) => (
              <li key={item}>
                <a className="transition-colors hover:text-[#0756b0]" href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-[#1b1a6b] dark:text-white">Bizi Takip Edin</h4>
          <div className="flex gap-4">
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#1b1a6b] transition-all hover:bg-[#0756b0] hover:text-white dark:bg-slate-800 dark:text-slate-300" href="#">
              <Icon name="public" />
            </a>
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#1b1a6b] transition-all hover:bg-[#0756b0] hover:text-white dark:bg-slate-800 dark:text-slate-300" href="#">
              <Icon name="mail" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1200px] border-t border-slate-100 px-6 pt-8 text-center text-xs text-slate-400 dark:border-slate-800">
        © 2024 Amerika 365. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
