import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { newsArticles, newsBySlug } from "@/lib/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = newsBySlug.get(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition-colors hover:text-[#0756b0]">
            Ana Sayfa
          </Link>
          <span>›</span>
          <span>{article.category}</span>
          <span>›</span>
          <span className="truncate font-medium text-slate-900 dark:text-slate-200">{article.title}</span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row">
          <article className="lg:w-[68%]">
            <h1 className="mb-5 text-3xl leading-tight font-extrabold text-[#1b1a6b] md:text-5xl dark:text-white">{article.title}</h1>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5 dark:border-slate-800">
              <div>
                <p className="font-bold">{article.author}</p>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {article.publishLabel} • {article.readTime}
                </p>
              </div>
              <Link href="/" className="rounded-lg bg-[#0756b0] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0756b0]/90">
                Anasayfaya Dön
              </Link>
            </div>

            <figure className="mb-8 overflow-hidden rounded-2xl bg-slate-200">
              <img src={article.heroImage} alt={article.title} className="aspect-video w-full object-cover" />
            </figure>

            <div className="space-y-6 leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="text-xl font-medium text-slate-900 dark:text-white">{article.excerpt}</p>
              <p>
                Yeni dönemde Washington ve Ankara hattında diplomatik temasların hızlanması bekleniyor. Özellikle güvenlik,
                ekonomi ve toplumsal hareketlilik başlıklarında atılacak adımlar, iki ülke ilişkilerinin yönünü belirleyecek.
              </p>
              <p>
                Uzmanlara göre ilk 100 gün, teknik komitelerin yeniden yapılandırılması ve takvimlendirilmiş görüşmelerin
                başlatılması açısından kritik öneme sahip. İş dünyası ve sivil toplum temsilcileri de sürecin yakından takip
                edilmesi gerektiğini vurguluyor.
              </p>
              <blockquote className="rounded-r-xl border-l-4 border-[#0756b0] bg-[#0756b0]/5 p-6">
                <p className="text-xl font-bold text-[#1b1a6b] italic dark:text-[#4fc5db]">
                  &quot;Önümüzdeki süreç, yalnızca siyasi gündemle değil; yatırım, eğitim ve mobilite alanlarındaki somut kararlarla
                  şekillenecek.&quot;
                </p>
              </blockquote>
              <h2 className="text-2xl font-bold text-[#1b1a6b] dark:text-white">Öne Çıkan Başlıklar</h2>
              <p>
                İlgili kurumların hazırlayacağı yeni yol haritası; düzenli görüşme trafiği, karşılıklı ticaret hedefleri ve
                sektörel iş birlikleri üzerinden çok boyutlu bir çerçeve sunuyor.
              </p>
            </div>
          </article>

          <aside className="space-y-8 lg:w-[32%]">
            <section className="rounded-2xl bg-[#1b1a6b] p-7 text-white">
              <h3 className="mb-2 text-xl font-bold">Günlük Bültene Kaydolun</h3>
              <p className="mb-5 text-sm text-slate-300">Amerika gündemindeki gelişmeleri her sabah e-postanızda alın.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm outline-none"
                />
                <button className="w-full rounded-xl bg-[#0756b0] py-3 text-sm font-bold">Abone Ol</button>
              </form>
            </section>

            <section className="rounded-2xl bg-white p-6 dark:bg-slate-900">
              <h3 className="mb-4 text-lg font-bold text-[#1b1a6b] dark:text-white">İlginizi Çekebilir</h3>
              <div className="space-y-4">
                {newsArticles
                  .filter((item) => item.slug !== article.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link key={item.slug} href={`/${item.slug}`} className="block rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                      <p className="text-sm font-bold leading-snug">{item.title}</p>
                      <span className="mt-1 block text-xs font-semibold tracking-wide text-slate-500 uppercase">{item.category}</span>
                    </Link>
                  ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
