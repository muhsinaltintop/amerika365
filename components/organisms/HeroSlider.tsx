"use client";

import { useEffect, useState } from "react";
import { Icon } from "../atoms/Icon";
import { PrimaryButton } from "../atoms/PrimaryButton";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695d13f?auto=format&fit=crop&w=1400&q=80",
    badge: "Öne Çıkan",
    title: "Amerika’da Bugün: Türkler İçin En Kritik Gelişmeler",
    text: "ABD genelinde yaşayan Türk toplumunu yakından ilgilendiren en son gelişmeleri, yasal düzenlemeleri ve fırsatları keşfedin.",
  },
  {
    image: "https://images.unsplash.com/photo-1580625920434-cf39b90ca9d0?auto=format&fit=crop&w=1400&q=80",
    badge: "Gündem",
    title: "2024 Seçim Süreci ve Türk Toplumuna Etkileri",
    text: "ABD siyasetindeki son değişimlerin vize süreçleri ve sosyal haklar üzerindeki muhtemel yansımalarını inceledik.",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    badge: "Ekonomi",
    title: "Girişimcilik ve Yatırım: Amerika Fırsatlar Dünyası",
    text: "Yeni iş kurmak isteyenler için eyalet bazlı teşvikler ve Türk yatırımcıların başarı hikayeleri bu rehberde.",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="group relative">
      <div className="overflow-hidden rounded-xl bg-white shadow-xl shadow-[#1b1a6b]/5 dark:bg-slate-900">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.title} className="flex min-w-full flex-col lg:flex-row">
              <div className="relative h-[400px] lg:h-[500px] lg:w-3/5">
                <img alt={slide.title} className="h-full w-full object-cover" src={slide.image} />
              </div>
              <div className="flex flex-col justify-center space-y-6 p-8 lg:w-2/5 lg:p-12">
                <span className="w-fit rounded-full bg-[#0756b0]/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#0756b0]">
                  {slide.badge}
                </span>
                <h2 className="text-3xl font-extrabold leading-tight text-[#1b1a6b] dark:text-white lg:text-4xl">{slide.title}</h2>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{slide.text}</p>
                <PrimaryButton className="flex w-fit items-center gap-2">
                  Devamını Oku
                  <Icon name="arrow_forward" />
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1b1a6b] opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-[#0756b0] hover:text-white dark:bg-slate-800/90 dark:text-white"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      >
        <Icon name="chevron_left" />
      </button>
      <button
        className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1b1a6b] opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-[#0756b0] hover:text-white dark:bg-slate-800/90 dark:text-white"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        <Icon name="chevron_right" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            className={`h-2 w-2 rounded-full transition-all ${currentSlide === index ? "scale-125 bg-[#0756b0]" : "bg-[#0756b0]/40"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
