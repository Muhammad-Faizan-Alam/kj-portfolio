"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Category = "all" | "ecom" | "biz" | "land";

type Project = {
  id: string;
  cat: Exclude<Category, "all">;
  catLabel: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  platform: "WP" | "Shopify" | "Webflow";
  url: string;
};

const PLATFORM_STYLE: Record<
  Project["platform"],
  { bg: string; color: string }
> = {
  WP: { bg: "#EFE7FB", color: "#6B4FBF" },
  Shopify: { bg: "#E7F6EC", color: "#28925C" },
  Webflow: { bg: "#E5EEFF", color: "#2F6FED" },
};

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ecom", label: "E-commerce" },
  { key: "biz", label: "Business" },
  { key: "land", label: "Landing" },
];

const PROJECTS: Project[] = [
  {
    id: "norrland",
    cat: "ecom",
    catLabel: "E-commerce · Shopify",
    title: "Norrland Goods",
    desc: "Headless-feel Shopify build with a custom subscription flow and a 1.2s LCP.",
    tags: ["Shopify", "Liquid", "Klaviyo"],
    gradient: "linear-gradient(135deg,#E7F6EC,#CDEBD9)",
    platform: "Shopify",
    url: "norrland-goods.myshopify.com",
  },
  {
    id: "brightleaf",
    cat: "biz",
    catLabel: "Business · WordPress",
    title: "Brightleaf Studio",
    desc: "Full ACF-driven site with a client-editable case study builder.",
    tags: ["WordPress", "ACF", "Elementor"],
    gradient: "linear-gradient(135deg,#EFE7FB,#DDCBF7)",
    platform: "WP",
    url: "brightleaf-studio.com",
  },
  {
    id: "kestrel",
    cat: "land",
    catLabel: "Landing · Webflow",
    title: "Kestrel Clinic",
    desc: "Launch page with a CMS-driven provider directory and booking embed.",
    tags: ["Webflow", "CMS", "Cal.com"],
    gradient: "linear-gradient(135deg,#E5EEFF,#CFE0FF)",
    platform: "Webflow",
    url: "kestrel-clinic.design",
  },
  {
    id: "marrow",
    cat: "ecom",
    catLabel: "E-commerce · Shopify",
    title: "Marrow & Co.",
    desc: "Theme rebuild focused on mobile checkout speed for a DTC furniture brand.",
    tags: ["Shopify", "Speed", "A/B test"],
    gradient: "linear-gradient(135deg,#FBEFE0,#F5D9B0)",
    platform: "Shopify",
    url: "marrowandco.com",
  },
  {
    id: "halstead",
    cat: "biz",
    catLabel: "Business · Webflow",
    title: "Halstead Legal",
    desc: "Trust-first rebrand and site for a boutique legal practice.",
    tags: ["Webflow", "CMS", "SEO"],
    gradient: "linear-gradient(135deg,#E5EEFF,#D6E4FF)",
    platform: "Webflow",
    url: "halsteadlegal.com",
  },
  {
    id: "fielder",
    cat: "land",
    catLabel: "Landing · WordPress",
    title: "Fielder App",
    desc: "Pre-launch waitlist page with an animated product walkthrough.",
    tags: ["WordPress", "GSAP"],
    gradient: "linear-gradient(135deg,#FDEBEE,#F8CFD6)",
    platform: "WP",
    url: "fielderapp.com",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Category>("all");
  const firstRender = useRef(true);

  const filtered = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)),
    [filter]
  );

  // heading + filter panel reveal on scroll (once)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-head > *", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".portfolio-head",
          start: "top 82%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // card entrance: scroll-triggered on first paint, instant re-stagger on filter change
  useEffect(() => {
    const cards = gridRef.current
      ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(".project-card"))
      : [];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      if (firstRender.current) {
        gsap.from(cards, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        });
        firstRender.current = false;
      } else {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="mx-auto max-w-[1180px] px-8 sm:px-5 py-16 lg:py-24"
    >
      <div className="portfolio-head flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h2
          data-inspect="element: h2.section-title"
          className="font-display font-semibold text-[26px]"
        >
          Recent builds
        </h2>

        <div
          data-inspect="control: category-filter"
          className="flex gap-1 rounded-[9px] border border-line bg-white p-1 font-mono text-[12.5px]"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={
                "rounded-md px-3.5 py-2 transition-colors " +
                (filter === f.key
                  ? "bg-ink text-white"
                  : "text-ink-soft hover:bg-canvas-2 hover:text-ink")
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((p, i) => {
          const style = PLATFORM_STYLE[p.platform];
          return (
            <article
              key={p.id}
              data-inspect={`component: project-card[${i}]`}
              className="project-card group rounded-xl border border-line bg-white overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-22px_rgba(18,20,28,0.3)]"
            >
              <div className="flex items-center gap-2 border-b border-line bg-[#FAFBFC] px-2.5 py-2">
                <div className="flex gap-1.5">
                  <span className="w-[7px] h-[7px] rounded-full bg-line" />
                  <span className="w-[7px] h-[7px] rounded-full bg-line" />
                  <span className="w-[7px] h-[7px] rounded-full bg-line" />
                </div>
                <div className="flex-1 truncate rounded-md bg-canvas-2 px-2 py-1 text-[10.5px] font-mono text-ink-soft">
                  {p.url}
                </div>
                <span
                  className="rounded-[5px] px-1.5 py-[2px] text-[9.5px] font-semibold font-mono"
                  style={{ background: style.bg, color: style.color }}
                >
                  {p.platform}
                </span>
              </div>

              <div className="h-[140px]" style={{ background: p.gradient }} />

              <div className="p-4">
                <div className="font-mono text-[10.5px] font-medium text-select mb-1.5">
                  {p.catLabel}
                </div>
                <h3 className="font-semibold text-[15.5px] mb-1">{p.title}</h3>
                <p className="text-[12.5px] leading-relaxed text-ink-soft">
                  {p.desc}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded font-mono text-[9.5px] bg-canvas-2 text-ink-soft px-1.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line transition-colors group-hover:border-select group-hover:bg-select">
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      className="text-ink group-hover:text-white"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[13.5px] text-ink-soft py-12 font-mono">
          Nothing in this category yet.
        </p>
      )}
    </section>
  );
}
