import { Icon } from "../atoms/Icon";
import { SectionTitle } from "../atoms/SectionTitle";
import { ImmigrationItem } from "../molecules/ImmigrationItem";

export function ImmigrationSection() {
  return (
    <section className="grid grid-cols-1 items-start gap-5 sm:gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Icon name="passkey" className="text-3xl text-[#0756b0]" />
          <SectionTitle title="Göçmenlik ve Vize" />
        </div>
        <div className="space-y-4">
          <ImmigrationItem icon="description" title="H-1B Vize Başvuruları Başladı" badgeLabel="GÜNCEL" />
          <ImmigrationItem icon="calendar_month" title="Green Card Çekiliş Sonuçları" badgeLabel="MAYIS 2024" badgeVariant="muted" />
          <ImmigrationItem icon="info" title="F-1 Öğrenci Vizesi Yeni Kurallar" badgeLabel="REHBER" badgeVariant="soft" />
        </div>
      </div>

      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-[#0756b0] p-5 text-white sm:p-8">
        <div className="relative z-10">
          <h3 className="mb-4 text-xl font-bold sm:text-2xl">Vize Danışmanlığı mı Arıyorsunuz?</h3>
          <p className="mb-6 leading-relaxed text-white/80">
            Amerika&apos;daki uzman Türk avukatlar ve danışmanlarla iletişime geçin. Sürecinizi güvenle yönetin.
          </p>
          <button className="rounded-lg bg-white px-6 py-3 font-bold text-[#0756b0] shadow-lg transition-colors hover:bg-slate-50">
            Uzmana Sorun
          </button>
        </div>
        <Icon name="travel_explore" className="absolute -right-8 -bottom-8 rotate-12 text-[200px] text-white/10" />
      </div>
    </section>
  );
}
