import { ArrowRightIcon } from 'lucide-react'
import Header from '../header'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="hero relative h-dvh max-h-dvh w-full overflow-x-hidden overflow-y-visible bg-linear-180 from-olive-200 to-olive-500 text-[#f0efff]">
      <Header />
      <div className="hero-grid absolute inset-0 -z-10 opacity-25" aria-hidden="true" />
      <div className="hero-glow absolute -right-32 -top-40 -z-10 size-136 rounded-full bg-[#b5a9ec]/30 blur-3xl" aria-hidden="true" />

      <div className="mx-auto flex h-full min-h-0 w-full max-w-375 flex-col px-4 pb-20 pt-5 sm:px-10 sm:pb-28 sm:pt-10 lg:px-16">
        <header className="hero-reveal flex items-center justify-between text-xl font-bold font-montserrat uppercase text-olive-900 md:hidden">
          <span>Kashaf Jabeen</span>
          {/* <span>Senior Wordpress Developer</span> */}
        </header>

        <section className="relative isolate flex min-h-0 flex-1 items-center justify-center overflow-visible text-center" aria-labelledby="hero-title">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible opacity-25" aria-hidden="true">
            <div className="flex max-w-full translate-y-5 flex-col items-center gap-3 bg-linear-to-b from-olive-700 to-olive-100 bg-clip-text font-oswald text-[clamp(3.75rem,14vw,14rem)] font-black uppercase leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(238,236,255,0.55)] sm:gap-5 sm:[-webkit-text-stroke:2px_rgba(238,236,255,0.55)]">
              <span>WEBSITE</span>
              <span>DEVELOPMENT</span>
            </div>
          </div>

          <div className="hero-reveal relative z-10 w-full max-w-7xl translate-y-[clamp(1.5rem,8vh,5rem)] px-5 py-12 text-olive-900 sm:px-8 sm:py-16">
            <h1 id="hero-title" className="mx-auto max-w-7xl text-balance font-ubuntu text-[clamp(1.8rem,4vw,4.5rem)] font-bold leading-[1.08] tracking-tight">
              WordPress Web Developer Helping Businesses Build Fast, Beautiful Websites
            </h1>
            <p className="mx-auto mt-5 max-w-6xl text-balance font-ubuntu text-[clamp(0.95rem,2.3vw,1.8rem)] font-medium leading-[1.45] text-olive-700 sm:mt-6">
              I&apos;m Kashaf Jabeen, a WordPress Developer <br className='hidden lg:block' /> with 3+ years of experience building professional, responsive websites <br className='hidden lg:block' /> for businesses and agencies.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
              <Link
                href="https://api.whatsapp.com/send?text=Hi%20Kashaf%2C%20let%27s%20build%20something%20great."
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-olive-800 px-5 py-3 font-ubuntu text-sm font-bold text-white transition-transform hover:-translate-y-1 duration-500 ease-in-out sm:px-6 sm:text-base"
              >
                Let&apos;s Build Your Website
              </Link>
              <Link
                href="mailto:hello@kashafjabeen.com?subject=Website%20Project%20Inquiry"
                className="rounded-full border border-olive-800 px-5 py-3 font-ubuntu text-sm font-bold text-olive-900 transition-all hover:-translate-y-1 duration-500 ease-in-out hover:bg-olive-800 hover:text-white sm:px-6 sm:text-base"
              >
                Email Me <ArrowRightIcon className="ml-2 inline h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Hero
