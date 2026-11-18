
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { getDateParts } from '../data/weddingData'

export default function Hero({ w }) {
  const d = getDateParts(w)

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">

      {/* Full-screen wedding photograph */}
      <motion.img
        src={w.heroImage}
        alt={`${w.groom} and ${w.bride}`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2 }}
      />

      {/* Gentle dark overlay for readable names */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Ivory fade at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-[#F9F6F0]/10 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">

        <motion.p
          className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#F4DDAA]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          The wedding of
        </motion.p>

        {/* Groom */}
        <motion.h1
          className="font-serif text-5xl font-light uppercase leading-tight tracking-[0.12em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.65)] md:text-8xl md:tracking-[0.18em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.4 }}
        >
          {w.groom}
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          className="script my-2 text-5xl text-[#E7C27D] drop-shadow-lg md:text-7xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 1.2 }}
        >
          &amp;
        </motion.div>

        {/* Bride */}
        <motion.h1
          className="font-serif text-5xl font-light uppercase leading-tight tracking-[0.12em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.65)] md:text-8xl md:tracking-[0.18em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4 }}
        >
          {w.bride}
        </motion.h1>

        {/* Invitation message */}
        <motion.p
          className="mx-auto mt-7 max-w-2xl font-serif text-base italic leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.4 }}
        >
          {w.heroSubtitle}
        </motion.p>

        {/* Wedding date */}
        <motion.p
          className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#F5D69A] drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 1.4 }}
        >
          {d.month} {d.day}, {d.year}
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <a
        href="#story"
        aria-label="Scroll down"
        className="absolute bottom-12 z-10 text-[#A78343]"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown />
        </motion.span>
      </a>

    </section>
  )
}
