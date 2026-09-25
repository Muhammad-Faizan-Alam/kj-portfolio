import Link from 'next/link'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

const WHATSAPP_NUMBER = '+923075800760'
const EMAIL = 'kashafjabeen2@gmail.com'

const ContactFooter = () => {
  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-linear-0 from-olive-500 to-olive-200 px-4 py-10 text-olive-900 sm:px-10 sm:py-16 lg:px-16" aria-labelledby="contact-title">
        <div className="pointer-events-none absolute -right-28 top-1/2 size-96 -translate-y-1/2 rounded-full border border-olive-900/10 sm:size-128" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-1/2 size-64 -translate-y-1/2 rounded-full border border-olive-900/10 sm:size-96" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-375 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24">
          <div>
            <p className="mb-5 text-sm font-ubuntu font-semibold uppercase tracking-[0.32em] text-olive-700">Let&apos;s build something useful</p>
            <h2 id="contact-title" className="max-w-xl font-oswald text-[clamp(2.8rem,6vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-tighter text-olive-900">Have a WordPress Project in Mind<span className="text-olive-500">?</span></h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <p className="mt-8 max-w-2xl font-ubuntu text-base leading-8 text-olive-700 sm:text-lg">Whether it&apos;s a new website or bringing your design to life, I&apos;ll build it fast, clean, and ready to grow your business.</p>
            <Link href="https://wa.me/923075800760?text=Hi%20Kashaf%2C%20I%27d%20like%20to%20discuss%20a%20WordPress%20project." target="_blank" rel="noreferrer" className="group flex min-h-16 items-center justify-between rounded-2xl bg-olive-800 px-5 py-4 font-ubuntu text-sm font-bold text-white shadow-[0_18px_35px_rgba(55,65,40,0.2)] transition-transform duration-300 hover:-translate-y-1 sm:min-w-64 sm:px-6">
              <span className="flex items-center gap-3"><Phone size={19} aria-hidden="true" />Chat on WhatsApp</span>
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </Link>
            <Link href={`mailto:${EMAIL}?subject=WordPress%20Project%20Inquiry`} className="group flex min-h-16 items-center justify-between rounded-2xl border border-olive-900/20 bg-white/45 px-5 py-4 font-ubuntu text-sm font-bold text-olive-900 transition-transform duration-300 hover:-translate-y-1 sm:min-w-64 sm:px-6">
              <span className="flex items-center gap-3"><Mail size={19} aria-hidden="true" />Email me</span>
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-olive-900 px-4 py-10 text-[#f0efff] sm:px-10 sm:py-12 lg:px-16">
        <div className="mx-auto max-w-375">
          <div className="flex flex-col gap-10 border-b border-white/15 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl">Kashaf Jabeen<span className="text-olive-300">.</span></p>
              <p className="mt-4 max-w-xl font-ubuntu text-sm leading-6 text-white/65">WordPress Developer | Website Design &amp; Development | Available for Freelance &amp; Agency Projects</p>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 font-ubuntu text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              <Link href="#about-me" className="transition-colors hover:text-white">About</Link>
              <Link href="#core-skills" className="transition-colors hover:text-white">Skills</Link>
              <Link href="#projects" className="transition-colors hover:text-white">Projects</Link>
              <Link href="#contact" className="transition-colors hover:text-white">Contact</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4 pt-6 font-ubuntu text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-5"><Link href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition-colors hover:text-white"><Mail size={14} aria-hidden="true" />{EMAIL}</Link><Link href="https://wa.me/923075800760" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-white"><Phone size={14} aria-hidden="true" />WhatsApp: {WHATSAPP_NUMBER}</Link></div>
            <p>© {new Date().getFullYear()} Kashaf Jabeen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ContactFooter
