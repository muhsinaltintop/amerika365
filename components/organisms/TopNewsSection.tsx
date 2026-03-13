import { SectionTitle } from "../atoms/SectionTitle";
import { NewsMeta } from "../molecules/NewsMeta";

const cards = [
  {
    image: "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?auto=format&fit=crop&w=900&q=80",
    category: "SİYASET",
    time: "2 SAAT ÖNCE",
    title: "Beyaz Saray'dan Yeni Göçmenlik Paketi Açıklaması",
  },
  {
    image: "https://images.unsplash.com/photo-1642543348745-1f56d7cd5f95?auto=format&fit=crop&w=900&q=80",
    category: "EKONOMİ",
    time: "5 SAAT ÖNCE",
    title: "Enflasyon Verileri Sonrası Fed'den Kritik Faiz Sinyali",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    category: "TEKNOLOJİ",
    time: "8 SAAT ÖNCE",
    title: "Silikon Vadisi'nde Yeni Türk Girişimi 10 Milyon Dolar Yatırım Aldı",
  },
];

export function TopNewsSection() {
  return (
    <section>
      <div className="mb-6 flex flex-col items-start gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle title="Top 5 ABD Haberleri" />
        <a className="flex items-center gap-1 text-sm font-bold text-[#0756b0] hover:underline" href="#">
          Tümünü Gör <span>›</span>
        </a>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900">
            <img alt={card.title} className="h-44 w-full object-cover sm:h-48" src={card.image} />
            <div className="space-y-3 p-5 sm:p-6">
              <NewsMeta category={card.category} time={card.time} />
              <h4 className="cursor-pointer text-base font-bold leading-snug text-[#1b1a6b] transition-colors hover:text-[#0756b0] sm:text-lg dark:text-white">
                {card.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
