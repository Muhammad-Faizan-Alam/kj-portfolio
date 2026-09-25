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

export default function InfoTicker({ items = TICKER_LINES }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      const tl = gsap.timeline({ repeat: -1 });

      items.forEach((line) => {
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
    >
      <div className="min-h-18 w-full min-w-0 overflow-hidden text-olive-900 sm:min-h-8">
        <p
          ref={textRef}
          className="break-words text-sm font-semibold italic leading-6 text-accent sm:text-[20px] sm:leading-8"
        >
          {items[0]}
        </p>
      </div>
    </div>
  );
}
