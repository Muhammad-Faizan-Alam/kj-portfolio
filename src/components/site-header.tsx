"use client";

import { useState } from "react";

const NAV_LINKS = ["Overview", "About", "Work", "Skills", "FAQ", "Contact"];

export type Viewport = "desktop" | "tablet" | "mobile";

export default function SiteHeader({
  onViewportChange,
}: {
  onViewportChange?: (vp: Viewport) => void;
}) {
  const [active, setActive] = useState<Viewport>("desktop");

  function select(vp: Viewport) {
    setActive(vp);
    onViewportChange?.(vp);
  }

  return (
    <header className="sticky top-0 z-100 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1180px] px-8 sm:px-5 h-16 flex items-center justify-between gap-5">
        <div
          data-inspect="brand: logo"
          className="flex items-center gap-[9px] font-semibold text-[15px]"
        >
          <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_0_3px_rgba(63,178,127,0.18)]" />
          Ari&nbsp;Voss
        </div>

        <nav className="hidden md:flex items-center gap-0.5 bg-white border border-line rounded-lg p-[3px] text-[12.5px]">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={i === 0 ? "#" : `#${link.toLowerCase()}`}
              className={
                "px-3 py-1.5 rounded-md transition-colors " +
                (i === 0
                  ? "bg-canvas-2 text-ink"
                  : "text-ink-soft hover:bg-canvas-2 hover:text-ink")
              }
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <div
            data-inspect="control: viewport-switcher"
            className="hidden md:flex items-center gap-0.5 bg-white border border-line rounded-lg p-[3px]"
          >
            <ViewportButton
              vp="desktop"
              active={active === "desktop"}
              onClick={select}
              label="Desktop preview"
            >
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M8 20h8M12 16v4" />
            </ViewportButton>
            <ViewportButton
              vp="tablet"
              active={active === "tablet"}
              onClick={select}
              label="Tablet preview"
            >
              <rect x="6" y="3" width="12" height="18" rx="1.5" />
              <path d="M12 18h.01" />
            </ViewportButton>
            <ViewportButton
              vp="mobile"
              active={active === "mobile"}
              onClick={select}
              label="Mobile preview"
            >
              <rect x="8" y="2.5" width="8" height="19" rx="1.5" />
              <path d="M12 18.5h.01" />
            </ViewportButton>
          </div>

          <a
            href="#contact"
            data-inspect="action: primary-cta"
            className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-[9px] text-[13px] font-semibold text-ink transition-transform hover:-translate-y-px"
          >
            Let&apos;s talk
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

function ViewportButton({
  vp,
  active,
  onClick,
  label,
  children,
}: {
  vp: Viewport;
  active: boolean;
  onClick: (vp: Viewport) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={() => onClick(vp)}
      className={
        "flex h-[26px] w-[30px] items-center justify-center rounded-md transition-colors " +
        (active ? "bg-select text-white" : "text-ink-soft hover:bg-canvas-2")
      }
    >
      <svg
        viewBox="0 0 24 24"
        width={15}
        height={15}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        {children}
      </svg>
    </button>
  );
}
