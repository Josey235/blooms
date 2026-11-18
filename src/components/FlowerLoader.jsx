import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const draw = (delay, dur = 1.4) => ({ initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { delay, duration: dur, ease: 'easeInOut' } })

export default function FlowerLoader({ settings, onDone }) {
  const [msg, setMsg] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setMsg(true), settings.duration * 0.55)
    const t2 = setTimeout(onDone, settings.duration)
    const t3 = setTimeout(onDone, settings.maxWait) // failsafe: never block the site
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [settings, onDone])
  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1.1 }}>
      <motion.svg viewBox="0 0 200 260" className="h-[48vh] max-h-[420px]" fill="none" strokeWidth="1.4" strokeLinecap="round"
        animate={{ scale: [1, 1, 1.07, 1] }} transition={{ delay: 3.6, duration: 2, times: [0, .01, .5, 1] }}>
        <g stroke="#C5A66A">
          <motion.path d="M100 252C100 205 95 170 100 128" {...draw(0.2, 1.3)}/>
          <motion.path d="M99 205C68 202 58 180 60 160C86 164 98 182 99 205Z" {...draw(1.2, 1)}/>
          <motion.path d="M100 180C130 178 142 158 140 140C114 144 101 160 100 180Z" {...draw(1.5, 1)}/>
        </g>
        <g stroke="#E39AB2">
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <motion.path key={a} transform={`rotate(${a} 100 112)`} d="M100 112C84 86 87 56 100 38C113 56 116 86 100 112Z"
              initial={{ pathLength: 0, opacity: 0, fill: 'rgba(245,183,201,0)' }}
              animate={{ pathLength: 1, opacity: 1, fill: `rgba(245,183,201,${0.18 + (i % 2) * 0.14})` }}
              transition={{ delay: 2 + i * 0.22, duration: 1.1, fill: { delay: 3.4 + i * 0.1, duration: 1.2 } }}/>
          ))}
        </g>
        <motion.circle cx="100" cy="112" r="6" stroke="#C5A66A" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.5, duration: .8 }} style={{ transformOrigin: '100px 112px' }}/>
        {[[88, 24], [100, 18], [112, 24]].map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="1.4" fill="#D8C69A" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, .6] }} transition={{ delay: 4 + i * .25, duration: 1 }}/>
        ))}
      </motion.svg>
      <motion.p className="script mt-4 px-6 text-center text-3xl md:text-4xl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: msg ? 1 : 0, y: msg ? 0 : 8 }} transition={{ duration: 1.2 }}>{settings.message}</motion.p>
      <button onClick={onDone} className="eyebrow absolute bottom-8 right-6 p-3 opacity-70 hover:opacity-100" aria-label="Skip intro">Skip</button>
    </motion.div>
  )
}
