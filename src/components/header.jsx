'use client'

import { useRef, useState } from "react"
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const headerLinks = [
  {
    id: 'about-me',
    name: 'ABOUT ME',
    href: '#about-me',
  },
  {
    id: 'core-skills',
    name: 'CORE SKILLS',
    href: '#core-skills',
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    href: '#projects',
  },
  {
    id: 'contact',
    name: 'CONTACT',
    href: '#contact',
  },
  {
    id: 'lets-build',
    name: "Let's Build",
    href: 'https://api.whatsapp.com/send?text=Hi%20Kashaf%2C%20let%27s%20build%20something%20great.',
    cta: true,
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    const links = header.querySelectorAll(".header-link");
    const animateLinks = (mouseX) => {
      const { left } = header.getBoundingClientRect();

      links.forEach((link) => {
        const { left: linkLeft, width } = link.getBoundingClientRect();
        const center = linkLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 2000);

        gsap.to(link, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out"
        })
      });
    };

    const handleMouseMove = (e) => {
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const { left } = header.getBoundingClientRect();
      animateLinks(e.clientX - left);
    };

    const resetLinks = () =>
      links.forEach((link) => gsap.to(link, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power1.out"
      }));

    header.addEventListener("mousemove", handleMouseMove);
    header.addEventListener("mouseleave", resetLinks);

    return () => {
      header.removeEventListener("mousemove", handleMouseMove);
      header.removeEventListener("mouseleave", resetLinks);
    };
  }, []);

  const closeMobileHeader = () => {
    setIsMobileOpen(false);
  }

  return (
    <section id="header" className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 select-none max-md:top-4 max-md:right-4 max-md:w-auto max-md:max-w-none max-md:left-auto max-md:translate-x-0">
      <button
        type="button"
        className="mb-2 ml-auto flex size-10 items-center justify-center rounded-full bg-olive-400 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/30 md:hidden"
        aria-controls="mobile-header-menu"
        aria-expanded={isMobileOpen}
        aria-label={isMobileOpen ? "Hide navigation" : "Show navigation"}
        onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
      >
        {isMobileOpen ? <ChevronUp aria-hidden="true" size={20} /> : <ChevronDown aria-hidden="true" size={20} />}
      </button>

      <div
        id="mobile-header-menu"
        ref={headerRef}
        className={`flex origin-top items-center justify-between rounded-full border border-olive-500 bg-olive-400/30 px-3 py-2 backdrop-blur-md transition-[opacity,transform] duration-300 md:px-4 md:py-2.5 lg:px-6 lg:py-3 max-md:w-[calc(100vw-2rem)] max-md:flex-col max-md:items-stretch max-md:rounded-3xl max-md:bg-olive-300/85 max-md:px-4 max-md:py-4 max-md:shadow-xl ${isMobileOpen ? 'max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100' : 'max-md:pointer-events-none max-md:-translate-y-3 max-md:opacity-0'}`}
      >
        <h2 className="font-montserrat hidden shrink-0 px-2 text-lg font-bold text-olive-900 md:block lg:text-xl">Kashaf Jabeen</h2>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1 max-md:flex-col max-md:items-stretch">
        {headerLinks.filter(({ cta }) => !cta).map(({ id, name, href }, index) => (
          <div
            key={id}
            className={`relative flex justify-center transition-[opacity,transform] duration-300 max-md:w-full max-md:translate-y-0 ${isMobileOpen ? 'max-md:opacity-100' : 'max-md:translate-y-2 max-md:opacity-0'}`}
            style={{ transitionDelay: isMobileOpen ? `${index * 60}ms` : '0ms' }}
          >
            <Link
              href={href}
              className="header-link font-montserrat flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-2 text-sm font-semibold text-olive-600 md:h-11 md:px-3 md:text-sm lg:h-12 lg:px-4 lg:text-base"
              aria-label={name}
              onClick={closeMobileHeader}
            >
              {name}
            </Link>
          </div>
        ))}
        </div>
        {headerLinks.filter(({ cta }) => cta).map(({ id, name, href }) => (
          <div
            key={id}
            className={`relative flex shrink-0 justify-center transition-[opacity,transform] duration-300 max-md:w-full max-md:translate-y-0 ${isMobileOpen ? 'max-md:opacity-100' : 'max-md:translate-y-2 max-md:opacity-0'}`}
            style={{ transitionDelay: isMobileOpen ? '240ms' : '0ms' }}
          >
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              className="header-link font-montserrat flex h-10 w-auto cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-olive-800 px-3 text-sm font-semibold text-white max-md:mx-auto max-md:w-[85%] md:h-11 md:px-4 md:text-base lg:h-12 lg:px-5"
              aria-label={name}
              onClick={closeMobileHeader}
            >
              {name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Header
