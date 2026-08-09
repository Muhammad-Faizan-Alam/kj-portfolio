"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Platform = {
  key: string;
  label: string;
  color: string;
  summary: string;
  capabilities: string[];
  tools: string[];
};

const PLATFORMS: Platform[] = [
  {
    key: "wordpress",
    label: "WordPress",
    color: "#8C6FE3",
    summary:
      "Best when you need a content team to move fast without waiting on a developer for every change.",
    capabilities: [
      "Custom Elementor / Divi builds from a design file",
      "ACF-driven flexible content for blogs, case studies, resources",
      "WooCommerce setup and checkout customization",
      "Plugin selection and cleanup — no bloat, no conflicts",
      "Core, plugin, and PHP-version update maintenance",
    ],
    tools: ["Elementor", "ACF Pro", "WooCommerce", "WP Rocket"],
  },
  {
    key: "shopify",
    label: "Shopify",
    color: "#3FB27F",
    summary:
      "Best when the site's job is to sell — inventory, checkout, and conversion take priority over layout flexibility.",
    capabilities: [
      "Liquid theme customization and section building",
      "App integrations: reviews, subscriptions, loyalty, email",
      "Checkout and cart-drawer customization within Shopify limits",
      "Speed passes — image, app-script, and theme audits",
      "Product data and collection structure planning",
    ],
    tools: ["Liquid", "Klaviyo", "Shopify CLI", "Recharge"],
  },
  {
    key: "webflow",
    label: "Webflow",
    color: "#2F6FED",
    summary:
      "Best when design fidelity matters most and you still want to edit content yourself after handoff.",
    capabilities: [
      "Pixel-accurate builds from Figma with responsive breakpoints",
      "CMS Collections for blogs, case studies, and directories",
      "Interactions and scroll-based animation, kept purposeful",
      "Client-ready Editor setup so your team can update safely",
      "Forms, embeds, and third-party integrations (Cal.com, Memberstack)",
    ],
    tools: ["Webflow CMS", "Figma", "Memberstack", "Finsweet"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-head > *", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".skills-head", start: "top 82%" },
      });
      gsap.from(".skills-panel", {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: ".skills-panel", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mx-auto max-w-[1180px] px-8 sm:px-5 py-16 lg:py-24"
    >
      <div className="skills-head max-w-[560px] mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[11.5px] font-medium text-ink-soft mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          Skills
        </div>
        <h2
          data-inspect="element: h2.section-title"
          className="font-display font-semibold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.01em] mb-3"
        >
          What I actually do on each platform
        </h2>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          A percentage bar doesn&apos;t tell you much about whether I can
          build your site. This does — pick the platform you&apos;re
          considering.
        </p>
      </div>

      <div className="skills-panel" data-inspect="component: skills-tabs">
        <Tabs defaultValue="wordpress">
          <TabsList>
            {PLATFORMS.map((p) => (
              <TabsTrigger key={p.key} value={p.key}>
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PLATFORMS.map((p) => (
            <TabsContent key={p.key} value={p.key}>
              <div className="rounded-xl border border-line bg-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: p.color }}
                    />
                    <h3 className="font-display font-semibold text-[18px]">
                      {p.label}
                    </h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-soft mb-5">
                    {p.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tools.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                        style={{ background: `${p.color}18` }}
                      >
                        <Check
                          size={11}
                          strokeWidth={3}
                          style={{ color: p.color }}
                        />
                      </span>
                      <span className="text-[14px] leading-snug text-ink">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
