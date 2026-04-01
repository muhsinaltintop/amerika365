import { Icon } from "../atoms/Icon";
import { SectionTitle } from "../atoms/SectionTitle";

const cards = [
  { icon: "storefront", iconClassName: "text-[color:var(--accent)]", title: "Isletmeler", subtitle: "Turk restoranlari ve market rotalari" },
  { icon: "update", iconClassName: "text-emerald-700", title: "Guncellemeler", subtitle: "Toplum duyurulari ve yerel notlar" },
  { icon: "event", iconClassName: "text-[color:var(--navy-soft)]", title: "Etkinlikler", subtitle: "Haftalik bulusmalar ve festival akisi" },
  { icon: "rocket_launch", iconClassName: "text-amber-700", title: "Girisimciler", subtitle: "ABD pazarinda buyuyen Turk hikayeleri" },
];

export function RefinedTurkishLifeSection() {
  return (
    <section className="rounded-[2rem] border border-[color:var(--line)] bg-[rgba(255,250,243,0.72)] p-6 sm:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold tracking-[0.22em] text-[color:var(--accent)] uppercase">Toplum Katmani</p>
          <SectionTitle title="ABD'de Turk Yasami" />
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          Haberin yanina faydali yasam ipuclari, topluluk sinyalleri ve sahadaki insan hikayelerini ekleyen ikinci katman.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex h-full flex-col rounded-[1.5rem] border border-[color:var(--line)] bg-white/84 p-5 transition-all hover:-translate-y-1 hover:border-[color:var(--accent)]/45 sm:p-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--surface)] sm:h-16 sm:w-16">
              <Icon name={card.icon} className={`text-3xl ${card.iconClassName}`} />
            </div>
            <div className="mt-8">
              <h5 className="text-lg font-bold text-[color:var(--navy)]">{card.title}</h5>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
