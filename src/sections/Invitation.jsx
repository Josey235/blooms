import Reveal from '../components/Reveal'
import SectionDivider from '../components/SectionDivider'
export default function Invitation({ w }) {
  const i = w.invitation
  return (
    <section className="relative z-10 bg-cream/80 px-6 py-28 text-center">
      <Reveal><p className="font-serif text-xl italic text-mute">{i.lead}</p></Reveal>
      <Reveal delay={.15}><h2 className="mt-6 font-display text-4xl uppercase tracking-[.15em] md:text-6xl">{w.groom}</h2><p className="script my-2 text-5xl">&amp;</p><h2 className="font-display text-4xl uppercase tracking-[.15em] md:text-6xl">{w.bride}</h2></Reveal>
      <Reveal delay={.3}><p className="mx-auto mt-8 max-w-md font-serif text-xl md:text-2xl">{i.body}</p></Reveal>
      <Reveal delay={.4} className="mt-12"><SectionDivider/></Reveal>
      {i.verse && <Reveal delay={.5}><blockquote className="mx-auto mt-10 max-w-xl font-serif text-lg italic text-mute md:text-xl">{i.verse}<footer className="eyebrow mt-3 not-italic">{i.verseRef}</footer></blockquote></Reveal>}
    </section>
  )
}
