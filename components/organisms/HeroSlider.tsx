"use client";

import Link from "next/link";
import { TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import type { ArticleRecord } from "@/lib/articles";
import { Icon } from "../atoms/Icon";

interface HeroSliderProps {
  slides: ArticleRecord[];
}

const MAX_FONT_FIT_ITERATIONS = 48;

function hasOverflow(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1;
}

function getMinimumFontSizes() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return { title: 30, excerpt: 14 };
  }

  if (window.matchMedia("(min-width: 640px)").matches) {
    return { title: 26, excerpt: 14 };
  }

  return { title: 22, excerpt: 13 };
}

function reduceFontUntilFits(element: HTMLElement, minFontSize: number, container?: HTMLElement) {
  const computedStyle = window.getComputedStyle(element);
  let fontSize = Number.parseFloat(computedStyle.fontSize);
  const lineHeightRatio = Number.parseFloat(computedStyle.lineHeight) / fontSize;
  let iteration = 0;

  while (fontSize > minFontSize && iteration < MAX_FONT_FIT_ITERATIONS && (hasOverflow(element) || (container && hasOverflow(container)))) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;
    element.style.lineHeight = String(lineHeightRatio);
    iteration += 1;
  }
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fitActiveSlideText = useCallback(() => {
    const activeSlide = slideRefs.current[currentSlide];

    if (!activeSlide || activeSlide.offsetParent === null) {
      return;
    }

    const textColumn = activeSlide.querySelector<HTMLElement>("[data-hero-slider-text]");
    const title = activeSlide.querySelector<HTMLElement>("[data-hero-slider-title]");
    const excerpt = activeSlide.querySelector<HTMLElement>("[data-hero-slider-excerpt]");

    if (!textColumn || !title || !excerpt || textColumn.clientWidth === 0) {
      return;
    }

    const minimumFontSizes = getMinimumFontSizes();

    // Always start from the stylesheet defaults so short content keeps the original design.
    title.style.fontSize = "";
    title.style.lineHeight = "";
    excerpt.style.fontSize = "";
    excerpt.style.lineHeight = "";

    // Wait for layout to settle, then shrink only the overflowing text nodes in 1px steps.
    window.requestAnimationFrame(() => {
      reduceFontUntilFits(title, minimumFontSizes.title, textColumn);
      reduceFontUntilFits(excerpt, minimumFontSizes.excerpt, textColumn);
      reduceFontUntilFits(title, minimumFontSizes.title, textColumn);
    });
  }, [currentSlide]);

  const scheduleFitActiveSlideText = useCallback(() => {
    window.requestAnimationFrame(fitActiveSlideText);
  }, [fitActiveSlideText]);

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

  useEffect(() => {
    scheduleFitActiveSlideText();
  }, [currentSlide, slides, scheduleFitActiveSlideText]);

  useEffect(() => {
    const onResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = setTimeout(scheduleFitActiveSlideText, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [scheduleFitActiveSlideText]);

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
    <section className="group relative">
      <div
        className="overflow-hidden rounded-xl bg-white shadow-xl shadow-[#1b1a6b]/5 dark:bg-slate-900"
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      >
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={slide.slug} ref={(element) => { slideRefs.current[index] = element; }} className="flex min-w-full flex-col lg:h-[500px] lg:flex-row">
              <div className="relative h-[230px] sm:h-[300px] lg:h-full lg:w-3/5">
                <img alt={slide.title} className="h-full w-full object-cover" src={slide.heroImage} />
              </div>

              <div data-hero-slider-text className="flex min-h-0 min-w-0 flex-col gap-3 p-5 pb-6 sm:gap-4 sm:p-8 lg:h-full lg:w-2/5 lg:p-10">
                <span className="w-fit shrink-0 rounded-full bg-[#0756b0]/10 px-3 py-1 text-xs font-extrabold tracking-widest text-[#0756b0] uppercase">
                  {slide.category}
                </span>

                <h2 data-hero-slider-title className="min-h-0 min-w-0 shrink text-2xl leading-tight font-extrabold text-[#1b1a6b] sm:text-3xl lg:text-4xl dark:text-white">
                  {slide.title}
                </h2>

                <p data-hero-slider-excerpt className="min-h-0 min-w-0 shrink text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                  {slide.excerpt}
                </p>

                <Link
                  href={`/${slide.slug}`}
                  className="relative z-auto flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0756b0] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#0756b0]/90 sm:w-fit"
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
            key={slide.slug}
            aria-label={`${index + 1}. slayta git`}
            className={`h-2.5 w-8 rounded-full transition-all ${currentSlide === index ? "bg-[#0756b0]" : "bg-[#0756b0]/40"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
