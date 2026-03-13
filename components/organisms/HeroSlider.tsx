"use client";

import Link from "next/link";
import { TouchEvent, useEffect, useState } from "react";
import { Icon } from "../atoms/Icon";

const slides = [
  {
    slug: "abd-secim-sonuclari-yeni-donem",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695d13f?auto=format&fit=crop&w=1400&q=80",
    badge: "Öne Çıkan",
    title: "Amerika’da Bugün: Türkler İçin En Kritik Gelişmeler",
    text: "ABD genelinde yaşayan Türk toplumunu yakından ilgilendiren en son gelişmeleri, yasal düzenlemeleri ve fırsatları keşfedin.",
  },
  {
    slug: "beyaz-saray-gocmenlik-paketi",
    image: "https://images.unsplash.com/photo-1580625920434-cf39b90ca9d0?auto=format&fit=crop&w=1400&q=80",
    badge: "Gündem",
    title: "2024 Seçim Süreci ve Türk Toplumuna Etkileri",
    text: "ABD siyasetindeki son değişimlerin vize süreçleri ve sosyal haklar üzerindeki muhtemel yansımalarını inceledik.",
  },
  {
    slug: "fed-faiz-sinyali-enflasyon-sonrasi",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    badge: "Ekonomi",
    title: "Girişimcilik ve Yatırım: Amerika Fırsatlar Dünyası",
    text: "Yeni iş kurmak isteyenler için eyalet bazlı teşvikler ve Türk yatırımcıların başarı hikayeleri bu rehberde.",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const goToPrevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null);
    setTouchStartX(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) {
      return;
    }

    const touchDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (touchDistance > minSwipeDistance) {
      goToNextSlide();
    }

    if (touchDistance < -minSwipeDistance) {
      goToPrevSlide();
    }
  };

  return (
    <section className="group relative">
      <div
        className="overflow-hidden rounded-xl bg-white shadow-xl shadow-[#1b1a6b]/5 dark:bg-slate-900"
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      >
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.title} className="flex min-w-full flex-col lg:flex-row">
              <div className="relative h-[230px] sm:h-[300px] lg:h-[500px] lg:w-3/5">
                <img alt={slide.title} className="h-full w-full object-cover" src={slide.image} />
              </div>
              <div className="flex flex-col justify-center space-y-4 p-5 pb-6 sm:space-y-6 sm:p-8 lg:w-2/5 lg:p-12">
                <span className="w-fit rounded-full bg-[#0756b0]/10 px-3 py-1 text-xs font-extrabold tracking-widest text-[#0756b0] uppercase">
                  {slide.badge}
                </span>
                <h2 className="text-2xl font-extrabold leading-tight text-[#1b1a6b] dark:text-white sm:text-3xl lg:text-4xl">{slide.title}</h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">{slide.text}</p>
                <Link
                  href={`/${slide.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0756b0] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#0756b0]/90 sm:w-fit sm:px-8 sm:py-4 sm:text-base"
                >
                  Devamını Oku
                  <Icon name="arrow_forward" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-4 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1b1a6b] opacity-0 shadow-lg transition-all hover:bg-[#0756b0] hover:text-white md:flex md:group-hover:opacity-100 dark:bg-slate-800/90 dark:text-white"
        onClick={goToPrevSlide}
      >
        <Icon name="chevron_left" />
      </button>
      <button
        className="absolute top-1/2 right-4 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1b1a6b] opacity-0 shadow-lg transition-all hover:bg-[#0756b0] hover:text-white md:flex md:group-hover:opacity-100 dark:bg-slate-800/90 dark:text-white"
        onClick={goToNextSlide}
      >
        <Icon name="chevron_right" />
      </button>

      <div className="mt-3 flex items-center justify-between rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#1b1a6b] shadow-sm md:hidden dark:bg-slate-900 dark:text-slate-100">
        <span className="flex items-center gap-1">
          <Icon name="swipe" className="text-sm" />
          Kaydırarak geçiş yap
        </span>
        <span className="rounded-full bg-[#0756b0]/10 px-2 py-1 text-[11px] font-bold text-[#0756b0] dark:bg-[#4fc5db]/20 dark:text-[#4fc5db]">
          {currentSlide + 1}/{slides.length}
        </span>
      </div>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 md:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            aria-label={`${index + 1}. slayta git`}
            className={`h-2.5 w-8 rounded-full transition-all ${currentSlide === index ? "bg-[#0756b0]" : "bg-[#0756b0]/40"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
