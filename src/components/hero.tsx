"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Viewport } from "./site-header";

const SLIDES = [
  {
    key: "wp",
    label: "WP",
    badgeBg: "#EFE7FB",
    badgeColor: "#6B4FBF",
    url: "brightleaf-studio.com",
    blockBg: "#EFE7FB",
  },
  {
    key: "shopify",
    label: "Shopify",
    badgeBg: "#E7F6EC",
    badgeColor: "#28925C",
    url: "norrland-goods.myshopify.com",
    blockBg: "#E7F6EC",
  },
  {
    key: "webflow",
    label: "Webflow",
    badgeBg: "#E5EEFF",
    badgeColor: "#2F6FED",
    url: "kestrel-clinic.design",
    blockBg: "#E5EEFF",
  },
];

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "420px",
  mobile: "280px",
};

export default function Hero({ viewport }: { viewport: Viewport }) {
  const sectionRef = useRef<HTMLElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const curRef = useRef(0);

  // page-load intro
  // Scoped with gsap.context() + ctx.revert() on cleanup so React Strict
  // Mode's double-invoke of this effect in dev can't leave two competing
  // .from() tweens fighting over the same elements (which is what causes
  // content to get stuck at partial opacity instead of fading fully in).
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 10, duration: 0.5 })
        .from(".hero-heading", { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 14, duration: 0.6 }, "-=0.4")
        .from(".hero-ctas", { opacity: 0, y: 14, duration: 0.6 }, "-=0.45")
        .from(
          ".hero-platforms",
          { opacity: 0, y: 10, duration: 0.6 },
          "-=0.45"
        )
        .from(
          browserRef.current,
          { opacity: 0, scale: 0.96, duration: 0.7 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // browser preview auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      const cur = curRef.current;
      const next = (cur + 1) % SLIDES.length;
      const curEl = slideRefs.current[cur];
      const nextEl = slideRefs.current[next];
      if (curEl) gsap.to(curEl, { opacity: 0, duration: 0.4 });
      if (nextEl) gsap.to(nextEl, { opacity: 1, duration: 0.4, delay: 0.15 });

      if (badgeRef.current) {
        badgeRef.current.textContent = SLIDES[next].label;
        badgeRef.current.style.background = SLIDES[next].badgeBg;
        badgeRef.current.style.color = SLIDES[next].badgeColor;
      }
      if (urlRef.current) {
        gsap.to(urlRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            if (urlRef.current) urlRef.current.textContent = SLIDES[next].url;
            gsap.to(urlRef.current, { opacity: 1, duration: 0.25 });
          },
        });
      }
      curRef.current = next;
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // respond to header's viewport switcher
  useEffect(() => {
    if (!browserRef.current) return;
    gsap.to(browserRef.current, {
      maxWidth: VIEWPORT_WIDTH[viewport],
      marginLeft: viewport === "desktop" ? 0 : "auto",
      marginRight: viewport === "desktop" ? 0 : "auto",
      duration: 0.45,
      ease: "power3.inOut",
    });
  }, [viewport]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1180px] px-8 sm:px-5 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center py-14 lg:py-24"
    >
      <div>
        <div
          data-inspect="status: available"
          className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[11.5px] font-medium text-ink-soft mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
          Booking projects for October
        </div>

        <h1
          data-inspect="element: h1.headline"
          className="hero-heading font-display font-semibold text-[34px] sm:text-[42px] lg:text-[54px] leading-[1.08] tracking-[-0.015em] mb-5"
        >
          I build websites that{" "}
          <span className="text-select">launch on time</span> and hold up
          after handoff.
        </h1>

        <p className="hero-sub text-[16.5px] leading-relaxed text-ink-soft max-w-[460px] mb-7">
          Ten years designing and shipping production sites on WordPress,
          Shopify and Webflow — no plugin bloat, no half-finished sections, no
          surprises when your team logs in to make an edit.
        </p>

        <div className="hero-ctas flex items-center gap-3 mb-8">
          <a
            href="#work"
            data-inspect="action: view-work"
            className="rounded-[9px] bg-ink px-[22px] py-[13px] text-[14px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-black"
          >
            View the work
          </a>
          <a
            href="#contact"
            data-inspect="action: book-call"
            className="flex items-center gap-1.5 border-b-[1.5px] border-ink px-1.5 py-[13px] text-[14px] font-semibold"
          >
            Book a call →
          </a>
        </div>

        <div
          data-inspect="content: platform-list"
          className="hero-platforms flex items-center gap-5 text-[12px] text-ink-soft font-mono"
        >
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-[1.5px]"
              style={{ background: "#8C6FE3" }}
            />
            WordPress
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-[1.5px]"
              style={{ background: "#3FB27F" }}
            />
            Shopify
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-[1.5px]"
              style={{ background: "#2F6FED" }}
            />
            Webflow
          </span>
        </div>
      </div>

      <div
        ref={browserRef}
        data-inspect="component: live-preview"
        className="rounded-xl border border-line bg-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(18,20,28,0.25)]"
      >
        <div className="flex items-center gap-2.5 border-b border-line bg-[#FAFBFC] px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="w-[9px] h-[9px] rounded-full bg-line" />
            <span className="w-[9px] h-[9px] rounded-full bg-line" />
            <span className="w-[9px] h-[9px] rounded-full bg-line" />
          </div>
          <div className="flex-1 flex items-center gap-1.5 rounded-md bg-canvas-2 px-2.5 py-1.5 text-[11px] font-mono text-ink-soft">
            <svg
              width={9}
              height={9}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="opacity-60"
            >
              <rect x="5" y="11" width="14" height="9" rx="1.5" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span ref={urlRef}>{SLIDES[0].url}</span>
          </div>
          <span
            ref={badgeRef}
            className="rounded-[5px] px-2 py-[3px] text-[10px] font-semibold font-mono"
            style={{ background: SLIDES[0].badgeBg, color: SLIDES[0].badgeColor }}
          >
            {SLIDES[0].label}
          </span>
        </div>

        <div className="relative h-[300px] overflow-hidden">
          <div
            ref={(el) => {
              slideRefs.current[0] = el;
            }}
            className="absolute inset-0 p-[22px] flex flex-col gap-2.5 opacity-100"
          >
            <div
              className="rounded-md"
              style={{ height: 34, width: "55%", background: SLIDES[0].blockBg }}
            />
            <div
              className="rounded-md"
              style={{ height: 80, width: "100%", background: SLIDES[0].blockBg }}
            />
            <div
              className="rounded-md"
              style={{ height: 14, width: "80%", background: SLIDES[0].blockBg }}
            />
            <div
              className="rounded-md"
              style={{ height: 14, width: "60%", background: SLIDES[0].blockBg }}
            />
            <div className="flex gap-2.5 mt-1.5">
              <div
                className="rounded-md"
                style={{ height: 60, width: "33%", background: SLIDES[0].blockBg }}
              />
              <div
                className="rounded-md"
                style={{ height: 60, width: "33%", background: SLIDES[0].blockBg }}
              />
              <div
                className="rounded-md"
                style={{ height: 60, width: "33%", background: SLIDES[0].blockBg }}
              />
            </div>
          </div>

          <div
            ref={(el) => {
              slideRefs.current[1] = el;
            }}
            className="absolute inset-0 p-[22px] flex flex-col gap-2.5 opacity-0"
          >
            <div
              className="rounded-md"
              style={{ height: 24, width: "40%", background: SLIDES[1].blockBg }}
            />
            <div className="flex gap-2.5">
              <div
                className="rounded-md"
                style={{ height: 120, width: "48%", background: SLIDES[1].blockBg }}
              />
              <div
                className="rounded-md"
                style={{ height: 120, width: "48%", background: SLIDES[1].blockBg }}
              />
            </div>
            <div
              className="rounded-md"
              style={{ height: 14, width: "50%", background: SLIDES[1].blockBg }}
            />
          </div>

          <div
            ref={(el) => {
              slideRefs.current[2] = el;
            }}
            className="absolute inset-0 p-[22px] flex flex-col gap-2.5 opacity-0"
          >
            <div
              className="rounded-md"
              style={{ height: 90, width: "100%", background: SLIDES[2].blockBg }}
            />
            <div className="flex gap-2.5">
              <div
                className="rounded-md"
                style={{ height: 16, width: "24%", background: SLIDES[2].blockBg }}
              />
              <div
                className="rounded-md"
                style={{ height: 16, width: "24%", background: SLIDES[2].blockBg }}
              />
              <div
                className="rounded-md"
                style={{ height: 16, width: "24%", background: SLIDES[2].blockBg }}
              />
              <div
                className="rounded-md"
                style={{ height: 16, width: "24%", background: SLIDES[2].blockBg }}
              />
            </div>
            <div
              className="rounded-md"
              style={{ height: 50, width: "100%", background: SLIDES[2].blockBg }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
