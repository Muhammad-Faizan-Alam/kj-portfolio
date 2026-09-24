'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import { SiBricks, SiElementor, SiFigma, SiWordpress } from 'react-icons/si'
import { Database, ExternalLink } from 'lucide-react'

type Tool = { label: string; icon: IconType }
type Project = {
  number: string
  name: string
  url: string
  description: string
  image: string
  accent: string
  tools: Tool[]
}

const PROJECTS: Project[] = [
  { number: '01', name: 'Redefining Health', url: 'https://redefininghealth.co.uk', description: 'A warm, conversion-focused health platform shaped from a content brief into a clear, confident digital home.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85', accent: '#d6e7c8', tools: [{ label: 'WordPress', icon: SiWordpress }, { label: 'Elementor', icon: SiElementor }] },
  { number: '02', name: 'Talento', url: 'https://talentoapp.com', description: 'A polished product experience for a platform where ambitious people and opportunities find each other.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85', accent: '#f2d3a7', tools: [{ label: 'Bricks Builder', icon: SiBricks }] },
  { number: '03', name: 'Instants Pour Soi', url: 'https://instantspoursoi06.fr', description: 'A responsive, inviting website that turns a thoughtful visual identity into an effortless browsing experience.', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85', accent: '#e4c8c8', tools: [{ label: 'Bricks Builder', icon: SiBricks }] },
  { number: '04', name: 'Tempo Expertise', url: 'https://tempoexpertise.fr', description: 'A precise, fully responsive service website that gives expertise a sharper voice and a more direct path to contact.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85', accent: '#cedce3', tools: [{ label: 'Bricks Builder', icon: SiBricks }] },
  { number: '05', name: 'Grunt Roofing', url: 'https://gruntroofing.com', description: 'A sturdy, high-trust website built to make a local roofing company easy to understand, choose, and call.', image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1600&q=85', accent: '#e6c9a7', tools: [{ label: 'WordPress', icon: SiWordpress }, { label: 'Elementor', icon: SiElementor }] },
  { number: '06', name: 'Strada Studio', url: 'https://strada.studio', description: 'A complete visual reset with stronger copy, bolder rhythm, and a portfolio experience made to be remembered.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85', accent: '#d4d2c5', tools: [{ label: 'Bricks Builder', icon: SiBricks }, { label: 'Figma', icon: SiFigma }] },
  { number: '07', name: 'Penyu', url: 'https://penyu.nl', description: 'A connected research and people archive with custom post types that keep complex content easy to explore.', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85', accent: '#c8ddd4', tools: [{ label: 'Bricks Builder', icon: SiBricks }, { label: 'Custom Post Types', icon: Database }] },
  { number: '08', name: 'Unlocking Yes', url: 'https://unlockingyes.com', description: 'An end-to-end build where the copy, layout, and interaction all work together to move visitors towards yes.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85', accent: '#ebd2b8', tools: [{ label: 'Bricks Builder', icon: SiBricks }] },
  { number: '09', name: 'SYMN Clinic', url: 'https://symnclinic.com', description: 'A calm, credible clinic website rebuilt around clarity, trust, and a smoother route from question to appointment.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85', accent: '#c9dbe0', tools: [{ label: 'Bricks Builder', icon: SiBricks }] },
]

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const activeIndex = useRef(0)

  useGSAP(() => {
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card))
    if (cards.length !== PROJECTS.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const setStack = () => cards.forEach((card, index) => {
      const distance = (index - activeIndex.current + cards.length) % cards.length
      gsap.set(card, { y: distance * (window.innerWidth < 768 ? 9 : 13), x: distance * (window.innerWidth < 768 ? 0 : 5), rotate: distance === 0 ? 0 : (distance % 2 ? 1 : -1) * Math.min(distance * 0.65, 4), scale: 1 - distance * (window.innerWidth < 768 ? 0.012 : 0.018), opacity: distance > 5 ? 0 : 1, zIndex: cards.length - distance })
    })

    setStack()
    if (!reducedMotion) gsap.fromTo(cards, { opacity: 0, y: 70 }, { opacity: 1, y: (index) => index * 13, duration: 1.1, stagger: 0.06, ease: 'power3.out', delay: 0.2 })

    const cycle = () => {
      const outgoing = cards[activeIndex.current]
      activeIndex.current = (activeIndex.current + 1) % cards.length
      gsap.to(outgoing, { y: 90, x: 40, rotate: 5, opacity: 0, duration: reducedMotion ? 0 : 0.45, ease: 'power2.in', onComplete: setStack })
    }
    const clickTargets = cards.map((card) => {
      const handler = () => cycle()
      card.addEventListener('click', handler)
      return { card, handler }
    })
    return () => clickTargets.forEach(({ card, handler }) => card.removeEventListener('click', handler))
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-linear-180 from-olive-500 to-olive-200 px-4 py-24 text-olive-900 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="projects-title">
      <div className="mx-auto max-w-375">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-5 font-ubuntu text-sm font-semibold uppercase tracking-[0.32em] text-white/55">Selected work</p>
            <h2 id="projects-title" className="max-w-3xl font-oswald text-[clamp(2.8rem,6vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-tighter text-white">Projects</h2>
          </div>
          <p className="max-w-xs font-ubuntu text-sm leading-6 text-olive-700 sm:text-right">Nine builds, each with its own rhythm, audience, and reason to exist.</p>
        </div>

        <div className="relative mx-auto h-[clamp(34rem,70vh,54rem)] w-full max-w-[80vw] min-w-[min(100%,22rem)]" aria-label="Project cards. Select a card to view the next project.">
          {PROJECTS.map((project, index) => (
            <article key={project.name} ref={(element) => { cardRefs.current[index] = element }} className="group absolute inset-0 grid cursor-pointer grid-rows-[minmax(12rem,35%)_1fr] overflow-hidden rounded-[1.25rem] border border-white/70 bg-white shadow-[0_28px_70px_rgba(39,48,32,0.18)] transition-shadow duration-300 hover:shadow-[0_34px_85px_rgba(39,48,32,0.25)] md:grid-cols-2 md:grid-rows-1" style={{ backgroundColor: project.accent }}>
              <div className={`relative min-h-64 overflow-hidden md:min-h-0 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url(${project.image})` }} role="img" aria-label={`${project.name} project preview`} />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 font-ubuntu text-xs font-bold tracking-[0.18em] text-olive-900 backdrop-blur-sm sm:left-8 sm:top-8">{project.number}</span>
              </div>
              <div className={`flex flex-col justify-between p-6 sm:p-10 lg:p-14 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div>
                  <div className="mb-8 flex items-start justify-between gap-4"><span className="font-ubuntu text-xs font-bold uppercase tracking-[0.2em] text-olive-700/75">Website build</span><Link href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} in a new tab`} onClick={(event) => event.stopPropagation()} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-olive-900/20 text-olive-900 transition-colors hover:bg-olive-900 hover:text-white"><ExternalLink size={18} /></Link></div>
                  <h3 className="max-w-lg font-oswald text-[clamp(3rem,6vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-tighter text-olive-900">{project.name}</h3>
                  <p className="mt-6 max-w-md font-ubuntu text-sm leading-7 text-olive-900/75 sm:text-base">{project.description}</p>
                </div>
                <div className="mt-10 border-t border-olive-900/15 pt-5"><p className="mb-3 font-ubuntu text-[0.65rem] font-bold uppercase tracking-[0.22em] text-olive-700/75">Tools used</p><div className="flex flex-wrap gap-2">{project.tools.map(({ label, icon: Icon }) => <span key={label} className="inline-flex items-center gap-2 rounded-full border border-olive-900/15 bg-white/35 px-3 py-2 font-ubuntu text-xs font-medium text-olive-900"><Icon size={16} aria-hidden="true" />{label}</span>)}</div></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
