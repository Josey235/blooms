import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
export default function ImageLightbox({ images, index, onClose, onStep }) {
  const sx = useRef(0)
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onStep(1); if (e.key === 'ArrowLeft') onStep(-1) }
    addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose, onStep])
  const img = images[index]
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      role="dialog" aria-modal="true" onClick={onClose}
      onTouchStart={e => (sx.current = e.touches[0].clientX)}
      onTouchEnd={e => { const d = e.changedTouches[0].clientX - sx.current; if (Math.abs(d) > 50) onStep(d < 0 ? 1 : -1) }}>
      <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 p-3 text-white"><X/></button>
      <button aria-label="Previous" onClick={e => { e.stopPropagation(); onStep(-1) }} className="absolute left-2 p-3 text-white"><ChevronLeft size={32}/></button>
      <motion.img key={img.src} src={img.src} alt={img.alt} className="max-h-[88vh] max-w-full rounded-lg object-contain" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}/>
      <button aria-label="Next" onClick={e => { e.stopPropagation(); onStep(1) }} className="absolute right-2 p-3 text-white"><ChevronRight size={32}/></button>
    </motion.div>
  )
}
