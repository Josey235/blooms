import { CalendarDays, Clock, MapPin, Navigation } from 'lucide-react'
import Reveal from '../components/Reveal'
import Countdown from '../components/Countdown'
import { getDateParts, getMapsUrl } from '../data/weddingData'
export default function WeddingDetails({ w }) {
  const d = getDateParts(w)
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-24">
      <Reveal className="mb-12 text-center"><p className="script text-5xl md:text-6xl">Save the Date</p></Reveal>
      <Reveal className="card px-6 py-12 text-center md:px-16">
        <p className="eyebrow flex items-center justify-center gap-2"><CalendarDays size={14}/> {d.month}</p>
        <p className="font-serif text-[7rem] font-light leading-none md:text-[10rem]">{d.day}</p>
        <p className="eyebrow !text-mute">{d.year}, {d.weekday}</p>
        <div className="mx-auto my-8 h-px w-24 bg-gold/60"/>
        <p className="flex items-center justify-center gap-2 font-serif text-2xl"><Clock size={16} className="text-gold"/> {w.displayTime}</p>
        <p className="mt-6 font-display text-2xl uppercase tracking-widest">{w.venue.name}</p>
        <p className="mt-2 flex items-center justify-center gap-2 text-mute"><MapPin size={14} className="text-gold"/> {w.venue.address}</p>
        <a className="btn mt-8" href={getMapsUrl(w)} target="_blank" rel="noopener noreferrer"><Navigation size={14}/> Get Directions</a>
      </Reveal>
      <Reveal className="mt-14"><Countdown wedding={w}/></Reveal>
    </section>
  )
}
