import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import ImageLightbox from '../components/ImageLightbox'
export default function Gallery({ w }) {
  const [open, setOpen] = useState(null), n = w.gallery.length
  const step = useCallback((d) => setOpen(i => (i + d + n) % n), [n])
  const close = useCallback(() => setOpen(null), [])
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:px-6">
      <Reveal className="mb-12 text-center"><p className="script text-5xl md:text-6xl">Moments</p><p className="eyebrow mt-3">Our gallery</p></Reveal>
      <div className="columns-2 gap-3 md:columns-3 md:gap-5">
        {w.gallery.map((g, i) => (
          <Reveal key={i} delay={(i % 3) * .1} className="mb-3 md:mb-5">
            <button onClick={() => setOpen(i)} aria-label={`Open ${g.alt}`} className="group block w-full overflow-hidden rounded-2xl border border-gold/30">
              <img loading="lazy" decoding="async" width={g.w} height={g.h} src={g.src} alt={g.alt} className="w-full transition duration-[900ms] group-hover:scale-105"/>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{open !== null && <ImageLightbox images={w.gallery} index={open} onClose={close} onStep={step}/>}</AnimatePresence>
    </section>
  )
}
