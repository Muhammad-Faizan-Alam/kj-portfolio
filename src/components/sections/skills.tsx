'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ArrowLeft, ArrowUp } from 'lucide-react'

type SkillGroup = {
  title: string
  skills: string[]
}

type SkillCard = {
  title: string
  description: string
  tilt: number
  position: { left: number; top: number }
  positionClass: string
  tint: string
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Website Design & Development',
    skills: ['WordPress Website Design & Development', 'Theme Customization', 'Custom WordPress Functionality', 'WooCommerce Development', 'Responsive Web Development', 'Website Maintenance'],
  },
  {
    title: 'Website Builders & Page Builders',
    skills: ['Elementor', 'Bricks Builder', 'Oxygen', 'Breakdance', 'Avada', 'Gutenberg', 'Thrive Architect'],
  },
  {
    title: 'Performance & Technical',
    skills: ['Website Speed Optimization', 'WordPress Troubleshooting & Debugging', 'Website Migration', 'WordPress Security', 'Basic On-Page & Technical SEO'],
  },
]

const SKILL_CARDS: SkillCard[] = [
  {
    title: 'Website Design & Development',
    description: 'I design and build custom WordPress websites from the ground up, from theme customization and tailored functionality to full WooCommerce stores. Every site is fully responsive and kept healthy afterward with ongoing maintenance.',
    tilt: -8,
    position: { left: 4, top: 26 },
    positionClass: 'md:left-[1%] md:top-[26%] md:rotate-[-8deg]',
    tint: 'from-amber-100/90 to-amber-50/80',
  },
  {
    title: 'Website Builders & Page Builders',
    description: 'I work across the major WordPress builders, including Elementor, Bricks Builder, Oxygen, Breakdance, Avada, Thrive Architect, and native Gutenberg. I choose the right tool for each project so the site stays fast, flexible, and easy for you to edit.',
    tilt: 4,
    position: { left: 31, top: 4 },
    positionClass: 'md:left-[27%] md:top-[4%] md:rotate-[4deg]',
    tint: 'from-emerald-100/90 to-lime-50/80',
  },
  {
    title: 'Performance & Technical',
    description: 'I speed up slow websites, debug stubborn WordPress issues, and migrate sites safely to new hosts. I also harden security and apply on-page and technical SEO basics so your site is fast, secure, and easy to find.',
    tilt: 6,
    position: { left: 53, top: 34 },
    positionClass: 'md:left-[52%] md:top-[34%] md:rotate-[6deg]',
    tint: 'from-sky-100/90 to-cyan-50/80',
  },
]

const DRAG_CONFIG = {
  desktopBreakpoint: '(min-width: 768px)',
  nudgeX: 10,
  nudgeDuration: 0.28,
  nudgeRotationFactor: 0.55,
  activeScale: 1.04,
  reducedScale: 1.01,
  settleDuration: 0.4,
  activeRotationFactor: 0.55,
  ease: 'power3.out',
} as const

gsap.registerPlugin(Draggable, InertiaPlugin)

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardAreaRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const highestZIndex = useRef(SKILL_CARDS.length)

  const activateCard = (index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    highestZIndex.current += 1
    card.style.zIndex = String(highestZIndex.current)
    gsap.to(card, { scale: 1.02, duration: 0.25, ease: DRAG_CONFIG.ease, overwrite: 'auto' })
    gsap.to(card, { scale: 1, delay: 0.25, duration: 0.35, ease: DRAG_CONFIG.ease, overwrite: 'auto' })
  }

  useGSAP(() => {
    const cardArea = cardAreaRef.current
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card))
    if (!cardArea || cards.length !== SKILL_CARDS.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const media = gsap.matchMedia()

    media.add(DRAG_CONFIG.desktopBreakpoint, () => {
      const instances = Draggable.create(cards, {
        bounds: cardArea,
        inertia: !reducedMotion,
        allowContextMenu: true,
        onPress() {
          const card = this.target as HTMLElement
          const cardData = SKILL_CARDS[Number(card.dataset.cardIndex)]
          highestZIndex.current += 1
          card.style.zIndex = String(highestZIndex.current)
          card.classList.add('cursor-grabbing')

          gsap.to(card, {
            scale: reducedMotion ? DRAG_CONFIG.reducedScale : DRAG_CONFIG.activeScale,
            rotation: reducedMotion ? cardData.tilt : cardData.tilt * DRAG_CONFIG.activeRotationFactor,
            duration: DRAG_CONFIG.nudgeDuration,
            ease: DRAG_CONFIG.ease,
            overwrite: 'auto',
          })

          if (!reducedMotion && card.dataset.nudged !== 'true') {
            card.dataset.nudged = 'true'
            gsap.to(card, {
              x: `+=${DRAG_CONFIG.nudgeX}`,
              rotation: cardData.tilt * DRAG_CONFIG.nudgeRotationFactor,
              duration: DRAG_CONFIG.nudgeDuration,
              ease: DRAG_CONFIG.ease,
              overwrite: 'auto',
            })
          }
        },
        onRelease() {
          const card = this.target as HTMLElement
          card.classList.remove('cursor-grabbing')
          gsap.to(card, { scale: 1, duration: DRAG_CONFIG.settleDuration, ease: DRAG_CONFIG.ease, overwrite: 'auto' })
        },
      })

      return () => instances.forEach((instance) => instance.kill())
    })

    return () => media.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="core-skills" className="relative overflow-hidden bg-linear-0 from-olive-500 to-olive-200 px-4 py-24 text-olive-900 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="skills-title">
      <div className="mx-auto grid max-w-375 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-5 text-sm font-ubuntu font-semibold uppercase tracking-[0.32em] text-olive-700">What I do</p>
          <h2 id="skills-title" className="max-w-xl font-oswald text-[clamp(2.8rem,6vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-tighter text-olive-900">Core Skills</h2>
          <div className="mt-10 space-y-8">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 font-ubuntu text-sm font-bold text-olive-800">{group.title}</h3>
                <ul className="flex flex-wrap gap-2" aria-label={group.title}>
                  {group.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-olive-700/15 bg-white/45 px-3 py-2 font-ubuntu text-xs font-medium text-olive-800 shadow-sm backdrop-blur-sm">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div ref={cardAreaRef} className="relative h-auto space-y-5 md:h-145 md:space-y-0 lg:h-162.5" aria-label="Core skill areas">
          {SKILL_CARDS.map((card, index) => (
            <article
              key={card.title}
              ref={(element) => { cardRefs.current[index] = element }}
              data-card-index={index}
              data-cursor="drag"
              tabIndex={0}
              aria-label={`${card.title}. Activate to bring this skill card forward.`}
              onClick={() => activateCard(index)}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateCard(index) } }}
              className={`group relative flex min-h-60 touch-pan-y select-text flex-col overflow-hidden rounded-4xl border border-white/70 bg-linear-to-br ${card.tint} shadow-[0_18px_30px_rgba(55,65,40,0.16),0_4px_8px_rgba(55,65,40,0.08)] outline-none transition-shadow duration-300 hover:shadow-[0_24px_42px_rgba(55,65,40,0.2),0_6px_12px_rgba(55,65,40,0.1)] focus-visible:ring-4 focus-visible:ring-olive-700/30 md:absolute md:block md:h-72 md:min-h-0 md:w-[48%] md:cursor-grab md:touch-none md:rounded-4xl lg:h-85 lg:w-[56%] ${card.positionClass}`}
              style={{ zIndex: index + 1 }}
            >
              <div className="flex flex-1 flex-col p-7 sm:p-8 sm:mb-2 md:mb-0 mb-10">
                <h3 className="max-w-[16rem] font-oswald text-2xl font-bold leading-[1.02] tracking-[-0.04em] text-olive-900 sm:text-3xl">{card.title}</h3>
                <p className="mt-5 max-w-md font-ubuntu text-sm leading-6 text-olive-900/75">{card.description}</p>
              </div>
              <div className="absolute bottom-0 w-full flex items-center justify-between bg-white/80 px-7 py-4 font-ubuntu text-xs font-bold uppercase tracking-[0.18em] text-olive-800 sm:px-8">
                <span>View Skills</span>
                <button type="button" tabIndex={-1} aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-olive-800 text-lg text-white transition-transform duration-300 group-hover:rotate-[-25deg]"><span aria-hidden="true"><ArrowLeft className="hidden lg:block" /><ArrowUp className="lg:hidden block" /></span></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
