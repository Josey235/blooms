import { Navigation } from 'lucide-react'
import Reveal from '../components/Reveal'
import { getDateParts, getMapsUrl } from '../data/weddingData'
export default function Location({ w }) {
  const d = getDateParts(w)
  return (
    <section className="relative z-10 bg-cream/80 px-6 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <Reveal><img loading="lazy" src={w.venue.photo} alt={w.venue.name} className="w-full rounded-[2rem] border border-gold/40 object-cover"/></Reveal>
        <Reveal delay={.2} className="text-center md:text-left">
          <p className="script text-5xl">The Ceremony</p>
          <h3 className="mt-4 font-display text-3xl uppercase tracking-widest">{w.venue.name}</h3>
          <p className="mt-3 text-mute">{w.venue.address}</p>
          <p className="mt-4 font-serif text-xl">{d.weekday}, {d.month} {d.day}, {d.year} · {w.displayTime}</p>
          <a className="btn mt-8" href={getMapsUrl(w)} target="_blank" rel="noopener noreferrer"><Navigation size={14}/> Get Directions</a>
        </Reveal>
      </div>
    </section>
  )
}
