const items = ["Gündem", "Politika", "Göçmenlik", "Ekonomi", "Sanat", "Yorum", "Spor"];

export function NavMenu() {
  return (
    <nav className="hidden items-center gap-6 md:flex lg:gap-8">
      {items.map((item) => (
        <a
          key={item}
          href="#"
          className="text-sm font-semibold text-[#1b1a6b]/80 transition-colors hover:text-[#0756b0] dark:text-slate-300"
        >
          {item}
        </a>
      ))}
    </nav>
  );
}
