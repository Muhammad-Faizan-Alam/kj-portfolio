"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    q: "Do you write custom code if I need it?",
    a: "For most projects, no — everything's built inside WordPress, Shopify, or Webflow's own tools, which is faster and easier for you to maintain long-term. If a feature genuinely needs custom backend work outside what the platform supports, I'll tell you that upfront rather than force a workaround, and can bring in a developer I trust to handle that piece.",
  },
  {
    q: "Can you migrate my existing site to a new platform?",
    a: "Yes. I audit your current content, URLs, and SEO structure first, map out redirects so you don't lose search rankings, then rebuild on the new platform. You'll see the new site staged before anything goes live.",
  },
  {
    q: "Who owns and hosts the site after launch?",
    a: "You do. I set everything up under your own hosting and platform accounts, not mine, so you're never locked into me to keep the site running. I'll hand over every login at project close.",
  },
  {
    q: "What if I need to make edits myself after launch?",
    a: "That's usually the point of the platforms I use. I'll record a short walkthrough of your specific site showing how to edit the pages and sections you'll actually touch, plus a written guide. If you'd rather not deal with it, I offer a monthly maintenance option instead.",
  },
  {
    q: "How long does a typical project take?",
    a: "A landing page usually runs 1–2 weeks. A full business or e-commerce site is typically 4–7 weeks depending on how much content and how many custom sections are involved — I'll give you a real number once I see the scope, not a generic estimate.",
  },
  {
    q: "Do I need a finished design before we start?",
    a: "No. I can design and build from a brief, or work from a Figma file if you already have one. Either way you'll see a homepage direction before I build out the rest of the site.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-head > *", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".faq-head", start: "top 82%" },
      });
      gsap.from(".faq-panel", {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: ".faq-panel", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="mx-auto max-w-[1180px] px-8 sm:px-5 py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div className="faq-head">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[11.5px] font-medium text-ink-soft mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-select" />
            FAQ
          </div>
          <h2
            data-inspect="element: h2.section-title"
            className="font-display font-semibold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.01em] mb-3"
          >
            Questions clients actually ask
          </h2>
          <p className="text-[15px] leading-relaxed text-ink-soft max-w-[380px]">
            Not sure what to ask a builder who isn&apos;t a traditional
            developer? Start here — or skip straight to the contact form.
          </p>
        </div>

        <div
          className="faq-panel rounded-xl border border-line bg-white px-6 sm:px-8"
          data-inspect="component: faq-accordion"
        >
          <Accordion type="single" collapsible defaultValue="">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
