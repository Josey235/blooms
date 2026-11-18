import Reveal from '../components/Reveal'
import SectionDivider from '../components/SectionDivider'
export default function ClosingSection({ w }) {
  return (
    <section className="relative z-10 px-6 pb-32 pt-28 text-center">
      <Reveal><SectionDivider/></Reveal>
      <Reveal delay={.2}><p className="mx-auto mt-10 max-w-2xl font-serif text-3xl italic md:text-5xl">{w.closing.line}</p></Reveal>
      <Reveal delay={.4}><p className="script mt-10 text-4xl md:text-5xl">With love,</p><p className="mt-2 font-display uppercase tracking-[.2em]">{w.groom} &amp; {w.bride}</p></Reveal>
      <Reveal delay={.6}><p className="eyebrow mt-12">{w.initials}</p></Reveal>
    </section>
  )
}
