"use client";

import { useState } from "react";
import SiteHeader, { type Viewport } from "./site-header";
import Hero from "./hero";
import About from "./about";
import Portfolio from "./portfolio";
import Skills from "./skills";
import FAQ from "./faq";
import Contact from "./contact";
import SiteFooter from "./site-footer";

export default function HomeShell() {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  return (
    <>
      <SiteHeader onViewportChange={setViewport} />
      <main>
        <Hero viewport={viewport} />
        <About />
        <Portfolio />
        <Skills />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
