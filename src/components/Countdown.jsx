import { AnimatePresence, motion } from 'framer-motion'
import useCountdown from '../hooks/useCountdown'
import { getWeddingMoment } from '../data/weddingData'

const Cell = ({ v, label }) => (
  <div className="card flex flex-col items-center px-1 py-5 md:py-8">
    <div className="relative h-10 w-full overflow-hidden text-center md:h-16">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={v} className="absolute inset-x-0 font-serif text-4xl font-light md:text-6xl" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -28, opacity: 0 }} transition={{ duration: .4 }}>{String(v).padStart(2, '0')}</motion.span>
      </AnimatePresence>
    </div>
    <span className="eyebrow mt-3 !text-[.55rem] md:!text-[.68rem]">{label}</span>
  </div>
)

export default function Countdown({ wedding }) {
  const t = useCountdown(getWeddingMoment(wedding).getTime())
  if (t.done) return <p className="script text-center text-4xl md:text-6xl">Today is the day — we’re getting married!</p>
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-5" role="timer" aria-label="Countdown to the wedding">
      <Cell v={t.d} label="Days"/><Cell v={t.h} label="Hours"/><Cell v={t.m} label="Minutes"/><Cell v={t.s} label="Seconds"/>
    </div>
  )
}
