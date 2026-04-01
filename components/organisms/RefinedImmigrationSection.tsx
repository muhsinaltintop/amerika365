import { Icon } from "../atoms/Icon";
import { SectionTitle } from "../atoms/SectionTitle";
import { ImmigrationItem } from "../molecules/ImmigrationItem";

export function RefinedImmigrationSection() {
  return (
    <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
      <div className="rounded-[2rem] border border-[color:var(--line)] bg-[rgba(255,250,243,0.84)] p-6 sm:p-8">
        <div className="mb-8 flex items-center gap-3">
          <Icon name="passkey" className="text-3xl text-[color:var(--accent)]" />
          <SectionTitle title="Gocmenlik ve Vize Masasi" />
        </div>
        <div className="space-y-4">
          <ImmigrationItem icon="description" title="H-1B vize basvurulari basladi" slug="h1b-basvurulari-basladi" badgeLabel="Guncel" />
          <ImmigrationItem icon="calendar_month" title="Green Card cekilis sonuclari" slug="green-card-cekilis-sonuclari" badgeLabel="Takvim" badgeVariant="muted" />
          <ImmigrationItem icon="info" title="F-1 ogrenci vizesi yeni kurallar" slug="f1-ogrenci-vizesi-yeni-kurallar" badgeLabel="Rehber" badgeVariant="soft" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--navy)] p-6 text-white sm:p-8">
        <div className="absolute inset-x-10 top-8 h-36 rounded-full bg-[color:var(--accent)]/22 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-8">
          <div>
            <p className="text-xs font-extrabold tracking-[0.22em] text-[color:var(--accent-soft)] uppercase">Hazirlik Cizelgesi</p>
            <h3 className="mt-3 max-w-sm text-3xl font-extrabold leading-tight sm:text-[2.3rem]">Dosyanizi acele etmeden, dogru sirayla hazirlayin.</h3>
            <p className="mt-4 max-w-md leading-7 text-white/76">
              Vize sureclerindeki basvuru, belge ve randevu adimlarini tek ekranda takip edin. Editoryal guncellemelerle karar vermek daha kolay olsun.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-2xl font-extrabold">03</p>
              <p className="mt-2 text-sm text-white/74">One cikan rehber basligi</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-2xl font-extrabold">24s</p>
              <p className="mt-2 text-sm text-white/74">Son guncelleme ritmi</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-2xl font-extrabold">1:1</p>
              <p className="mt-2 text-sm text-white/74">Uzman baglantisi icin hazir alan</p>
            </div>
          </div>

          <button className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[color:var(--navy)] transition-transform hover:-translate-y-0.5">
            Vize rehberine git
            <Icon name="north_east" />
          </button>
        </div>
        <Icon name="travel_explore" className="absolute -right-10 -bottom-10 rotate-6 text-[220px] text-white/8" />
      </div>
    </section>
  );
}
