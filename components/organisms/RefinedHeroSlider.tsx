"use client";

import Image from "next/image";
import Link from "next/link";
import { TouchEvent, useEffect, useState } from "react";
import type { ArticleRecord } from "@/lib/articles";
import { Icon } from "../atoms/Icon";

interface RefinedHeroSliderProps {
  slides: ArticleRecord[];
}

function getTitleSizeClass(title: string) {
  if (title.length > 120) {
    return "text-3xl sm:text-4xl lg:text-[3.2rem]";
  }

  if (title.length > 80) {
    return "text-4xl sm:text-5xl lg:text-[3.6rem]";
  }

  return "text-4xl sm:text-5xl lg:text-[4rem]";
}

export function RefinedHeroSlider({ slides }: RefinedHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const goToPrevSlide = () => {
    if (slides.length < 2) {
      return;
    }

    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    if (slides.length < 2) {
      return;
    }

    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

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
    <section className="group relative overflow-hidden border-b border-[color:var(--line)] bg-[color:var(--surface)]">
      <div className="absolute inset-x-0 top-0 h-[78%] bg-[linear-gradient(180deg,rgba(15,45,74,0.92)_0%,rgba(15,45,74,0.75)_46%,rgba(15,45,74,0)_100%)]" />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--accent)]/16 blur-3xl" />

      <div
        className="relative mx-auto max-w-[1400px] overflow-hidden px-4 py-6 sm:px-6 sm:py-8"
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      >
        <div className="mb-6 flex items-center justify-between text-white/72">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[color:var(--accent-soft)]">Amerika 365</p>
            <h1 className="mt-2 max-w-xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[4.3rem]">
              ABD gundemini Turkce ve net bir bakisla takip edin.
            </h1>
          </div>
          <div className="hidden max-w-xs text-sm leading-6 lg:block animate-fade-up">
            Her sabah one cikan Washington gelismeleri, gocmenlik takibi ve toplum rotasi tek bir editoryal akista.
          </div>
        </div>

        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.slug} className="grid min-w-full gap-6 lg:grid-cols-[minmax(0,1.3fr)_340px] lg:items-end">
              <div className="relative min-h-[530px] overflow-hidden rounded-[2rem] border border-white/12 bg-black shadow-2xl shadow-[color:var(--navy)]/18 sm:min-h-[620px]">
                <Image alt={slide.title} className="animate-drift object-cover" fill priority sizes="(min-width: 1024px) 70vw, 100vw" src={slide.heroImage} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,31,0.1)_0%,rgba(6,18,31,0.4)_32%,rgba(6,18,31,0.88)_100%)]" />
                <div className="relative flex h-full flex-col justify-end p-6 sm:p-8 lg:max-w-[62%] lg:p-10">
                  <span className="mb-4 w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.22em] text-white/90 uppercase backdrop-blur-sm">
                    {slide.category}
                  </span>
                  <h2 className={`${getTitleSizeClass(slide.title)} max-w-2xl font-extrabold leading-[1.02] tracking-tight text-white`}>
                    {slide.title}
                  </h2>
                  <p
                    className="mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {slide.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/68">
                    <span>{slide.publishLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{slide.readTime}</span>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/${slide.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Haberi Ac
                      <Icon name="arrow_forward" />
                    </Link>
                    <a
                      href="#top-stories"
                      className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white/92 backdrop-blur-sm transition-colors hover:bg-white/14"
                    >
                      Gunun Ozeti
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-[rgba(255,250,243,0.88)] p-5 backdrop-blur-sm sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs font-extrabold tracking-[0.22em] text-[color:var(--navy-soft)] uppercase">Hizli Tarama</p>
                  <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-[color:var(--navy)] uppercase">
                    {currentSlide + 1}/{slides.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {slides.map((story, index) => {
                    const active = index === currentSlide;

                    return (
                      <button
                        key={story.slug}
                        className={`w-full rounded-[1.4rem] border px-4 py-4 text-left transition-all ${
                          active
                            ? "border-[color:var(--navy)] bg-[color:var(--navy)] text-white shadow-lg shadow-[color:var(--navy)]/14"
                            : "border-[color:var(--line)] bg-white/65 text-[color:var(--navy)] hover:border-[color:var(--accent)]/60 hover:bg-white"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      >
                        <p className={`text-[11px] font-bold tracking-[0.18em] uppercase ${active ? "text-white/64" : "text-[color:var(--accent)]"}`}>
                          {story.category}
                        </p>
                        <p className="mt-2 text-base font-bold leading-snug">{story.title}</p>
                        <p className={`mt-3 text-sm leading-6 ${active ? "text-white/72" : "text-slate-600"}`}>{story.publishLabel}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.slug}
                      aria-label={`${index + 1}. slayta git`}
                      className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-10 bg-[color:var(--accent)]" : "w-3 bg-[color:var(--navy)]/20"}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-[56%] left-6 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white hover:text-[color:var(--navy)] md:flex md:group-hover:opacity-100"
        onClick={goToPrevSlide}
      >
        <Icon name="chevron_left" />
      </button>
      <button
        className="absolute top-[56%] right-6 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white hover:text-[color:var(--navy)] md:flex md:group-hover:opacity-100"
        onClick={goToNextSlide}
      >
        <Icon name="chevron_right" />
      </button>

      <div className="mx-4 mt-1 flex items-center justify-between rounded-full border border-[color:var(--line)] bg-[rgba(255,250,243,0.92)] px-4 py-3 text-xs font-semibold text-[color:var(--navy)] shadow-sm md:hidden sm:mx-6">
        <span className="flex items-center gap-1">
          <Icon name="swipe" className="text-sm" />
          Kaydirarak gecis yap
        </span>
        <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-bold text-[color:var(--navy)]">
          {currentSlide + 1}/{slides.length}
        </span>
      </div>
    </section>
  );
}
