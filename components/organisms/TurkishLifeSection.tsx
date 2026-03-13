import { SectionTitle } from "../atoms/SectionTitle";
import { LifeCard } from "../molecules/LifeCard";

const cards = [
  { icon: "storefront", iconClassName: "text-[#0756b0]", title: "İşletmeler", subtitle: "Türk Restoran ve Marketleri" },
  { icon: "update", iconClassName: "text-green-600", title: "Güncellemeler", subtitle: "Toplum Duyuruları" },
  { icon: "event", iconClassName: "text-purple-600", title: "Etkinlikler", subtitle: "Festival ve Buluşmalar" },
  { icon: "rocket_launch", iconClassName: "text-orange-600", title: "Girişimciler", subtitle: "Başarı Hikayeleri" },
];

export function TurkishLifeSection() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <SectionTitle title="ABD’de Türk Yaşamı" />
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {cards.map((card) => (
          <LifeCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
