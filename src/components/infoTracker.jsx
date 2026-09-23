'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// import Image from 'next/image';

const TICKER_LINES = [
  'I\'m Kashaf Jabeen, a Senior WordPress Developer',
  '3+ years of experience building websites',
  'Elementor • Bricks • Gutenberg',
  'Helping businesses and agencies get professional, responsive WordPress websites.',
];

export default function InfoTicker() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      const tl = gsap.timeline({ repeat: -1 });

      TICKER_LINES.forEach((line) => {
        tl.to(el, { y: -16, opacity: 0, duration: 0.4, ease: 'power2.in' })
          .call(() => {
            el.textContent = line;
          })
          .fromTo(
            el,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          )
          .to({}, { duration: 1.8 }); // hold this line on screen before the next swap
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className=""
    >
      {/* <div className="md:hidden flex items-center gap-0 text-xs font-semibold">
        <Image src="/logo/f.svg" alt="Logo" width={20} height={20} className="rounded-full" />
        <h1>Muhammad Faizan Alam</h1>
      </div> */}
      <div className="md:h-8 h-12 text-center overflow-hidden">
        <p
          ref={textRef}
          className="md:text-[20px] text-sm font-semibold font-georama italic text-accent"
        >
          {TICKER_LINES[0]}
        </p>
      </div>
    </div>
  );
}
