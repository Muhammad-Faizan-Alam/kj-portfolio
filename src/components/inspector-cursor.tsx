"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Renders a custom cursor that mimics a page-builder's element-inspector:
 * a dashed selection box + floating mono-font tag naming whatever element
 * is under the pointer. Any element anywhere in the app opts in by adding
 * a `data-inspect="label text"` attribute — this component finds them via
 * event delegation, so sections can be built independently without wiring
 * this file every time.
 */
export default function InspectorCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const tagTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const box = boxRef.current;
    const tag = tagRef.current;
    const tagText = tagTextRef.current;
    if (!dot || !box || !tag || !tagText) return;

    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    const xTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });

    let current: HTMLElement | null = null;

    function focusElement(el: HTMLElement) {
      current = el;
      const r = el.getBoundingClientRect();
      gsap.to(box, {
        x: r.left - 4,
        y: r.top - 4,
        width: r.width + 8,
        height: r.height + 8,
        opacity: 1,
        duration: 0.22,
        ease: "power3.out",
      });
      if (tagText) tagText.textContent = el.getAttribute("data-inspect") || "";
      gsap.to(tag, { opacity: 1, duration: 0.18 });
      gsap.to(dot, { scale: 2.2, duration: 0.18 });
    }

    function blurElement() {
      current = null;
      gsap.to(box, { opacity: 0, duration: 0.18 });
      gsap.to(tag, { opacity: 0, duration: 0.18 });
      gsap.to(dot, { scale: 1, duration: 0.18 });
    }

    function onPointerMove(e: PointerEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
      if (current) {
        gsap.to(tag, {
          x: e.clientX + 14,
          y: e.clientY + 18,
          duration: 0.15,
          ease: "power3",
        });
      }
    }

    // Event delegation: works for elements mounted after this effect runs.
    function onMouseOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-inspect]"
      );
      if (target && target !== current) focusElement(target);
    }

    function onMouseOut(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-inspect]"
      );
      const related = (e.relatedTarget as HTMLElement)?.closest<HTMLElement>(
        "[data-inspect]"
      );
      if (target && target === current && target !== related) blurElement();
    }

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div id="inspector-ui">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-select pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={boxRef}
        className="fixed top-0 left-0 rounded pointer-events-none z-[9998] border-[1.5px] border-dashed border-select opacity-0"
      />
      <div
        ref={tagRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] bg-select text-white text-[11px] font-medium font-mono px-[7px] py-[3px] rounded opacity-0 whitespace-nowrap flex items-center gap-[5px]"
      >
        <span className="w-[5px] h-[5px] rounded-full bg-white" />
        <span ref={tagTextRef}>section</span>
      </div>
    </div>
  );
}
