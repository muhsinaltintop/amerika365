"use client";

import { useMemo, useState } from "react";

type Platform =
  | "x"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "whatsapp"
  | "telegram"
  | "reddit";

type ShareTarget = {
  name: string;
  href: string;
  bgClass: string;
  platform: Platform;
};

const pageTitle = "Amerika 365";

function SocialIcon({ platform }: { platform: Platform }) {
  switch (platform) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.3L1 2h6.2l4.3 5.7L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V10H8v3h2.3v8h3.3Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-current" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="5" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" strokeWidth="2" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M6.5 8.5a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM8 10H5v9h3v-9Zm4.8 0H10v9h2.8v-4.8c0-1.3.4-2.5 2-2.5 1.7 0 1.7 1.6 1.7 2.6V19h2.8v-5.3c0-2.6-.6-4.5-3.6-4.5-1.5 0-2.4.8-2.8 1.6V10Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M12 2.5a9.3 9.3 0 0 0-8 14l-1.2 4.4 4.5-1.2A9.4 9.4 0 1 0 12 2.5Zm0 16.9c-1.4 0-2.8-.4-4-1l-.3-.2-2.7.7.7-2.6-.2-.3a7 7 0 1 1 6.5 3.4Zm3.8-5.2c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.6.1l-.4.6c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.6-.5-1.1-1.2-1.2-1.4-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3.2-.4 0-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.3-.6-.3H8.8c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.3 1 2.5c.1.2 1.6 2.5 4 3.4.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M21 4.6 3.8 11.2c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.4c.2.7.1 1 .9 1 .6 0 .8-.3 1.1-.6l2.1-2 4.3 3.2c.8.4 1.4.2 1.6-.8l2.9-13.6c.3-1.1-.4-1.6-1.2-1.2ZM9 13.7l9.8-6.2c.5-.3 1-.1.6.2l-8 7.2-.3 3.1-2.1-4.3Z" />
        </svg>
      );
    case "reddit":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M14.8 7.4 15.7 4l2.4.6a1.8 1.8 0 1 0 .3-1l-2.8-.7c-.3-.1-.6.1-.7.4l-1 3.7A8.8 8.8 0 0 0 8 8.2l-1.8-1.3a1.8 1.8 0 1 0-.7 1l1.6 1.1a4.3 4.3 0 0 0-2.3 3.6c0 2.4 3.2 4.3 7.2 4.3s7.2-2 7.2-4.3c0-1.7-.9-3.1-2.4-3.8a2 2 0 1 0-2-.4ZM8.9 13.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6.3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1.1 3c-.5.4-1.2.6-2.1.6-.8 0-1.6-.2-2-.6-.3-.2-.7-.2-1 0-.2.3-.2.7.1 1 .7.6 1.7.9 2.9.9 1.2 0 2.2-.3 2.9-.9.3-.3.3-.7.1-1-.2-.2-.6-.2-.9 0Z" />
        </svg>
      );
  }
}

const buildShareTargets = (url: string): ShareTarget[] => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${pageTitle} | ${url}`);

  return [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      bgClass: "bg-black text-white",
      platform: "x",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bgClass: "bg-[#1877F2] text-white",
      platform: "facebook",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      bgClass: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white",
      platform: "instagram",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bgClass: "bg-[#0A66C2] text-white",
      platform: "linkedin",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}`,
      bgClass: "bg-[#25D366] text-white",
      platform: "whatsapp",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      bgClass: "bg-[#26A5E4] text-white",
      platform: "telegram",
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(pageTitle)}`,
      bgClass: "bg-[#FF4500] text-white",
      platform: "reddit",
    },
  ];
};

export function SocialShareFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://amerika365.com");

  const shareTargets = useMemo(() => buildShareTargets(currentUrl), [currentUrl]);

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <div className="relative flex items-center justify-end gap-2">
        <div
          className={`absolute right-14 transition-all duration-300 sm:right-16 ${
            isOpen
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-5 opacity-0"
          }`}
        >
          <ul className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-2 py-2 shadow-lg backdrop-blur">
            {shareTargets.map((target) => (
              <li key={target.name}>
                <a
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${target.name} ile paylaş`}
                  title={`${target.name} ile paylaş`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 ${target.bgClass}`}
                >
                  <SocialIcon platform={target.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentUrl(window.location.href);
            setIsOpen((prev) => !prev);
          }}
          aria-expanded={isOpen}
          aria-label="Sosyal paylaşım seçeneklerini aç"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition hover:scale-105 hover:bg-zinc-800"
        >
          <span className="material-symbols-outlined text-2xl">
            {isOpen ? "close" : "share"}
          </span>
        </button>
      </div>
    </div>
  );
}
