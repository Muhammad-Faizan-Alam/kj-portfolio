'use client'

import { Lottie } from 'lottie-react'
import InfoTracker from '../infoTracker'
import userAnimation from '../../../public/user.json'

const ABOUT_BENEFITS = [
  'Full ownership from design to launch — no hand-holding needed',
  'Comfortable turning content-only briefs into a complete website design',
  'Custom functionality: custom post types, relational content, dynamic filtering',
  'SEO-conscious builds from day one',
]

const About = () => {
  return (
    <section id="about-me" className="relative overflow-hidden bg-linear-0 from-olive-200 to-olive-500 px-4 py-10 text-[#f0efff] sm:px-10 sm:py-16 lg:px-16" aria-labelledby="about-title">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute -left-32 top-1/3 size-96 rounded-full bg-olive-300/20 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-128 rounded-full bg-olive-700/30 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-375 items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="relative order-2 mx-auto w-full max-w-lg lg:order-1">
          <div className="absolute -inset-4 rounded-4xl border border-white/15" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl sm:p-12">
            <div className="absolute inset-0 bg-radial-[circle_at_center] from-white/15 to-transparent to-65%" aria-hidden="true" />
            <Lottie src={userAnimation} loop autoplay className="relative z-10 h-full w-full" />
          </div>
          {/* <span className="absolute -bottom-5 -right-3 rounded-full border border-white/15 bg-olive-800 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/75 shadow-lg sm:-right-5">
            Since 2022
          </span> */}
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-5 text-sm font-ubuntu font-semibold uppercase tracking-[0.32em] text-white/55">About me</p>
          <h2 id="about-title" className="max-w-3xl font-oswald text-[clamp(2.8rem,6vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white">
            Built with care. Designed to perform.
          </h2>
          <p className="mt-2 max-w-2xl font-ubuntu text-base leading-8 text-olive-700 sm:text-lg">
            I&apos;m a WordPress Web Developer specializing in custom website design and development for small businesses, startups, and agencies. Since 2022, I&apos;ve delivered 30+ live WordPress projects, including business websites, eCommerce stores, and personal websites, across a wide range of industries.
          </p>

          <div className="mt-2 pt-2 font-ubuntu">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-olive-700">What I bring to every project:</p>
            <div className="flex items-start gap-3 rounded-2xl border border-white/55 bg-white/5 px-2 py-2 shadow-lg sm:px-5">
              <span className="md:block hidden mt-2 size-2.5 shrink-0 rounded-full bg-olive-700" aria-hidden="true" />
              <InfoTracker items={ABOUT_BENEFITS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
