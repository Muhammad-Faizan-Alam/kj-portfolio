"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VERSIONS = [
  {
    version: "v1.0",
    year: "2016",
    title: "First builds",
    desc: "Started customizing WordPress themes for local businesses — learned CSS by breaking it.",
    color: "#8C6FE3",
  },
  {
    version: "v2.0",
    year: "2019",
    title: "Went freelance",
    desc: "Left agency work to run projects end-to-end, from client calls to launch day.",
    color: "#2F6FED",
  },
  {
    version: "v3.0",
    year: "2021",
    title: "Added Shopify",
    desc: "Picked up Liquid and theme development to take on e-commerce clients.",
    color: "#3FB27F",
  },
  {
    version: "v4.0",
    year: "2023",
    title: "Added Webflow",
    desc: "Brought Webflow into the toolkit for projects where design fidelity comes first.",
    color: "#F5A623",
  },
  {
    version: "v4.2",
    year: "2025",
    title: "Now",
    desc: "Running a small multi-platform practice, usually two or three projects at a time.",
    color: "#12141C",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-copy > *", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 78%",
        },
      });

      gsap.from(".version-row", {
        opacity: 0,
        x: 18,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".version-log",
          start: "top 75%",
        },
      });

      gsap.from(".version-rail", {
        scaleY: 0,
        duration: 0.9,
        ease: "power2.inOut",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: ".version-log",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto max-w-[1180px] px-8 sm:px-5 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20"
    >
      <div className="about-copy" data-inspect="content: about-copy">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[11.5px] font-medium text-ink-soft mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-select" />
          About
        </div>

        <h2
          data-inspect="element: h2.about-heading"
          className="font-display font-semibold text-[28px] sm:text-[34px] leading-[1.15] tracking-[-0.01em] mb-6"
        >
          I&apos;ve spent ten years learning what breaks when a site goes
          live — then building so it doesn&apos;t.
        </h2>

        <p className="text-[15.5px] leading-relaxed text-ink-soft mb-4 max-w-[440px]">
          I&apos;m not a backend engineer, and I don&apos;t try to be. What I
          do is take a design or a rough idea and turn it into a website your
          team can actually run — one that loads fast, holds together on
          mobile, and doesn&apos;t fall apart the first time someone edits a
          page without me.
        </p>

        <p className="text-[15.5px] leading-relaxed text-ink-soft mb-8 max-w-[440px]">
          Somewhere around my fourth WordPress migration gone wrong, I
          stopped taking on platforms I didn&apos;t trust myself to finish
          properly. Now I work in three: WordPress when you need content
          flexibility, Shopify when you&apos;re selling, Webflow when design
          fidelity matters most. If a project needs custom backend work,
          I&apos;ll tell you upfront and bring in someone who does that —
          not quietly wing it.
        </p>

        <div
          data-inspect="component: terminal-stats"
          className="rounded-lg border border-line bg-white overflow-hidden max-w-[440px]"
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-[#FAFBFC] px-3 py-2">
            <span className="w-[7px] h-[7px] rounded-full bg-line" />
            <span className="w-[7px] h-[7px] rounded-full bg-line" />
            <span className="w-[7px] h-[7px] rounded-full bg-line" />
          </div>
          <div className="px-4 py-3 font-mono text-[12px] leading-relaxed">
            <p className="text-ink-soft">
              <span className="text-select">$</span> builds --shipped
            </p>
            <p className="text-ink">
              → <span className="font-medium">60+</span> production sites ·{" "}
              <span className="font-medium">3</span> platforms ·{" "}
              <span className="font-medium">0</span> missed launch dates
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[11.5px] font-medium text-ink-soft mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
          Version history
        </div>

        <div
          className="version-log relative pl-8"
          data-inspect="component: version-history"
        >
          <div className="version-rail absolute left-[7px] top-1 bottom-1 w-px bg-line" />

          <div className="flex flex-col gap-9">
            {VERSIONS.map((v) => (
              <div
                key={v.version}
                className="version-row relative"
                data-inspect={`content: version-history[${v.version}]`}
              >
                <span
                  className="absolute -left-8 top-1 w-[15px] h-[15px] rounded-full border-2 border-canvas"
                  style={{ background: v.color }}
                />
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span
                    className="font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      color: v.color,
                      background: `${v.color}18`,
                    }}
                  >
                    {v.version}
                  </span>
                  <span className="font-mono text-[11px] text-ink-soft">
                    {v.year}
                  </span>
                </div>
                <h3 className="font-semibold text-[15.5px] mb-1">
                  {v.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-ink-soft max-w-[380px]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
