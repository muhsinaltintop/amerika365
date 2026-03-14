import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/amerika365news/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm9.13 1.75a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/amerika365news",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M13.76 22v-8.19h2.77l.41-3.2h-3.18V8.57c0-.93.27-1.56 1.63-1.56h1.74V4.14c-.3-.04-1.34-.14-2.55-.14-2.52 0-4.25 1.53-4.25 4.34v2.27H7.5v3.2h2.83V22h3.43Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/Amerika365news",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.26l-4.9-6.63L6.2 22H3.1l7.24-8.29L.8 2h6.42l4.42 5.98L18.9 2Zm-1.1 18.15h1.73L6.27 3.76H4.4L17.8 20.15Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white py-10 sm:mt-12 sm:py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-4 md:gap-12">
        <div className="col-span-1 space-y-6 md:col-span-2">
          <div className="flex items-center gap-3">
            <Link href="/">
            <div>
              <Image src="/amerika365logo.png" width="150" height="100" alt="Amerika 365 Logo" />
            </div>
            {/* <div className="block ml-2 md:hidden">
              <Image src="/365logo.png" width="50" height="50" alt="Amerika 365 Logo" />
            </div> */}
          </Link>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400">
            ABD Haberlerini Türkçe Olarak Takip Edin.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-[#1b1a6b] dark:text-white">Kategoriler</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            {['Gündem', 'Politika', 'Göçmenlik', 'Ekonomi', 'Sanat', 'Yorum', 'Spor'].map((item) => (
              <li key={item}>
                <a className="transition-colors hover:text-[#0756b0]" href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-[#1b1a6b] dark:text-white">Bizi Takip Edin</h4>
          <div className="flex gap-4">
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#1b1a6b] transition-all hover:bg-[#0756b0] hover:text-white dark:bg-slate-800 dark:text-slate-300"
                href={socialLink.href}
                target="_blank"
                rel="noreferrer"
                aria-label={socialLink.name}
              >
                {socialLink.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] border-t border-slate-100 px-4 pt-6 text-center text-xs text-slate-400 sm:mt-12 sm:px-6 sm:pt-8 dark:border-slate-800">
        © 2026 Amerika 365. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
